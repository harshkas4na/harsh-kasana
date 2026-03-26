"use client";

import { useState, useEffect, useRef } from "react";
import {
  Github, Linkedin, Twitter, Mail, ExternalLink, ArrowUpRight,
  ChevronDown, MapPin, Briefcase, FileText, BookOpen, X, Menu, Wrench,
} from "lucide-react";
import { FEATURED, MORE, TIMELINE, SKILLS } from "./data";

// ─── color tokens ─────────────────────────────────────────────────────────────
const C = {
  bg:           "#0f0f0f",
  bgCard:       "#181818",
  bgCardHover:  "#202020",
  bgInset:      "#111111",
  border:       "#303030",
  borderHover:  "#444444",
  text:         "#f2eee8",       // primary — headings, names
  textSub:      "#c4c0b8",       // secondary — descriptions, body
  textMuted:    "#888480",       // muted — dates, tags, labels
  accent:       "#e8b45e",
  accentBg:     "rgba(232,180,94,0.1)",
  accentBorder: "rgba(232,180,94,0.28)",
  accentText:   "#f5c878",
};

// ─── hooks ────────────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

// ─── primitives ──────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(14px)", transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const BADGE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  green:  { bg: "rgba(34,197,94,0.12)",   text: "#5fdd96", border: "rgba(34,197,94,0.3)"   },
  blue:   { bg: "rgba(96,165,250,0.12)",  text: "#7ab8fc", border: "rgba(96,165,250,0.3)"  },
  purple: { bg: "rgba(167,139,250,0.12)", text: "#b89ffc", border: "rgba(167,139,250,0.3)" },
  orange: { bg: "rgba(251,146,60,0.12)",  text: "#fc9f5a", border: "rgba(251,146,60,0.3)"  },
};

function Badge({ label, color = "green" }: { label: string; color?: string }) {
  const s = BADGE_STYLES[color] ?? BADGE_STYLES.green;
  return (
    <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 6, background: s.bg, color: s.text, border: `1px solid ${s.border}`, whiteSpace: "nowrap", letterSpacing: "0.01em" }}>
      {label}
    </span>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 12, padding: "3px 9px", borderRadius: 5, background: "#1e1e1e", color: C.textMuted, border: `1px solid ${C.border}` }}>
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.textMuted, fontFamily: "ui-monospace, monospace", marginBottom: 24 }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div style={{ height: 1, background: C.border }} />;
}

// ─── nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: scrolled ? "rgba(15,15,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
        transition: "background 0.25s, border-color 0.25s",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "14px clamp(20px,5vw,48px)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.text, letterSpacing: "-0.01em" }}>
            Harsh Kasana
          </span>
          <div className="hide-mobile" style={{ gap: 2 }}>
            {(["projects", "about", "journey"] as const).map((s) => (
              <a key={s} href={`#${s}`}
                style={{ color: C.textSub, fontSize: 14, fontWeight: 500, padding: "5px 11px", borderRadius: 7, textDecoration: "none", transition: "color 0.15s, background 0.15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = C.text; e.currentTarget.style.background = C.bgCard; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = C.textSub; e.currentTarget.style.background = "transparent"; }}
              >{s}</a>
            ))}
            <a href="https://medium.com/@harshkasana05" target="_blank" rel="noopener noreferrer"
              style={{ color: C.textSub, fontSize: 14, fontWeight: 500, padding: "5px 11px", borderRadius: 7, textDecoration: "none", transition: "color 0.15s, background 0.15s", display: "flex", alignItems: "center", gap: 5 }}
              onMouseEnter={(e) => { e.currentTarget.style.color = C.text; e.currentTarget.style.background = C.bgCard; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = C.textSub; e.currentTarget.style.background = "transparent"; }}
            >
              <BookOpen size={14} /> writing
            </a>
          </div>
          <button className="show-mobile" onClick={() => setMenuOpen(true)}
            style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 7, padding: "6px 8px", cursor: "pointer", color: C.textSub, alignItems: "center", justifyContent: "center" }}
            aria-label="Open navigation">
            <Menu size={18} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`} role="dialog" aria-modal="true">
        <button onClick={() => setMenuOpen(false)}
          style={{ position: "absolute", top: 16, right: 20, background: "none", border: `1px solid ${C.border}`, borderRadius: 7, padding: "6px 8px", cursor: "pointer", color: C.textSub }}
          aria-label="Close navigation">
          <X size={18} />
        </button>
        {[
          { label: "projects", href: "#projects" },
          { label: "about",    href: "#about"    },
          { label: "journey",  href: "#journey"  },
          { label: "writing",  href: "https://medium.com/@harshkasana05", external: true },
        ].map(({ label, href, external }) => (
          <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
            onClick={() => setMenuOpen(false)}
            style={{ fontSize: 30, fontWeight: 700, color: C.text, textDecoration: "none", letterSpacing: "-0.02em" }}>
            {label}
          </a>
        ))}
      </div>
    </>
  );
}

// ─── project card ─────────────────────────────────────────────────────────────

function ProjectCard({ p, i }: { p: typeof FEATURED[0]; i: number }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={i * 0.07}>
      <div
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ background: hovered ? C.bgCardHover : C.bgCard, border: `1px solid ${hovered ? C.borderHover : C.border}`, borderRadius: 14, padding: "24px 28px", marginBottom: 12, transition: "background 0.15s, border-color 0.15s" }}
      >
        {/* header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 10, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5, flexWrap: "wrap" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>{p.name}</h3>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.textMuted, fontFamily: "ui-monospace, monospace" }}>{p.category}</span>
            </div>
            <p style={{ color: C.textSub, fontSize: 15, margin: 0, lineHeight: 1.6 }}>{p.hook}</p>
          </div>
          <Badge label={p.badge} color={p.badgeColor} />
        </div>

        {/* expandable */}
        {open && (
          <div style={{ margin: "16px 0", padding: "16px 18px", background: C.bgInset, borderRadius: 10, border: `1px solid ${C.border}` }}>
            {p.bullets.map((b, j) => (
              <div key={j} style={{ display: "flex", gap: 12, marginBottom: j < p.bullets.length - 1 ? 12 : 0 }}>
                <span style={{ color: C.accent, fontSize: 14, flexShrink: 0, lineHeight: 1.6 }}>→</span>
                <p style={{ color: C.textSub, fontSize: 14, margin: 0, lineHeight: 1.7 }}>{b}</p>
              </div>
            ))}
            {p.press && p.press.length > 0 && (
              <div style={{ display: "flex", gap: 8, marginTop: 16, paddingTop: 14, borderTop: `1px solid ${C.border}`, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "ui-monospace, monospace", letterSpacing: "0.08em" }}>as seen in</span>
                {p.press.map((pr) => (
                  <a key={pr.label} href={pr.url} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 12, fontWeight: 600, color: C.accent, textDecoration: "none", padding: "3px 10px", borderRadius: 5, background: C.accentBg, border: `1px solid ${C.accentBorder}`, transition: "all 0.15s", display: "inline-flex", alignItems: "center", gap: 4 }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = "#0f0f0f"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = C.accentBg; e.currentTarget.style.color = C.accent; }}
                  >
                    {pr.label} <ExternalLink size={10} />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* toggle */}
        <button onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", color: C.textMuted, fontSize: 12, cursor: "pointer", padding: "4px 0", display: "flex", alignItems: "center", gap: 4, marginTop: 12, marginBottom: 14, fontFamily: "inherit", transition: "color 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
        >
          {open ? "Hide details" : "Show details"}
          <ChevronDown size={13} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
        </button>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 18 }}>
          {p.tech.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href={p.live} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, padding: "7px 16px", borderRadius: 8, background: C.accent, color: "#0f0f0f", textDecoration: "none", fontWeight: 700, transition: "background 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.accentText)}
            onMouseLeave={(e) => (e.currentTarget.style.background = C.accent)}
          >
            Live <ExternalLink size={12} />
          </a>
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, padding: "7px 16px", borderRadius: 8, border: `1px solid ${C.border}`, color: C.textSub, textDecoration: "none", fontWeight: 500, background: "transparent", transition: "border-color 0.15s, color 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.borderHover; e.currentTarget.style.color = C.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSub; }}
            >
              <Github size={12} /> GitHub
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

// ─── main ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const W = 900; // max content width
  const px = "clamp(24px, 5vw, 56px)";

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text }}>
      <Nav />

      {/* ── hero ── */}
      <section style={{ maxWidth: W, margin: "0 auto", padding: `clamp(56px, 10vh, 108px) ${px} 60px`, animation: "fadeUp 0.5s ease both" }}>

        {/* status pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px 6px 10px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 20 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 13, color: "#5fdd96", fontWeight: 600 }}>Available for collaborations</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px 6px 10px", background: C.accentBg, border: `1px solid ${C.accentBorder}`, borderRadius: 20 }}>
            <Wrench size={13} style={{ color: C.accent }} />
            <span style={{ fontSize: 13, color: C.accent, fontWeight: 600 }}>Building: Liquidation Protection · ReacDEFI</span>
          </div>
        </div>

        {/* name */}
        <h1 style={{ fontSize: "clamp(40px, 6.5vw, 64px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.text, margin: "0 0 14px", lineHeight: 1.08 }}>
          Harsh Kasana
        </h1>

        {/* role + location */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 22, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.textSub, fontSize: 15 }}>
            <Briefcase size={14} />
            <span>Junior Solidity Developer @{" "}<span style={{ color: C.accent, fontWeight: 600 }}>Reactive Network</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.textMuted, fontSize: 14 }}>
            <MapPin size={13} />
            <span>IIIT Nagpur</span>
          </div>
        </div>

        {/* bio */}
        <p style={{ color: C.textSub, fontSize: 16, lineHeight: 1.8, margin: "0 0 18px", maxWidth: 580 }}>
          Building DeFi infrastructure at{" "}
          <a href="https://reactive.network" target="_blank" rel="noopener noreferrer" style={{ color: C.text, fontWeight: 600, textDecoration: "underline", textDecorationColor: C.border, textUnderlineOffset: 3 }}>
            Reactive Network
          </a>. Final-year B.Tech at IIIT Nagpur.
        </p>

        {/* positioning callout */}
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.accent}`, borderRadius: 10, padding: "16px 20px", marginBottom: 32, maxWidth: 580 }}>
          <p style={{ fontSize: 15, color: C.textSub, lineHeight: 1.8, margin: 0 }}>
            If you want a product built end-to-end by one person — I&apos;m your person. Ideation, engineering, design, distribution, growth. I use AI the way a good engineer should — as leverage, not a crutch.{" "}
            <span style={{ color: C.text, fontWeight: 600 }}>The real edge is taste and intuition</span>: knowing what to build, what to skip, and why. That mattered before AI. It matters more now.
          </p>
        </div>

        {/* achievements */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 32px", marginBottom: 32, paddingBottom: 28, borderBottom: `1px solid ${C.border}` }}>
          {[
            { icon: "💰", text: "$13K+ in grants & prizes" },
            { icon: "🚀", text: "160 users in 48hrs"       },
            { icon: "📰", text: "Featured on CryptoSlate"  },
            { icon: "🏆", text: "6× hackathon wins"        },
          ].map(({ icon, text }) => (
            <span key={text} style={{ fontSize: 14, color: C.textSub, display: "flex", alignItems: "center", gap: 7 }}>
              <span>{icon}</span><span style={{ color: C.text, fontWeight: 600 }}>{text}</span>
            </span>
          ))}
        </div>

        {/* CTAs + socials */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          <a href="https://drive.google.com/file/d/1XWUQz163qUy_kAph3NB-UXjbG29sx1IE/view?usp=sharing"
            target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 700, color: "#0f0f0f", textDecoration: "none", padding: "9px 18px", borderRadius: 9, background: C.accent, transition: "background 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.accentText)}
            onMouseLeave={(e) => (e.currentTarget.style.background = C.accent)}
          >
            <FileText size={14} /> Resume
          </a>
          <a href="https://medium.com/@harshkasana05" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 500, color: C.textSub, textDecoration: "none", padding: "9px 18px", borderRadius: 9, background: "transparent", border: `1px solid ${C.border}`, transition: "all 0.15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.borderHover; e.currentTarget.style.color = C.text; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSub; }}
          >
            <BookOpen size={14} /> Writing
          </a>

          <div style={{ width: 1, height: 26, background: C.border, margin: "0 4px" }} />

          {[
            { Icon: Github,   href: "https://github.com/harshkas4na",                       label: "GitHub"   },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/harsh-kasana-8b6a79258/",  label: "LinkedIn" },
            { Icon: Twitter,  href: "https://twitter.com/0xkasana",                          label: "Twitter"  },
            { Icon: Mail,     href: "mailto:harshkasana05@gmail.com",                        label: "Email"    },
          ].map(({ Icon, href, label }) => (
            <a key={href} href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
              title={label}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", color: C.textMuted, padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.border}`, textDecoration: "none", transition: "all 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.borderHover; e.currentTarget.style.color = C.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; }}
            >
              <Icon size={16} />
              <span className="sr-only">{label}</span>
            </a>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── featured projects ── */}
      <section id="projects" style={{ maxWidth: W, margin: "0 auto", padding: `48px ${px}` }}>
        <Reveal><SectionLabel>Selected Projects</SectionLabel></Reveal>
        {FEATURED.map((p, i) => <ProjectCard key={p.name} p={p} i={i} />)}
      </section>

      {/* ── more projects ── */}
      <section style={{ maxWidth: W, margin: "0 auto", padding: `0 ${px} 48px` }}>
        <Reveal><SectionLabel>More Projects</SectionLabel></Reveal>
        <div className="more-grid">
          {MORE.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <a href={p.link} target="_blank" rel="noopener noreferrer"
                style={{ display: "block", padding: "16px 18px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.bgCard, textDecoration: "none", transition: "all 0.15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = C.bgCardHover; e.currentTarget.style.borderColor = C.borderHover; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = C.bgCard; e.currentTarget.style.borderColor = C.border; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 7 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{p.name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, marginLeft: 8 }}>
                    <Tag>{p.tag}</Tag>
                    <ArrowUpRight size={13} style={{ color: C.textMuted }} />
                  </div>
                </div>
                <p style={{ fontSize: 13, color: C.textMuted, margin: 0, lineHeight: 1.55 }}>{p.desc}</p>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div style={{ marginTop: 18, textAlign: "center" }}>
            <a href="https://github.com/harshkas4na?tab=repositories" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: C.textMuted, textDecoration: "none", padding: "7px 14px", borderRadius: 7, transition: "color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
            >
              View all 73 repos on GitHub <ArrowUpRight size={13} />
            </a>
          </div>
        </Reveal>
      </section>

      <Divider />

      {/* ── about ── */}
      <section id="about" style={{ maxWidth: W, margin: "0 auto", padding: `48px ${px}` }}>
        <Reveal><SectionLabel>About</SectionLabel></Reveal>
        <div style={{ maxWidth: 660 }}>
          <Reveal delay={0.07}>
            <p style={{ color: C.textSub, fontSize: 15, lineHeight: 1.85, marginBottom: 18 }}>
              I&apos;m a Junior Solidity Developer at{" "}
              <a href="https://reactive.network" target="_blank" rel="noopener noreferrer" style={{ color: C.text, fontWeight: 600, textDecoration: "underline", textDecorationColor: C.border, textUnderlineOffset: 3 }}>
                Reactive Network
              </a>{" "}
              and a final-year B.Tech (ECE) student at IIIT Nagpur (CGPA 8.37). My focus: Reactive Smart Contracts, cross-chain architecture, and making blockchain accessible to non-technical users.
            </p>
            <p style={{ color: C.textSub, fontSize: 15, lineHeight: 1.85, marginBottom: 28 }}>
              I write about blockchain, DeFi systems, and product thinking on{" "}
              <a href="https://medium.com/@harshkasana05" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, fontWeight: 600, textDecoration: "underline", textDecorationColor: C.accentBorder, textUnderlineOffset: 3 }}>
                Medium
              </a>
              . My work spans no-code DeFi platforms, AI agents that autonomously manage on-chain positions, NFT royalty enforcement, and developer tooling for Reactive Network.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "ui-monospace, monospace", marginBottom: 12 }}>Skills</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {SKILLS.map((s) => <Tag key={s}>{s}</Tag>)}
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* ── journey ── */}
      <section id="journey" style={{ maxWidth: W, margin: "0 auto", padding: `48px ${px}` }}>
        <Reveal><SectionLabel>Journey</SectionLabel></Reveal>
        <div style={{ maxWidth: 640 }}>
          {TIMELINE.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ display: "flex", gap: 20, marginBottom: i < TIMELINE.length - 1 ? 4 : 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", marginTop: 4, flexShrink: 0, background: t.active ? "#22c55e" : C.border, boxShadow: t.active ? "0 0 0 3px rgba(34,197,94,0.18)" : "none", animation: t.active ? "pulse-dot 2s ease-in-out infinite" : "none" }} />
                  {i < TIMELINE.length - 1 && <div style={{ width: 1, flex: 1, background: C.border, minHeight: 30, marginTop: 5 }} />}
                </div>
                <div style={{ paddingBottom: i < TIMELINE.length - 1 ? 26 : 0 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "baseline", marginBottom: 3 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: 0, letterSpacing: "-0.01em" }}>{t.title}</p>
                    <span style={{ fontSize: 12, color: t.active ? C.accent : C.textMuted, fontFamily: "ui-monospace, monospace", fontWeight: t.active ? 600 : 400 }}>{t.org}</span>
                  </div>
                  <p style={{ fontSize: 12, color: C.textMuted, margin: "0 0 6px", fontFamily: "ui-monospace, monospace" }}>{t.date}</p>
                  <p style={{ fontSize: 14, color: C.textSub, margin: 0, lineHeight: 1.7 }}>{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── footer ── */}
      <footer style={{ maxWidth: W, margin: "0 auto", padding: `48px ${px} 72px` }}>
        <Reveal>
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: "32px 36px", marginBottom: 32, maxWidth: 600 }}>
            <p style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 10, letterSpacing: "-0.02em" }}>Let&apos;s work together</p>
            <p style={{ fontSize: 15, color: C.textSub, lineHeight: 1.75, marginBottom: 22 }}>
              Open to DeFi contracts, cross-chain projects, and founding engineer roles. If you need one person who can own the full stack — ideation to production — reach out.
            </p>
            <a href="mailto:harshkasana05@gmail.com"
              style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 700, color: "#0f0f0f", textDecoration: "none", padding: "10px 20px", borderRadius: 9, background: C.accent, transition: "background 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.accentText)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.accent)}
            >
              <Mail size={14} /> harshkasana05@gmail.com
            </a>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 13, color: C.textMuted, margin: 0 }}>Built by Harsh Kasana</p>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { Icon: Github,   href: "https://github.com/harshkas4na" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/harsh-kasana-8b6a79258/" },
                { Icon: Twitter,  href: "https://twitter.com/0xkasana" },
                { Icon: BookOpen, href: "https://medium.com/@harshkasana05" },
              ].map(({ Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ color: C.textMuted, transition: "color 0.15s", padding: 4 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </footer>
    </div>
  );
}
