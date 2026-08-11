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

const FOCUS = ["Generative AI", "RAG pipelines", "LLM evaluation", "full-stack products"];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: paper,
          color: ink,
          fontFamily: "sans-serif",
        }}
      >
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

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
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
              marginTop: 28,
              fontSize: 32,
              color: mutedInk,
            }}
          >
            John Carl Santos — AI Full Stack Engineer
          </div>

          <div style={{ display: "flex", marginTop: 28, gap: 12 }}>
            {FOCUS.map((item, index) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  padding: "10px 22px",
                  borderRadius: 999,
                  border: `1.5px solid ${index === 0 ? signal : line}`,
                  backgroundColor: index === 0 ? signalSoft : "transparent",
                  fontSize: 24,
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
            justifyContent: "space-between",
            borderTop: `1.5px solid ${line}`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700 }}>
            dyeyc.dev
          </div>
          <div style={{ display: "flex", fontSize: 24, color: dim }}>
            github.com/JohnCarl-30
          </div>
        </div>
      </div>
    ),
    size,
  );
}
