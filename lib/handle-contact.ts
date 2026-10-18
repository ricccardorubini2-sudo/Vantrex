import { inquiryFields, parseInquiry } from "./inquiry";
import { sendInquiry } from "./mailer";
import { allowRequest, clientAddress } from "./rate-limit";

type ContactCode = "sent" | "unconfigured" | "validation" | "rate_limited" | "delivery_failed" | "rejected";

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function wantsHtml(request: Request) {
  const type = request.headers.get("content-type") ?? "";
  return type.includes("application/x-www-form-urlencoded") || type.includes("multipart/form-data");
}

async function readPayload(request: Request) {
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("application/json")) return request.json();
  const form = await request.formData();
  return Object.fromEntries(form.entries());
}

function htmlPage(title: string, message: string, delivery: "smtp" | "mock" | "none") {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} | Vantrex</title>
</head>
<body style="margin:0;padding:48px 20px;background:#F7F8FA;color:#142033;font-family:Inter,Segoe UI,sans-serif;">
  <main data-delivery="${delivery}" style="max-width:640px;margin:0 auto;">
    <p style="margin:0 0 12px;font-size:28px;letter-spacing:-0.03em;">Vantrex</p>
    <h1 style="margin:0 0 16px;font-size:36px;font-weight:500;letter-spacing:-0.03em;">${title}</h1>
    <p style="margin:0 0 24px;font-size:17px;line-height:1.6;">${message}</p>
    <p style="margin:0;"><a href="/#contact">Return to the contact form</a></p>
  </main>
</body>
</html>`;
}

function respond(
  request: Request,
  status: number,
  code: ContactCode,
  message: string,
  extra: Record<string, unknown> = {},
) {
  const delivery = extra.delivery === "mock" || extra.delivery === "smtp" ? extra.delivery : "none";
  if (wantsHtml(request)) {
    return new Response(htmlPage(code === "sent" ? "Inquiry sent" : "Inquiry not sent", message, delivery), {
      status,
      headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
    });
  }
  return Response.json(
    { ok: code === "sent", code, message, ...extra },
    { status, headers: { "cache-control": "no-store" } },
  );
}

export async function handleContact(request: Request) {
  if (!sameOrigin(request)) {
    return respond(request, 403, "rejected", "This inquiry could not be submitted.");
  }

  const length = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(length) && length > 100_000) {
    return respond(request, 413, "rejected", "This inquiry could not be submitted.");
  }

  let payload: unknown;
  try {
    payload = await readPayload(request);
  } catch {
    return respond(request, 400, "validation", "Review the form and try again.");
  }

  const parsed = parseInquiry(payload);
  if (!parsed.ok) {
    if ("honeypot" in parsed && parsed.honeypot) {
      return respond(request, 400, "rejected", "This inquiry could not be submitted.");
    }
    return respond(request, 400, "validation", "Review the highlighted fields. Your inquiry was not sent.", {
      errors: "errors" in parsed ? parsed.errors : {},
    });
  }

  if (!allowRequest(clientAddress(request))) {
    return respond(
      request,
      429,
      "rate_limited",
      "Too many inquiries were submitted from this connection. Please wait before trying again. Your latest message was not sent.",
    );
  }

  if (process.env.NODE_ENV === "test" && process.env.CONTACT_DELIVERY === "mock") {
    return respond(request, 200, "sent", "Your inquiry has been sent.", { delivery: "mock" });
  }

  const result = await sendInquiry(parsed.data);
  if (result.ok) {
    console.info(JSON.stringify({ scope: "contact", outcome: "sent" }));
    return respond(
      request,
      200,
      "sent",
      "Your inquiry has been sent. Vantrex will review it and respond using the business email you provided.",
      { delivery: "smtp" },
    );
  }

  if (result.reason === "unconfigured") {
    console.info(JSON.stringify({ scope: "contact", outcome: "unconfigured" }));
    return respond(
      request,
      503,
      "unconfigured",
      "Inquiry delivery is not available yet. Your message was not sent.",
    );
  }

  return respond(request, 502, "delivery_failed", "Your inquiry could not be sent. Please try again later.");
}

export const contactFieldNames = inquiryFields;
