import { FormEvent, useState } from "react";

const API = import.meta.env.VITE_API_URL ?? "";
const FIELDS = ["name", "email", "subject", "message"] as const;
type Field = (typeof FIELDS)[number];

export default function Contact() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const v = (k: string) => String(d.get(k) ?? "").trim();

    const errs: Partial<Record<Field, string>> = {};
    FIELDS.forEach((k) => { if (!v(k)) errs[k] = "This field is required."; });
    if (v("email") && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v("email"))) errs.email = "Enter a valid email address.";
    setErrors(errs);
    if (Object.keys(errs).length) { setStatus("Fix the highlighted fields and send again."); return; }
    if (v("website")) return; // honeypot

    setBusy(true); setStatus("Sending…");
    try {
      const r = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: v("name"), email: v("email"), subject: v("subject"), message: v("message"), website: "" }),
      });
      if (r.ok) { setStatus("Message sent. Thank you."); form.reset(); }
      else if (r.status === 429) setStatus("Too many messages. Try again later.");
      else setStatus("Message not sent. Try again or use LinkedIn.");
    } catch {
      setStatus("Message not sent. Check your connection and try again.");
    } finally { setBusy(false); }
  }

  const field = (k: Field, label: string, type = "text") => (
    <label>
      {label}
      {k === "message"
        ? <textarea name={k} rows={5} required aria-invalid={!!errors[k]} aria-describedby={`e-${k}`} />
        : <input name={k} type={type} required autoComplete={k === "name" ? "name" : k === "email" ? "email" : "off"} aria-invalid={!!errors[k]} aria-describedby={`e-${k}`} />}
      <span className="err" id={`e-${k}`}>{errors[k]}</span>
    </label>
  );

  return (
    <form onSubmit={onSubmit} noValidate>
      {field("name", "Name")}
      {field("email", "Email", "email")}
      {field("subject", "Subject")}
      {field("message", "Message")}
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn p" type="submit" disabled={busy}>Send message</button>
      <div id="status" role="status" aria-live="polite">{status}</div>
    </form>
  );
}
