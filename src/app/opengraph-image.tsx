import { ImageResponse } from "next/og";

export const alt = "Bamboo Coders — Building software that moves businesses forward.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f6f6f1", padding: 80, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "#245738", display: "flex", alignItems: "flex-end", gap: 8, padding: "12px 16px" }}>
            <div style={{ width: 10, height: 40, borderRadius: 4, background: "#fff" }} />
            <div style={{ width: 10, height: 26, borderRadius: 4, background: "#b9d7c1" }} />
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, color: "#131713" }}>Bamboo Coders</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 600, color: "#131713", lineHeight: 1.05, letterSpacing: -3, maxWidth: 950 }}>
            Building software that moves businesses forward.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#5f675f" }}>Custom software · Web & mobile apps · SaaS · Our own products</div>
        </div>
        <div style={{ height: 10, width: 220, borderRadius: 5, background: "#3c8656" }} />
      </div>
    ),
    size,
  );
}
