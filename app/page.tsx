"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Github, Linkedin, Twitter, Mail, ExternalLink, ArrowUpRight,
  ChevronDown, MapPin, Briefcase, FileText, BookOpen, X, Menu, Wrench,
  Quote, Target, Maximize2, Play, type LucideIcon,
} from "lucide-react";
import {
  PROJECTS, MORE, TIMELINE, SKILLS, PRESS,
  TESTIMONIALS, LOOKING_FOR, applyPreset,
  X_STATS, ARTICLES, PROJECT_HIGHLIGHTS,
  type Project,
} from "./data";

// ─── color tokens ─────────────────────────────────────────────────────────────
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
  accentText:   "#f5c878",
};

// ─── hooks ────────────────────────────────────────────────────────────────────

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const visibility = new Map<string, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visibility.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        }
        let bestId = ids[0];
        let bestRatio = -1;
        visibility.forEach((ratio, id) => {
          if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
        });
        if (bestRatio > 0) setActive(bestId);
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

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

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ padding: "8px 14px", background: C.bgInset, border: `1px solid ${C.border}`, borderRadius: 8, display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: C.accent, letterSpacing: "-0.01em", lineHeight: 1.1 }}>{value}</span>
      <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "ui-monospace, monospace", letterSpacing: "0.04em" }}>{label}</span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.textMuted, fontFamily: "ui-monospace, monospace", marginBottom: 24 }}>
      {children}
    </p>
  );
}

function Divider() { return <div style={{ height: 1, background: C.border }} />; }

// ─── nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // focus trap + restore + Esc-to-close + body scroll lock
  useEffect(() => {
    if (!menuOpen) return;

    const root = menuRef.current;
    if (!root) return;

    const prevActive = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter((el) => !el.hasAttribute("aria-hidden"));

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      (prevActive ?? openBtnRef.current)?.focus();
    };
  }, [menuOpen]);

  const links = ["projects", "about", "journey"] as const;

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
          <span style={{ fontSize: 15, fontWeight: 700, color: C.text, letterSpacing: "-0.01em" }}>Harsh Kasana</span>
          <div className="hide-mobile" style={{ gap: 2 }}>
            {links.map((s) => (
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
          <button ref={openBtnRef} className="show-mobile" onClick={() => setMenuOpen(true)}
            style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 7, padding: "6px 8px", cursor: "pointer", color: C.textSub, alignItems: "center", justifyContent: "center" }}
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu">
            <Menu size={18} />
          </button>
        </div>
      </nav>

      <div ref={menuRef} id="mobile-menu" className={`mobile-menu${menuOpen ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Site navigation">
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
            style={{ fontSize: "clamp(22px, 6.5vw, 30px)", fontWeight: 700, color: C.text, textDecoration: "none", letterSpacing: "-0.02em" }}>
            {label}
          </a>
        ))}
      </div>
    </>
  );
}

// ─── project media (image with hover-to-play video) ──────────────────────────

function VideoLightbox({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} video`}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(8,8,8,0.92)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(8px, 4vw, 48px)", animation: "fadeUp 0.2s ease both",
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close video"
        style={{
          position: "absolute", top: 18, right: 20, background: "rgba(24,24,24,0.85)",
          border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 10px",
          cursor: "pointer", color: C.text, display: "flex", alignItems: "center",
        }}
      >
        <X size={18} />
      </button>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 1200, position: "relative" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: C.textSub, fontFamily: "ui-monospace, monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
          {title}
        </p>
        <video
          src={src}
          controls
          autoPlay
          playsInline
          controlsList="nodownload"
          style={{
            width: "100%", maxHeight: "80vh", borderRadius: 12,
            background: "#000", border: `1px solid ${C.border}`, display: "block",
          }}
        />
        <p style={{ fontSize: 11, color: C.textMuted, fontFamily: "ui-monospace, monospace", letterSpacing: "0.06em", marginTop: 10 }}>
          ESC or click outside to close · right-click for playback speed
        </p>
      </div>
    </div>
  );
}

function ProjectMedia({ p }: { p: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };
  const handleLeave = () => {
    if (videoRef.current) videoRef.current.pause();
  };

  // touch devices: autoplay when card is in view, pause when it leaves
  useEffect(() => {
    if (!p.video || !containerRef.current || !videoRef.current) return;
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia?.("(hover: none)").matches;
    if (!isTouch) return;

    const el = containerRef.current;
    const v = videoRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.55 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [p.video]);

  if (!p.image && !p.video) {
    return (
      <div className="project-media">
        <div className="project-media-fallback">
          <span>{p.category.toUpperCase()}</span>
        </div>
      </div>
    );
  }

  const clickable = Boolean(p.video);

  return (
    <>
      <div
        ref={containerRef}
        className="project-media"
        data-playing={isPlaying ? "true" : "false"}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleEnter}
        onBlur={handleLeave}
        onClick={() => clickable && setLightbox(true)}
        onKeyDown={(e) => { if (clickable && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); setLightbox(true); } }}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        aria-label={clickable ? `Play ${p.name} video` : undefined}
        style={{ cursor: clickable ? "pointer" : "default" }}
      >
        {p.image && (
          <Image
            src={p.image}
            alt={`${p.name} preview`}
            fill
            sizes="(max-width: 900px) 100vw, 800px"
            style={{ objectFit: "cover" }}
            priority={false}
          />
        )}
        {p.video && (
          <video
            ref={videoRef}
            src={p.videoPreview || p.video}
            poster={p.image || undefined}
            muted
            loop
            playsInline
            preload="metadata"
            controls={false}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )}
        {p.video && (
          <div className="project-media-overlay">
            <div className="project-media-play">
              <Play size={20} fill="currentColor" />
            </div>
          </div>
        )}
        {p.video && (
          <div style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(15,15,15,0.82)", border: `1px solid ${C.border}`, color: C.textSub, fontSize: 10, padding: "4px 9px", borderRadius: 5, fontFamily: "ui-monospace, monospace", letterSpacing: "0.06em", textTransform: "uppercase", pointerEvents: "none", display: "flex", alignItems: "center", gap: 5 }}>
            <Maximize2 size={10} /> click to expand
          </div>
        )}
      </div>
      {lightbox && p.video && (
        <VideoLightbox src={p.video} title={p.name} onClose={() => setLightbox(false)} />
      )}
    </>
  );
}

// ─── project card ─────────────────────────────────────────────────────────────

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen) {
      requestAnimationFrame(() => {
        cardRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      });
    }
  };

  return (
    <Reveal delay={i * 0.07}>
      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        className="project-card"
        style={{ background: hovered ? C.bgCardHover : C.bgCard, border: `1px solid ${hovered ? C.borderHover : C.border}`, borderRadius: 14, marginBottom: 14, transition: "background 0.15s, border-color 0.15s" }}
      >
        <ProjectMedia p={p} />

        {/* header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 8, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5, flexWrap: "wrap" }}>
              <h3 style={{ fontSize: "clamp(16px, 4.4vw, 18px)", fontWeight: 700, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>{p.name}</h3>
              <span style={{ fontSize: "clamp(10px, 3vw, 11px)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.textMuted, fontFamily: "ui-monospace, monospace" }}>{p.category}</span>
            </div>
            <p style={{ color: C.textSub, fontSize: "clamp(14px, 3.8vw, 15px)", margin: 0, lineHeight: 1.6 }}>{p.hook}</p>
          </div>
          <Badge label={p.badge} color={p.badgeColor} />
        </div>

        {/* metrics */}
        {p.metrics && p.metrics.length > 0 && (
          <div className="metrics-row">
            {p.metrics.map((m) => <Metric key={m.label} value={m.value} label={m.label} />)}
          </div>
        )}

        {/* expandable */}
        <div className="project-card-collapsible" data-open={open ? "true" : "false"} aria-hidden={!open}>
          <div style={{ minHeight: 0 }}>
            <div style={{ margin: "16px 0 4px", padding: "16px 18px", background: C.bgInset, borderRadius: 10, border: `1px solid ${C.border}` }}>
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
          </div>
        </div>

        {/* toggle */}
        <button onClick={handleToggle}
          aria-expanded={open}
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
          {p.live ? (
            <a href={p.live} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, padding: "7px 16px", borderRadius: 8, background: C.accent, color: "#0f0f0f", textDecoration: "none", fontWeight: 700, transition: "background 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.accentText)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.accent)}
            >
              Live <ExternalLink size={12} />
            </a>
          ) : (
            <span
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, padding: "7px 16px", borderRadius: 8, background: C.accent, color: "#0f0f0f", fontWeight: 700 }}
            >
              Desktop App
            </span>
          )}
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

// ─── press strip ─────────────────────────────────────────────────────────────

function PressStrip() {
  return (
    <div className="press-strip">
      {PRESS.map((p) => (
        <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" title={`Read on ${p.name}`}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            padding: "16px 18px", borderRadius: 10, border: `1px solid ${C.border}`,
            background: C.bgCard, transition: "all 0.15s", textDecoration: "none",
            minHeight: 68,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.borderHover; e.currentTarget.style.background = C.bgCardHover; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bgCard; }}
        >
          {p.logo && (
            <Image src={p.logo} alt={p.name} width={28} height={28} style={{ objectFit: "contain", maxHeight: 28, width: "auto", flexShrink: 0, filter: "grayscale(20%) brightness(0.95)" }} />
          )}
          <span style={{ fontSize: 13, fontWeight: 600, color: C.textSub, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{p.name}</span>
        </a>
      ))}
    </div>
  );
}

// ─── social link with hover preview card ─────────────────────────────────────

type SocialDef = {
  Icon: LucideIcon;
  href: string;
  label: string;
  handle: string;
  blurb: string;
  preview?: string; // optional /public path — falls back to styled card if missing
};

const SOCIAL_LINKS: SocialDef[] = [
  {
    Icon: Github, href: "https://github.com/harshkas4na", label: "GitHub", handle: "@harshkas4na",
    blurb: "Open-source DeFi protocols, Reactive Smart Contracts & dev tooling.",
    preview: "/social-headers/github-header.png",
  },
  {
    Icon: Linkedin, href: "https://www.linkedin.com/in/harsh-kasana-8b6a79258/", label: "LinkedIn", handle: "Harsh Kasana",
    blurb: "Solidity & DApp Developer · Reactive Network · IIIT Nagpur.",
    preview: "/social-headers/linkedin-header.png",
  },
  {
    Icon: Twitter, href: "https://twitter.com/0xkasana", label: "Twitter", handle: "@0xkasana",
    blurb: "Building in public — DeFi, Reactive Smart Contracts, shipping notes.",
    preview: "/social-headers/X-header.png",
  },
  {
    Icon: BookOpen, href: "https://medium.com/@harshkasana05", label: "Medium", handle: "@harshkasana05",
    blurb: "Long-form writing on blockchain, DeFi systems & product thinking.",
    preview: "/social-headers/medium-header.png",
  },
];

function SocialLink({ Icon, href, label, handle, blurb, preview }: SocialDef) {
  const [hover, setHover] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  return (
    <div style={{ position: "relative" }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)} onBlur={() => setHover(false)}
    >
      <a href={href} target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 500, color: hover ? C.text : C.textSub, padding: "7px 13px", borderRadius: 8, border: `1px solid ${hover ? C.borderHover : C.border}`, background: hover ? C.bgCard : "transparent", textDecoration: "none", transition: "all 0.15s" }}
      >
        <Icon size={14} /> {label}
      </a>
      {hover && (
        <div className="social-preview" role="tooltip">
          {preview && imgOk ? (
            <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: C.bgInset, borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: "hidden" }}>
              <Image src={preview} alt={`${label} preview`} fill sizes="280px" style={{ objectFit: "cover" }} onError={() => setImgOk(false)} />
            </div>
          ) : (
            <div style={{ width: "100%", aspectRatio: "16 / 9", background: "linear-gradient(135deg, rgba(232,180,94,0.12) 0%, rgba(96,165,250,0.08) 100%)", display: "flex", alignItems: "center", justifyContent: "center", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
              <Icon size={36} />
            </div>
          )}
          <div style={{ padding: "12px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{label}</span>
              <span style={{ fontSize: 11, color: C.accent, fontFamily: "ui-monospace, monospace" }}>{handle}</span>
            </div>
            <p style={{ fontSize: 12, color: C.textSub, lineHeight: 1.55, margin: 0 }}>{blurb}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── hero ────────────────────────────────────────────────────────────────────

function Hero({ px, W }: { px: string; W: number }) {
  return (
    <section style={{ maxWidth: W, margin: "0 auto", padding: `clamp(48px, 9vh, 96px) ${px} clamp(36px, 6vh, 56px)`, animation: "fadeUp 0.5s ease both" }}>

      {/* status pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px 5px 9px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 20 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
          <span style={{ fontSize: 12, color: "#5fdd96", fontWeight: 600 }}>Available — June 2026</span>
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px 5px 9px", background: C.accentBg, border: `1px solid ${C.accentBorder}`, borderRadius: 20 }}>
          <Wrench size={12} style={{ color: C.accent }} />
          <span style={{ fontSize: 12, color: C.accent, fontWeight: 600 }}>Now building: Liquidation Protection · ReacDEFI</span>
        </div>
      </div>

      <div className="hero-row">
        {/* profile photo */}
        <div className="hero-photo" style={{ flexShrink: 0 }}>
          <Image src="/profile-photos/pic.jpg" alt="Harsh Kasana" width={96} height={96} priority
style={{
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  objectFit: "cover",
  objectPosition: "50% 22%",
  border: `1px solid ${C.border}`,
}}          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: "clamp(28px, 7vw, 46px)", fontWeight: 800, letterSpacing: "-0.035em", color: C.text, margin: "0 0 10px", lineHeight: 1.1 }}>
            Harsh Kasana
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.textSub, fontSize: 14 }}>
              <Briefcase size={13} />
              <span>Solidity & DApp Developer @{" "}<span style={{ color: C.accent, fontWeight: 600 }}>Reactive Network</span></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.textMuted, fontSize: 13 }}>
              <MapPin size={12} />
              <span>IIIT Nagpur</span>
            </div>
          </div>

          {/* primary value prop — what readers should see first */}
          <p style={{ color: C.text, fontSize: "clamp(15px, 4vw, 17px)", lineHeight: 1.65, margin: "0 0 14px", maxWidth: "min(600px, 100%)", fontWeight: 500, letterSpacing: "-0.005em" }}>
            I ship DeFi products end-to-end — ideation to production.{" "}
            <span style={{ color: C.textSub, fontWeight: 400 }}>Taste over tooling.</span>
          </p>

          <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.65, margin: 0, maxWidth: "min(600px, 100%)" }}>
            Building DeFi infrastructure at{" "}
            <a href="https://reactive.network" target="_blank" rel="noopener noreferrer" style={{ color: C.textSub, fontWeight: 500, textDecoration: "underline", textDecorationColor: C.border, textUnderlineOffset: 3 }}>
              Reactive Network
            </a>. Final-year B.Tech at IIIT Nagpur.
          </p>
        </div>
      </div>

      {/* achievement metrics — stat cards */}
      <div className="hero-stats">
        {[
          { value: "$15K+", label: "grants & prizes" },
          { value: "160",   label: "users in 48 hrs" },
          { value: "4",     label: "press features"  },
          { value: "6×",    label: "hackathon wins"  },
        ].map((s) => (
          <div key={s.label} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.accent, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: C.textMuted, fontFamily: "ui-monospace, monospace", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 22 }}>
        <a href="/resume/HARSH_Resume.pdf" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 700, color: "#0f0f0f", textDecoration: "none", padding: "10px 20px", borderRadius: 9, background: C.accent, transition: "background 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = C.accentText)}
          onMouseLeave={(e) => (e.currentTarget.style.background = C.accent)}
        >
          <FileText size={14} /> Resume
        </a>
        <a href="mailto:harshkasana05@gmail.com"
          style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 600, color: C.text, textDecoration: "none", padding: "10px 20px", borderRadius: 9, background: "transparent", border: `1px solid ${C.borderHover}`, transition: "all 0.15s" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = C.bgCard; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          <Mail size={14} /> Get in touch
        </a>
      </div>

      {/* labeled socials with hover preview */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {SOCIAL_LINKS.map((s) => <SocialLink key={s.href} {...s} />)}
      </div>
    </section>
  );
}

// ─── projects (preset-aware) ─────────────────────────────────────────────────

function ProjectsSection() {
  const params = useSearchParams();
  const preset = params?.get("preset");
  const featured = applyPreset(preset);

  return (
    <>
      <Reveal>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <SectionLabel>Selected Projects</SectionLabel>
          {preset && (
            <span style={{ fontSize: 11, color: C.accent, fontFamily: "ui-monospace, monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              preset: {preset}
            </span>
          )}
        </div>
      </Reveal>
      {featured.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
    </>
  );
}

// ─── side rails (≥1280px only) ───────────────────────────────────────────────

const RAIL_SECTIONS = [
  { id: "projects", label: "Projects" },
  { id: "about",    label: "About" },
  { id: "journey",  label: "Journey" },
  { id: "contact",  label: "Contact" },
];
const RAIL_IDS = RAIL_SECTIONS.map((s) => s.id);

function SectionNav() {
  const active = useActiveSection(RAIL_IDS);
  return (
    <nav aria-label="Page sections" className="rail-nav">
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.textMuted, fontFamily: "ui-monospace, monospace", margin: "0 0 14px 14px" }}>
        On this page
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 2 }}>
        {RAIL_SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                className="rail-nav-link"
                data-active={isActive ? "true" : "false"}
              >
                <span className="rail-nav-bar" aria-hidden="true" />
                <span>{s.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${C.border}`, marginLeft: 14 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.textMuted, fontFamily: "ui-monospace, monospace", margin: "0 0 10px" }}>
          Quick links
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <a href="/resume/HARSH_Resume.pdf" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, color: C.textSub, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7 }}>
            <FileText size={12} /> Resume
          </a>
          <a href="https://medium.com/@harshkasana05" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, color: C.textSub, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7 }}>
            <BookOpen size={12} /> Writing
          </a>
          <a href="mailto:harshkasana05@gmail.com"
            style={{ fontSize: 12, color: C.textSub, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7 }}>
            <Mail size={12} /> Email
          </a>
        </div>
      </div>
    </nav>
  );
}

function RailCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px" }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.textMuted, fontFamily: "ui-monospace, monospace", margin: "0 0 12px" }}>
        {title}
      </p>
      {children}
    </div>
  );
}

function HighlightsRail() {
  const projectMap = new Map(PROJECTS.map((p) => [p.id, p]));

  return (
    <aside aria-label="Highlights" className="rail-highlights">
      {/* X stats */}
      <RailCard title="X Analytics">
        <a href={X_STATS.url} target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 13, fontWeight: 700, color: C.text, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Twitter size={13} /> @{X_STATS.handle}
        </a>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 11", marginTop: 10, borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}`, background: C.bgInset }}>
          <Image src="/social-headers/X-analytics.png" alt="X analytics snapshot" fill sizes="248px" style={{ objectFit: "cover" }} />
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.accent, lineHeight: 1.1 }}>{X_STATS.followers}</div>
            <div style={{ fontSize: 10, color: C.textMuted, fontFamily: "ui-monospace, monospace", letterSpacing: "0.06em", marginTop: 3 }}>followers</div>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.accent, lineHeight: 1.1 }}>{X_STATS.impressions30d}</div>
            <div style={{ fontSize: 10, color: C.textMuted, fontFamily: "ui-monospace, monospace", letterSpacing: "0.06em", marginTop: 3 }}>30d impressions</div>
          </div>
        </div>
        {X_STATS.topPost?.url && X_STATS.topPost.text !== "TBD — paste your highest-performing post here" && (
          <a href={X_STATS.topPost.url} target="_blank" rel="noopener noreferrer"
            style={{ display: "block", marginTop: 12, padding: "10px 12px", background: C.bgInset, borderRadius: 8, border: `1px solid ${C.border}`, textDecoration: "none" }}>
            <p style={{ fontSize: 12, color: C.textSub, lineHeight: 1.55, margin: 0 }}>
              &ldquo;{X_STATS.topPost.text}&rdquo;
            </p>
            <p style={{ fontSize: 10, color: C.textMuted, fontFamily: "ui-monospace, monospace", letterSpacing: "0.06em", marginTop: 6 }}>
              ♥ {X_STATS.topPost.likes} · top post
            </p>
          </a>
        )}
      </RailCard>

      {/* Project highlights */}
      {PROJECT_HIGHLIGHTS.length > 0 && (
        <RailCard title="Highlights">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {PROJECT_HIGHLIGHTS.map((h) => {
              const proj = projectMap.get(h.projectId);
              return (
                <a
                  key={h.projectId}
                  href={proj ? `#projects` : "#projects"}
                  style={{ display: "flex", gap: 10, alignItems: "flex-start", textDecoration: "none" }}
                >
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.accent, fontFamily: "ui-monospace, monospace", flexShrink: 0, minWidth: 42 }}>
                    {h.metric}
                  </span>
                  <span style={{ fontSize: 12, color: C.textSub, lineHeight: 1.5 }}>
                    {proj && <span style={{ color: C.text, fontWeight: 600 }}>{proj.name}</span>}
                    {proj && <span style={{ color: C.textMuted }}> · </span>}
                    {h.label}
                  </span>
                </a>
              );
            })}
          </div>
        </RailCard>
      )}

      {/* Articles */}
      <RailCard title={`Writing · ${ARTICLES.length}`}>
        <a href="https://medium.com/@harshkasana05" target="_blank" rel="noopener noreferrer"
          style={{ display: "block", position: "relative", width: "100%", aspectRatio: "21 / 10", marginBottom: 12, borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}`, background: C.bgInset }}>
          <Image src="/social-headers/medium-header.png" alt="Medium profile banner" fill sizes="248px" style={{ objectFit: "cover" }} />
        </a>
        {ARTICLES.length > 0 ? (
          <>
            <div className="rail-articles-list" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {ARTICLES.map((a) => (
                <a key={a.title} href={a.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", textDecoration: "none" }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: C.text, margin: 0, lineHeight: 1.45 }}>
                    {a.title}
                  </p>
                  <p style={{ fontSize: 10, color: C.textMuted, fontFamily: "ui-monospace, monospace", letterSpacing: "0.06em", marginTop: 4 }}>
                    {a.platform}{a.impressions ? ` · ${a.impressions}` : ""} · {a.date}
                  </p>
                </a>
              ))}
            </div>
            <a href="https://medium.com/@harshkasana05" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: C.accent, textDecoration: "none", marginTop: 12, fontFamily: "ui-monospace, monospace", letterSpacing: "0.06em" }}>
              All articles on Medium <ArrowUpRight size={11} />
            </a>
          </>
        ) : (
          <>
            <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.55, margin: 0 }}>
              Long-form on blockchain & DeFi systems.
            </p>
            <a href="https://medium.com/@harshkasana05" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: C.accent, textDecoration: "none", marginTop: 10, fontFamily: "ui-monospace, monospace", letterSpacing: "0.06em" }}>
              Read on Medium <ArrowUpRight size={11} />
            </a>
          </>
        )}
      </RailCard>
    </aside>
  );
}

// ─── main ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const W = 900;
  const px = "clamp(24px, 5vw, 56px)";

  const hasTestimonials = TESTIMONIALS.length > 0;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text }}>
      <Nav />
      <div className="page-shell">
        <aside className="rail-left" aria-hidden="false">
          <SectionNav />
        </aside>
        <div className="page-main">
      <Hero px={px} W={W} />

      <Divider />

      {/* ── press strip ── */}
      <section style={{ maxWidth: W, margin: "0 auto", padding: `40px ${px}` }}>
        <Reveal><SectionLabel>As Featured In</SectionLabel></Reveal>
        <Reveal delay={0.05}><PressStrip /></Reveal>
      </section>

      <Divider />

      {/* ── projects ── */}
      <section id="projects" style={{ maxWidth: W, margin: "0 auto", padding: `48px ${px}` }}>
        <Suspense fallback={<SectionLabel>Selected Projects</SectionLabel>}>
          <ProjectsSection />
        </Suspense>
      </section>

      {/* ── more projects ── */}
      <section style={{ maxWidth: W, margin: "0 auto", padding: `0 ${px} 48px` }}>
        <Reveal><SectionLabel>More Projects</SectionLabel></Reveal>
        <div className="more-grid">
          {MORE.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <a href={`/projects/${p.slug}`}
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
      </section>

      <Divider />

      {/* ── testimonials (auto-hides if empty) ── */}
      {hasTestimonials && (
        <>
          <section style={{ maxWidth: W, margin: "0 auto", padding: `48px ${px}` }}>
            <Reveal><SectionLabel>What People Say</SectionLabel></Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 22px", height: "100%" }}>
                    <Quote size={16} style={{ color: C.accent, marginBottom: 10 }} />
                    <p style={{ fontSize: 15, color: C.text, lineHeight: 1.7, margin: "0 0 14px", fontStyle: "italic" }}>&ldquo;{t.quote}&rdquo;</p>
                    <p style={{ fontSize: 13, color: C.text, fontWeight: 600, margin: 0 }}>{t.author}</p>
                    <p style={{ fontSize: 12, color: C.textMuted, margin: "2px 0 0" }}>{t.role}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
          <Divider />
        </>
      )}

      {/* ── about ── */}
      <section id="about" style={{ maxWidth: W, margin: "0 auto", padding: `48px ${px}` }}>
        <Reveal><SectionLabel>About</SectionLabel></Reveal>
        <div style={{ maxWidth: 660 }}>
          <Reveal delay={0.07}>
            <p style={{ color: C.textSub, fontSize: 15, lineHeight: 1.85, marginBottom: 18 }}>
              I&apos;m a Solidity & DApp Developer at{" "}
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

      {/* ── what I'm looking for ── */}
      <section style={{ maxWidth: W, margin: "0 auto", padding: `48px ${px}` }}>
        <Reveal><SectionLabel>What I&apos;m Looking For</SectionLabel></Reveal>
        <Reveal delay={0.05}>
          <div className="lf-grid" style={{ marginBottom: 18 }}>
            {[
              { label: "Roles",     value: LOOKING_FOR.roles.join(" · ") },
              { label: "Stage",     value: LOOKING_FOR.stage },
              { label: "Location",  value: LOOKING_FOR.location },
              { label: "Available", value: LOOKING_FOR.available },
            ].map((row) => (
              <div key={row.label} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px" }}>
                <p style={{ fontSize: 11, color: C.textMuted, fontFamily: "ui-monospace, monospace", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>{row.label}</p>
                <p style={{ fontSize: 14, color: C.text, lineHeight: 1.55, margin: 0 }}>{row.value}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 16px", background: C.accentBg, border: `1px solid ${C.accentBorder}`, borderRadius: 10, maxWidth: 660 }}>
            <Target size={16} style={{ color: C.accent, marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.6, margin: 0 }}>{LOOKING_FOR.note}</p>
          </div>
        </Reveal>
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
      <footer id="contact" style={{ maxWidth: W, margin: "0 auto", padding: `48px ${px} 72px` }}>
        <Reveal>
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: "32px 36px", marginBottom: 32, maxWidth: 600 }}>
            <p style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 10, letterSpacing: "-0.02em" }}>Let&apos;s work together</p>
            <p style={{ fontSize: 15, color: C.textSub, lineHeight: 1.75, marginBottom: 22 }}>
              Open to Solidity, full-stack Web3, and DeFi protocol roles. If you need someone who can own the full stack — ideation to production — reach out.
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
        <aside className="rail-right" aria-hidden="false">
          <HighlightsRail />
        </aside>
      </div>
    </div>
  );
}
