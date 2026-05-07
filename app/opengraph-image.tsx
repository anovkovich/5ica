import { ImageResponse } from "next/og";

export const alt = "5ica — Vežbaj za peticu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #fbfbfd 0%, #f3f0ed 50%, #fce8e6 100%)",
          position: "relative",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Notebook lines pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0, transparent 39px, #1a1a2e 39px, #1a1a2e 40px)",
            opacity: 0.04,
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span
            style={{
              fontSize: 22,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#7c7889",
              fontWeight: 500,
            }}
          >
            5ica.rs
          </span>
          <span
            style={{
              fontSize: 18,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#d83a44",
              fontWeight: 700,
              background: "rgba(216, 58, 68, 0.1)",
              padding: "8px 18px",
              borderRadius: 9999,
            }}
          >
            ★ Lansiranje uskoro
          </span>
        </div>

        {/* Center — logo + tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          {/* 5ica logo */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontWeight: 900,
              transform: "rotate(-2deg)",
            }}
          >
            <span
              style={{
                fontSize: 280,
                color: "#d83a44",
                lineHeight: 0.85,
                textShadow: "4px 4px 0 rgba(216, 58, 68, 0.15)",
                letterSpacing: "-0.05em",
              }}
            >
              5
            </span>
            <span
              style={{
                fontSize: 140,
                color: "#1a1a2e",
                lineHeight: 0.85,
                marginLeft: -8,
              }}
            >
              ica
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              marginTop: 20,
            }}
          >
            <span
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: "#1a1a2e",
                letterSpacing: "-0.02em",
              }}
            >
              Vežbaj za peticu.
            </span>
            <span
              style={{
                fontSize: 26,
                color: "#4b5563",
                maxWidth: 900,
                textAlign: "center",
                lineHeight: 1.4,
              }}
            >
              Gejmifikovana aplikacija za 1-8. razred i pripremu male mature
            </span>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background:
              "linear-gradient(to right, #d83a44 0%, #ffba47 50%, #4f5fff 100%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
