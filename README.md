# Nayeem Al-Tamzid Bhuiyan: personal website

React + TypeScript + Vite frontend, FastAPI backend for the contact form.

```
frontend/   React site (all content lives in src/content.ts)
backend/    FastAPI /api/contact (validation, honeypot, rate limit, SMTP)
```

## Run locally
```bash
# backend
cd backend
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env        # fill in SMTP + CONTACT_TO
uvicorn main:app --reload --port 8000

# frontend (second terminal)
cd frontend
npm install
npm run dev                 # http://localhost:5173, /api is proxied to :8000
```

## Update content
Edit `frontend/src/content.ts` (about, experience, projects, education). Add the portrait as `frontend/public/photo.jpg`.

## Publish to Git
```bash
git init && git add . && git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```
Never commit `.env` (already in .gitignore).

## Deploy
- **Frontend** (Vercel, Netlify or Cloudflare Pages): root `frontend`, build `npm run build`, output `dist`, env `VITE_API_URL=https://<your-backend>`.
- **Backend** (Render, Railway or Fly.io): root `backend`, start `uvicorn main:app --host 0.0.0.0 --port $PORT`, set the variables from `.env.example`. Put your frontend domain in `ALLOWED_ORIGINS`.
- Without SMTP configured the API returns 503 and the form shows "not sent", never a false success.

## Still needed from Nayeem
Portrait, verified intro and expertise text, real projects (the three are demos), education dates and certifications, contact email, domain (then update canonical/og:url in `index.html` and `public/sitemap.xml`), Zebra logo file if wanted, and confirmation of the earlier role's end date.
