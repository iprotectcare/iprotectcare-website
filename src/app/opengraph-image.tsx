import { ImageResponse } from "next/og";
import { business } from "@/content/business";

export const alt = `${business.name} — Apple device repair in Koramangala, Bengaluru`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b0b0c 55%, #0a2c50 100%)",
          color: "#f5f5f7",
          fontSize: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 999,
              background: "#0a84ff",
            }}
          />
          <div style={{ fontSize: 34, opacity: 0.85 }}>{business.name}</div>
        </div>
        <div style={{ marginTop: 36, fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
          Your Apple device, fixed right.
        </div>
        <div style={{ marginTop: 28, fontSize: 34, opacity: 0.7 }}>
          {`Free diagnosis · Warranty on repairs · ${business.locality}, ${business.city}`}
        </div>
      </div>
    ),
    size,
  );
}
