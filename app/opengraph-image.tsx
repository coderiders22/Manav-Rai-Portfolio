import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const alt = `${profile.name}, AI Engineer (GenAI & Full Stack)`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const photo = await readFile(join(process.cwd(), "public/images/manav.png"));
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;
  const tags = ["LangGraph", "AWS Bedrock", "FastAPI", "Spring Boot", "Next.js", "Flutter"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#07080a",
          backgroundImage:
            "radial-gradient(circle at 78% 60%, rgba(110,118,255,0.28), transparent 45%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 56px 56px, 56px 56px",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 64px 72px", width: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: "#a1a1aa" }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#4ade80" }} />
            <div style={{ display: "flex" }}>{profile.availability}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{profile.name}</div>
            <div style={{ fontSize: 40, marginTop: 18, color: "#a5abff", letterSpacing: -1 }}>AI Engineer · GenAI &amp; Full Stack</div>
            <div style={{ fontSize: 26, marginTop: 22, color: "#a1a1aa" }}>
              {`${profile.role} @ ${profile.company} · B.Tech CSE, PEC Chandigarh`}
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {tags.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  fontSize: 20,
                  padding: "8px 16px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#d4d4d8",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
        <img src={photoSrc} alt="" width={420} height={552} style={{ position: "absolute", right: 40, bottom: 0, objectFit: "contain" }} />
      </div>
    ),
    size,
  );
}
