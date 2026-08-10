import "server-only";
import nodemailer from "nodemailer";

type SendMailArgs = {
  subject: string;
  text: string;
  replyTo?: string;
};

// Shared SMTP sender for both the contact form and the newsletter box —
// same env vars, same transport, so credentials only live in one place.
export async function sendNotificationEmail({ subject, text, replyTo }: SendMailArgs) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL ?? user;

  if (!host || !user || !pass || !to) {
    throw new Error("SMTP is not configured (missing SMTP_HOST, SMTP_USER, SMTP_PASS, or CONTACT_TO_EMAIL).");
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: (process.env.SMTP_SECURE ?? "true") === "true",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Northman Sterling Legal Website" <${user}>`,
    to,
    replyTo,
    subject,
    text,
  });
}
