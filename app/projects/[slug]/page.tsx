import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { PROJECT_DETAILS, type ProjectDetail } from "../../data";

const C = {
  bg:           "#0f0f0f",
  bgCard:       "#181818",
  bgCardHover:  "#202020",
  bgInset:      "#111111",
  border:       "#303030",
  borderHover:  "#444444",
  text:         "#f2eee8",
  textSub:      "#c4c0b8",
  textMuted:    "#888480",
  accent:       "#e8b45e",
  accentBg:     "rgba(232,180,94,0.1)",
  accentBorder: "rgba(232,180,94,0.28)",
};

const ACCENTS: Record<ProjectDetail["accent"], { bg: string; border: string; glyph: string }> = {
  amber:  { bg: "rgba(232,180,94,0.14)",  border: "rgba(232,180,94,0.35)",  glyph: "#f5c878" },
  blue:   { bg: "rgba(96,165,250,0.14)",  border: "rgba(96,165,250,0.35)",  glyph: "#7ab8fc" },
  purple: { bg: "rgba(167,139,250,0.14)", border: "rgba(167,139,250,0.35)", glyph: "#b89ffc" },
  green:  { bg: "rgba(34,197,94,0.14)",   border: "rgba(34,197,94,0.35)",   glyph: "#5fdd96" },
  rose:   { bg: "rgba(244,114,182,0.14)", border: "rgba(244,114,182,0.35)", glyph: "#f48ec3" },
};

const W = "min(720px, 100%)";
const px = "clamp(20px, 5vw, 32px)";

export function generateStaticParams() {
  return Object.keys(PROJECT_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECT_DETAILS[slug];
  if (!p) return { title: "Project — Harsh Kasana" };
  return {
    title: `${p.name} — Harsh Kasana`,
    description: p.tagline,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      title: `${p.name} — Harsh Kasana`,
      description: p.tagline,
      url: `https://harshkasana.dev/projects/${p.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const p = PROJECT_DETAILS[slug];
  if (!p) notFound();

  const accent = ACCENTS[p.accent];

  return (
    <main style={{ background: C.bg, color: C.text, minHeight: "100vh", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      <div style={{ maxWidth: W, margin: "0 auto", padding: `28px ${px} 80px` }}>

        {/* back link */}
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: C.textMuted, textDecoration: "none", marginBottom: 28 }}>
          <ArrowLeft size={14} /> back to portfolio
        </Link>

        {/* hero */}
        <div style={{ display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 28 }}>
          <div
            aria-hidden
            style={{
              width: 76, height: 76, flexShrink: 0,
              borderRadius: 14,
              background: accent.bg,
              border: `1px solid ${accent.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 38, lineHeight: 1, color: accent.glyph,
            }}
          >
            {p.icon}
          </div>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontSize: "clamp(24px, 4.4vw, 32px)", fontWeight: 700, margin: 0, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              {p.name}
            </h1>
            <p style={{ fontSize: 15, color: C.textSub, margin: "8px 0 0", lineHeight: 1.55 }}>
              {p.tagline}
            </p>
          </div>
        </div>

        {/* problem · mechanism · outcome */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 36 }}>
          <PMOCard label="Problem"   body={p.problem}   tone="muted" />
          <PMOCard label="Mechanism" body={p.mechanism} tone="accent" accentColor={accent.glyph} accentBg={accent.bg} accentBorder={accent.border} />
          <PMOCard label="Outcome"   body={p.outcome}   tone="muted" />
        </div>

        {/* flow */}
        {p.flow && p.flow.length > 0 && (
          <section style={{ marginBottom: 36 }}>
            <SectionLabel>How it works</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "stretch" }}>
              {p.flow.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "stretch", gap: 10, flex: "1 1 180px", minWidth: 0 }}>
                  <div style={{
                    flex: 1, minWidth: 0,
                    background: C.bgCard, border: `1px solid ${C.border}`,
                    borderRadius: 10, padding: "12px 14px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{
                        fontSize: 10, fontFamily: "ui-monospace, monospace",
                        color: accent.glyph, background: accent.bg,
                        border: `1px solid ${accent.border}`,
                        padding: "2px 6px", borderRadius: 4, fontWeight: 600,
                      }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{f.step}</span>
                    </div>
                    <p style={{ fontSize: 12.5, color: C.textMuted, margin: 0, lineHeight: 1.5 }}>{f.detail}</p>
                  </div>
                  {i < p.flow!.length - 1 && (
                    <div aria-hidden style={{ display: "flex", alignItems: "center", color: C.textMuted, flexShrink: 0 }}>
                      <ArrowRight size={14} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* tech */}
        <section style={{ marginBottom: 36 }}>
          <SectionLabel>Stack</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {p.tech.map((t) => (
              <span key={t} style={{
                fontSize: 12, padding: "4px 10px", borderRadius: 5,
                background: "#1e1e1e", color: C.textSub,
                border: `1px solid ${C.border}`,
              }}>{t}</span>
            ))}
          </div>
        </section>

        {/* how to use */}
        <section style={{ marginBottom: 36 }}>
          <SectionLabel>{p.howToUse.kind === "dev" ? "Run it" : "Try it"}</SectionLabel>

          {p.howToUse.note && (
            <p style={{ fontSize: 13.5, color: C.textSub, margin: "0 0 12px", lineHeight: 1.55 }}>{p.howToUse.note}</p>
          )}

          {p.howToUse.kind === "dev" ? (
            <pre style={{
              margin: 0,
              background: C.bgInset,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: "14px 16px",
              fontSize: 13,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              color: C.text,
              overflowX: "auto",
              lineHeight: 1.65,
              whiteSpace: "pre",
            }}>{p.howToUse.steps.join("\n")}</pre>
          ) : (
            <ol style={{ margin: 0, padding: "0 0 0 0", listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {p.howToUse.steps.map((s, i) => (
                <li key={i} style={{
                  display: "flex", gap: 12, alignItems: "flex-start",
                  background: C.bgCard, border: `1px solid ${C.border}`,
                  borderRadius: 10, padding: "11px 14px",
                }}>
                  <span style={{
                    fontSize: 11, fontFamily: "ui-monospace, monospace",
                    color: accent.glyph, background: accent.bg,
                    border: `1px solid ${accent.border}`,
                    padding: "2px 6px", borderRadius: 4, fontWeight: 600,
                    flexShrink: 0, marginTop: 1,
                  }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: 13.5, color: C.textSub, lineHeight: 1.55 }}>{s}</span>
                </li>
              ))}
            </ol>
          )}
        </section>

        {/* CTAs */}
        <section style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {p.links.live && (
            <a href={p.links.live} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 16px", borderRadius: 8,
              background: C.accent, color: "#0f0f0f",
              fontSize: 14, fontWeight: 600, textDecoration: "none",
              border: `1px solid ${C.accent}`,
            }}>
              <ExternalLink size={14} /> Live demo
            </a>
          )}
          {p.links.github && (
            <a href={p.links.github} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 16px", borderRadius: 8,
              background: C.bgCard, color: C.text,
              fontSize: 14, fontWeight: 600, textDecoration: "none",
              border: `1px solid ${C.border}`,
            }}>
              <Github size={14} /> GitHub
            </a>
          )}
        </section>

      </div>
    </main>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
      textTransform: "uppercase", color: C.textMuted,
      fontFamily: "ui-monospace, monospace", margin: "0 0 14px",
    }}>{children}</p>
  );
}

function PMOCard({
  label, body, tone, accentColor, accentBg, accentBorder,
}: {
  label: string; body: string;
  tone: "muted" | "accent";
  accentColor?: string; accentBg?: string; accentBorder?: string;
}) {
  const isAccent = tone === "accent";
  return (
    <div style={{
      background: isAccent ? accentBg : C.bgCard,
      border: `1px solid ${isAccent ? accentBorder : C.border}`,
      borderRadius: 10,
      padding: "13px 15px",
      minWidth: 0,
    }}>
      <p style={{
        fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: isAccent ? accentColor : C.textMuted,
        fontFamily: "ui-monospace, monospace",
        margin: "0 0 6px",
      }}>{label}</p>
      <p style={{ fontSize: 13, color: isAccent ? C.text : C.textSub, margin: 0, lineHeight: 1.55 }}>
        {body}
      </p>
    </div>
  );
}
