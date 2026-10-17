import { NextResponse } from "next/server";

// Forwards contact-form submissions to the Google Apps Script web app in
// GOOGLE_SHEET_URL (set in Netlify env vars / .env.local) so the URL never
// reaches the browser.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 100, email: 200, company: 120, message: 4000 } as const;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const sheetUrl = process.env.GOOGLE_SHEET_URL;
  if (!sheetUrl) {
    return NextResponse.json({ ok: false, error: "The contact form isn't configured yet." }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const data = {
    name: clean(body.name, LIMITS.name),
    email: clean(body.email, LIMITS.email),
    company: clean(body.company, LIMITS.company),
    message: clean(body.message, LIMITS.message),
  };

  if (!data.name || !data.message || !EMAIL_RE.test(data.email)) {
    return NextResponse.json(
      { ok: false, error: "Please include your name, a valid email and a message." },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
      // Apps Script runs doPost, then answers with a 302 to its echo URL.
      redirect: "manual",
      signal: AbortSignal.timeout(10_000),
    });
    if (res.status >= 400) throw new Error(`Sheet endpoint responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] forwarding failed:", error);
    return NextResponse.json(
      { ok: false, error: "Couldn't send your message right now. Please email me directly." },
      { status: 502 },
    );
  }
}
