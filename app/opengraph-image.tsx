import { ImageResponse } from "next/og";

export const alt = "Vantrex. Capital in Motion. Markets in Reach.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "#000000",
        }}
      >
        <div style={{ fontSize: 28, color: "#0A4BFF" }}>Institutional Digital Asset Liquidity Firm</div>
        <div style={{ fontSize: 84, marginTop: 20 }}>Vantrex</div>
        <div style={{ fontSize: 36, marginTop: 18 }}>Capital in Motion. Markets in Reach.</div>
      </div>
    ),
    { ...size },
  );
}
