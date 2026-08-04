import { NextResponse } from "next/server";

import { sendNotificationEmail } from "@/lib/email/mailer";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// NOTE: this forwards each signup as an email so the team can add the
// address to whichever mailing list they use. Swap this for a direct
// HubSpot/Mailchimp list API call once the firm has picked one.
export async function POST(request: Request) {
  let payload: { email?: string };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = payload.email;

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  try {
    await sendNotificationEmail({
      subject: "New newsletter signup",
      text: `New newsletter subscriber: ${email}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Newsletter form: failed to send email.", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 502 }
    );
  }
}
