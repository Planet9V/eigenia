import nodemailer from "nodemailer";

const RECIPIENT = "jim@eigenia.nl";

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

export interface ContactSubmission {
  name?: string;
  email?: string;
  company?: string;
  type?: string;
  track?: string;
  message?: string;
  capacity?: string;
}

export async function sendContactEmail(submission: ContactSubmission): Promise<void> {
  const { name, email, company, type, track, message, capacity } = submission;

  const subject = `[Eigenia Website] ${type || "Contact"} - ${company || name || email}`;

  const textLines = [
    `Name: ${name || ""}`,
    `Email: ${email || ""}`,
    `Company/Organization: ${company || ""}`,
    type ? `Type: ${type}` : null,
    track ? `Track: ${track}` : null,
    capacity ? `Capacity: ${capacity}` : null,
    "",
    "Message:",
    message || "",
  ].filter((line): line is string => line !== null);

  await getTransporter().sendMail({
    from: `"Eigenia Website" <${process.env.SMTP_USER}>`,
    to: RECIPIENT,
    replyTo: email,
    subject,
    text: textLines.join("\n"),
  });
}
