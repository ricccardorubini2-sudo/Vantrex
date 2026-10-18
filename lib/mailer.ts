import nodemailer from "nodemailer";
import type { InquiryInput } from "./inquiry";

export type SmtpConfig = {
  configured: boolean;
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
};

export function getSmtpConfig(): SmtpConfig {
  const host = process.env.SMTP_HOST?.trim() ?? "";
  const from = process.env.SMTP_FROM?.trim() ?? "";
  const to = process.env.CONTACT_TO?.trim() ?? "";
  const user = process.env.SMTP_USER?.trim() ?? "";
  const pass = process.env.SMTP_PASS ?? "";
  const portRaw = process.env.SMTP_PORT?.trim() ?? "";
  const port = portRaw ? Number(portRaw) : 587;
  const portOk = Number.isInteger(port) && port > 0 && port < 65536;
  const authOk = user.length > 0 ? pass.length > 0 : true;
  return {
    configured: Boolean(host && from && to && portOk && authOk),
    host,
    port: portOk ? port : 0,
    user,
    pass,
    from,
    to,
  };
}

function safeHeader(value: string) {
  return value.replace(/[\r\n]/g, " ").trim();
}

export async function sendInquiry(input: InquiryInput) {
  const config = getSmtpConfig();
  if (!config.configured) return { ok: false as const, reason: "unconfigured" as const };

  try {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: config.user ? { user: config.user, pass: config.pass } : undefined,
    });

    await transporter.sendMail({
      from: config.from,
      to: config.to,
      replyTo: safeHeader(input.email),
      subject: `Vantrex website inquiry — ${input.category}`,
      text: [
        `Category: ${input.category}`,
        `Company: ${input.company}`,
        `Contact name: ${input.contactName}`,
        `Business email: ${input.email}`,
        "",
        "Message:",
        input.message,
      ].join("\n"),
    });

    return { ok: true as const };
  } catch (error) {
    console.error(JSON.stringify({ scope: "contact", outcome: "delivery_failed" }));
    if (process.env.NODE_ENV === "development") {
      console.error(error instanceof Error ? error.message : "delivery error");
    }
    return { ok: false as const, reason: "delivery_failed" as const };
  }
}
