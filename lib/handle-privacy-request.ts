import { parsePrivacyRequest } from "./privacy-request";
import { sendPrivacyRequest } from "./mailer";
import { allowRequest, clientAddress } from "./rate-limit";

type PrivacyCode = "received" | "unconfigured" | "validation" | "rate_limited" | "delivery_failed" | "rejected";

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

function respond(status: number, code: PrivacyCode, message: string, extra: Record<string, unknown> = {}) {
  return Response.json(
    { ok: code === "received", code, message, ...extra },
    { status, headers: { "cache-control": "no-store" } },
  );
}

export async function handlePrivacyRequest(request: Request) {
  if (!sameOrigin(request)) {
    return respond(403, "rejected", "This request could not be submitted.");
  }

  const length = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(length) && length > 100_000) {
    return respond(413, "rejected", "This request could not be submitted.");
  }

  let payload: unknown;
  try {
    const type = request.headers.get("content-type") ?? "";
    payload = type.includes("application/json")
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());
  } catch {
    return respond(400, "validation", "Review the form and try again.");
  }

  const parsed = parsePrivacyRequest(payload);
  if (!parsed.ok) {
    if ("honeypot" in parsed && parsed.honeypot) {
      return respond(400, "rejected", "This request could not be submitted.");
    }
    return respond(400, "validation", "Review the highlighted fields. Your request was not sent.", {
      errors: "errors" in parsed ? parsed.errors : {},
    });
  }

  if (!allowRequest(`privacy:${clientAddress(request)}`)) {
    return respond(
      429,
      "rate_limited",
      "Too many requests were submitted from this connection. Please wait before trying again. Your latest request was not sent.",
    );
  }

  if (process.env.NODE_ENV === "test" && process.env.CONTACT_DELIVERY === "mock") {
    return respond(200, "received", "Your privacy request has been received. We will review it and may contact you if further information is needed.", {
      delivery: "mock",
    });
  }

  const result = await sendPrivacyRequest(parsed.data);
  if (result.ok) {
    console.info(JSON.stringify({ scope: "privacy-request", outcome: "received" }));
    return respond(
      200,
      "received",
      "Your privacy request has been received. We will review it and may contact you if further information is needed.",
      { delivery: "smtp" },
    );
  }

  if (result.reason === "unconfigured") {
    console.info(JSON.stringify({ scope: "privacy-request", outcome: "unconfigured" }));
    return respond(
      503,
      "unconfigured",
      "Privacy-request delivery is not available yet. Your request was not sent. You can also write to us at the postal address on our Company Information page.",
    );
  }

  return respond(502, "delivery_failed", "Your request could not be sent. Please try again later.");
}
