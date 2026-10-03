import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hero, profile } from "@/data/portfolio";

/*
 * The preview image shown when the site is shared on LinkedIn, WhatsApp, X, etc.
 * Built once at build time into a real `og.png` file (a file with a .png extension,
 * so static hosts like Render serve it with the right image type).
 * Referenced from the metadata in app/layout.tsx.
 */
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

const asset = (p: string) => readFile(join(process.cwd(), "src/assets", p));

export async function GET() {
  const [interBold, interMedium, serifItalic, avatar] = await Promise.all([
    asset("fonts/Inter-Bold.ttf"),
    asset("fonts/Inter-Medium.ttf"),
    asset("fonts/InstrumentSerif-Italic.ttf"),
    asset("og-avatar.jpg"),
  ]);
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff", position: "relative" }}>
        {/* faint watermark, sized so the whole name fits left of the avatar */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 64,
            fontSize: 150,
            fontFamily: "Inter",
            fontWeight: 700,
            letterSpacing: -5,
            lineHeight: 1,
            color: "rgba(30,34,53,0.05)",
            whiteSpace: "nowrap",
          }}
        >
          {hero.watermark}
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 0 72px 80px", width: 780 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 999,
                background: "#1e2235",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize: 22,
              }}
            >
              {profile.monogram}
            </div>
            <div style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 22, letterSpacing: 6, color: "#5f6577" }}>
              {hero.eyebrow}
            </div>
          </div>
          <div style={{ marginTop: 36, fontFamily: "Inter", fontWeight: 700, fontSize: 84, lineHeight: 1, letterSpacing: -3, color: "#1e2235" }}>
            {profile.name}
          </div>
          <div style={{ display: "flex", marginTop: 14, fontSize: 64, lineHeight: 1.05, color: "#565b78" }}>
            <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic" }}>{profile.role}.</span>
          </div>
          <div style={{ marginTop: 28, fontFamily: "Inter", fontWeight: 500, fontSize: 24, color: "#5f6577" }}>{hero.subtitle}</div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain <img> */}
        <img src={avatarSrc} alt="" width={348} height={576} style={{ position: "absolute", right: 70, bottom: 0 }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
        { name: "Inter", data: interMedium, weight: 500, style: "normal" },
        { name: "Instrument Serif", data: serifItalic, weight: 400, style: "italic" },
      ],
    },
  );
}
