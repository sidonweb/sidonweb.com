import { ImageResponse } from "next/og";
import { metaData } from "app/config";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 } as const;
const ACCENT = "#39ff14";
const BG = "#060607";

export function GET(request: Request) {
  const title = new URL(request.url).searchParams.get("title") || metaData.title;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: 80,
          justifyContent: "space-between",
          backgroundColor: BG,
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(57,255,20,0.10), transparent 45%), radial-gradient(circle at 88% 88%, rgba(71,163,243,0.10), transparent 42%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              backgroundColor: ACCENT,
              marginRight: 16,
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>
            sidonweb
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 960,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#a3a3a3",
          }}
        >
          <div style={{ display: "flex" }}>{metaData.name}</div>
          <div style={{ display: "flex" }}>Full Stack Engineer</div>
        </div>
      </div>
    ),
    SIZE
  );
}
