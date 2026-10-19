"""Contact-form API for the portfolio site.

Run: uvicorn main:app --reload --port 8000
"""
import os
import smtplib
import time
from collections import defaultdict, deque
from email.message import EmailMessage

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

load_dotenv()

app = FastAPI(title="Portfolio contact API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()],
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)

RATE_LIMIT = 5          # messages
RATE_WINDOW = 3600      # per hour, per IP
_hits: dict[str, deque] = defaultdict(deque)


class Contact(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    subject: str = Field(min_length=1, max_length=150)
    message: str = Field(min_length=1, max_length=4000)
    website: str = ""   # honeypot: real visitors leave this empty


def _client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    return fwd.split(",")[0].strip() if fwd else (request.client.host if request.client else "unknown")


def _check_rate(ip: str) -> None:
    now = time.time()
    q = _hits[ip]
    while q and now - q[0] > RATE_WINDOW:
        q.popleft()
    if len(q) >= RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Too many messages")
    q.append(now)


def _send(c: Contact) -> None:
    host, to = os.getenv("SMTP_HOST"), os.getenv("CONTACT_TO")
    if not host or not to:
        raise HTTPException(status_code=503, detail="Mail is not configured")
    msg = EmailMessage()
    msg["Subject"] = f"[Portfolio] {c.subject}"
    msg["From"] = os.getenv("SMTP_FROM", to)
    msg["To"] = to
    msg["Reply-To"] = c.email
    msg.set_content(f"From: {c.name} <{c.email}>\n\n{c.message}")
    try:
        with smtplib.SMTP(host, int(os.getenv("SMTP_PORT", "587")), timeout=15) as s:
            s.starttls()
            if os.getenv("SMTP_USER"):
                s.login(os.getenv("SMTP_USER", ""), os.getenv("SMTP_PASSWORD", ""))
            s.send_message(msg)
    except (smtplib.SMTPException, OSError):
        raise HTTPException(status_code=502, detail="Could not send message")


@app.get("/api/health")
def health():
    return {"ok": True}


@app.post("/api/contact")
def contact(c: Contact, request: Request):
    if c.website:                      # bot: pretend nothing happened, send nothing
        return {"ok": True}
    _check_rate(_client_ip(request))
    _send(c)                           # raises if delivery fails: no fake success
    return {"ok": True}
