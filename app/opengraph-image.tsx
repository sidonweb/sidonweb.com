import { ImageResponse } from "next/og";

export const alt = "Siddharth Singh, full-stack engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          padding: "72px",
          fontFamily: "sans-serif",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            color: "#a1a1ab",
            fontFamily: "monospace",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 12,
              background: "#0fb981",
            }}
          />
          Available for work, worldwide
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: "#fafafa",
            maxWidth: 960,
          }}
        >
          Hi, I&apos;m Sid. I build software teams can rely on
          <span style={{ color: "#3b82f6" }}>.</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            fontSize: 24,
            color: "#a1a1ab",
          }}
        >
          <span style={{ color: "#fafafa", fontWeight: 600 }}>
            Siddharth Singh
          </span>
          <span>Full-stack engineer · Real-time & AI</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
