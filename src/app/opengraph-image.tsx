import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "John Carl Santos — AI Full Stack Engineer, focused on Generative AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const paper = "#f8f8f6";
const ink = "#111418";
const mutedInk = "#5f6266";
const dim = "#8d9093";
const line = "rgba(17, 20, 24, 0.14)";
const signal = "#1d7d74";
const signalSoft = "rgba(29, 125, 116, 0.12)";

const FOCUS = ["Generative AI", "RAG pipelines", "LLM evaluation"];

export default async function OpenGraphImage() {
  const photo = await readFile(
    path.join(process.cwd(), "public/img/cutout.png"),
  );
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px 56px",
          backgroundColor: paper,
          color: ink,
          fontFamily: "sans-serif",
        }}
      >
        {/* portrait, bottom-right sticker */}
        <img
          src={photoSrc}
          width={505}
          height={436}
          style={{
            position: "absolute",
            right: 40,
            bottom: 0,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: 999,
                backgroundColor: "#22c55e",
              }}
            />
            <div style={{ display: "flex", fontSize: 24, color: mutedInk }}>
              open to remote roles
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: dim }}>
            manila · gmt+8
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", width: 660 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            <span>I build it,&nbsp;</span>
            <span style={{ color: signal }}>ship it.</span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 30,
              color: mutedInk,
            }}
          >
            John Carl Santos — AI Full Stack Engineer
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 26,
              gap: 12,
            }}
          >
            {FOCUS.map((item, index) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  padding: "9px 20px",
                  borderRadius: 999,
                  border: `1.5px solid ${index === 0 ? signal : line}`,
                  backgroundColor: index === 0 ? signalSoft : "transparent",
                  fontSize: 23,
                  color: index === 0 ? signal : mutedInk,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            borderTop: `1.5px solid ${line}`,
            paddingTop: 26,
            width: 660,
          }}
        >
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700 }}>
            dyeyc.dev
          </div>
          <div style={{ display: "flex", fontSize: 23, color: dim }}>
            github.com/JohnCarl-30
          </div>
        </div>
      </div>
    ),
    size,
  );
}
