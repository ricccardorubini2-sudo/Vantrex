import { handlePrivacyRequest } from "@/lib/handle-privacy-request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handlePrivacyRequest(request);
}
