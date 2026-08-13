import { NextResponse } from "next/server";

import { sendNotificationEmail } from "@/lib/email/mailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string[];
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, service, message } = payload;

  if (!name || !email || !message || !isValidEmail(email)) {
    return NextResponse.json({ error: "Missing or invalid required fields." }, { status: 400 });
  }

  try {
    await sendNotificationEmail({
      subject: `New contact form submission from ${name}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        service && service.length > 0 ? `Area(s) of interest: ${service.join(", ")}` : null,
        "",
        "Message:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form: failed to send email.", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again." },
      { status: 502 }
    );
  }
}
