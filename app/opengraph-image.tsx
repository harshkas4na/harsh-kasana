import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Harsh Kasana — Blockchain Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f0f0f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* top accent */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#e8b45e" }} />

        {/* available badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, padding: "6px 14px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 20, width: "fit-content" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ fontSize: 16, color: "#4ade80", fontWeight: 600 }}>Available for collaborations</span>
        </div>

        {/* name */}
        <div style={{ fontSize: 76, fontWeight: 800, color: "#f0ece6", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16 }}>
          Harsh Kasana
        </div>

        {/* role */}
        <div style={{ fontSize: 24, color: "#a09c96", marginBottom: 44 }}>
          Solidity & DApp Developer · <span style={{ color: "#e8b45e" }}>Reactive Network</span> · IIIT Nagpur
        </div>

        {/* stats */}
        <div style={{ display: "flex", gap: 16 }}>
          {[["$13K+", "grants & prizes"], ["160", "users in 48hrs"], ["6×", "hackathon wins"], ["4×", "press features"]].map(([stat, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4, padding: "14px 20px", background: "#161616", border: "1px solid #262626", borderRadius: 10 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: "#e8b45e" }}>{stat}</span>
              <span style={{ fontSize: 13, color: "#5a5650" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* domain */}
        <div style={{ position: "absolute", bottom: 48, right: 96, fontSize: 16, color: "#3a3632", fontFamily: "ui-monospace, monospace" }}>
          harshkasana.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
