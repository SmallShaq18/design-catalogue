import { Link } from "react-router-dom";
import { GalleryGrid } from "../Components/gallery/GalleryGrid";
import { projects, getFeaturedProjects, getAllCategories } from "../data/projects";
import { useEffect, useRef, useState } from "react";
import React from "react";

/* ─── Scroll-reveal hook ─── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── Eyebrow label ─── */
const Label = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <span style={{
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.58rem",
    letterSpacing: "0.25em",
    color: light ? "rgba(245,240,234,0.35)" : "rgba(10,9,8,0.35)",
    textTransform: "uppercase" as const,
  }}>
    {children}
  </span>
);

/* ─── Hairline rule ─── */
const Rule = ({ style, light = false }: { style?: React.CSSProperties; light?: boolean }) => (
  <div style={{ height: 1, background: light ? "rgba(245,240,234,0.12)" : "rgba(10,9,8,0.1)", ...style }} />
);

/* ─── Category card ─── */
const CategoryCard = ({ category, count, image, index }: {
  category: string; count: number; image: string; index: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useReveal();

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${index * 0.08}s, transform 0.65s ease ${index * 0.08}s`,
    }}>
      <Link
        to={`/categories/${category}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display: "block", textDecoration: "none" }}
      >
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4", marginBottom: "0.9rem" }}>
          <img
            src={image}
            alt={category}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transform: hovered ? "scale(1.07)" : "scale(1)",
              filter: hovered ? "brightness(0.8)" : "brightness(1)",
              transition: "transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease",
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(10,9,8,0.55)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "#f5f0ea",
              textTransform: "uppercase" as const,
              transform: hovered ? "translateY(0)" : "translateY(10px)",
              transition: "transform 0.4s ease 0.05s",
              display: "inline-block",
              borderBottom: "1px solid rgba(245,240,234,0.4)",
              paddingBottom: "2px",
            }}>
              Explore →
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", paddingTop: "0.1rem" }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1.1rem",
            fontStyle: "italic",
            color: "#0a0908",
            letterSpacing: "0.005em",
            textTransform: "capitalize" as const,
          }}>
            {category}
          </span>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.58rem",
            color: "rgba(10,9,8,0.3)",
            letterSpacing: "0.08em",
          }}>
            {String(count).padStart(2, "0")}
          </span>
        </div>
        <Rule style={{ marginTop: "0.9rem" }} />
      </Link>
    </div>
  );
};

/* ─── Home page ─── */
export const Home = () => {
  const featuredProjects = getFeaturedProjects();
  const categories = getAllCategories();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const featuredReveal = useReveal();
  const catReveal = useReveal();
  const ctaReveal = useReveal();

  const fadeIn = (delay: number): React.CSSProperties => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? "none" : "translateY(16px)",
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0ea", color: "#0a0908" }}>

      {/* ══════ HERO ══════ */}
      <section className="p-5" style={{ maxWidth: 1440, margin: "0 auto", /*padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,4vw,3rem) 0"*/ }}>

        {/* Top meta bar */}
        {/*<div style={fadeIn(0)}>
          <Rule />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.7rem 0" }}>
            <Label>Est. 2024 · Kano, Nigeria</Label>
            <Label>Branding · Print · Identity</Label>
          </div>
          <Rule />
        </div>*/}

        

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", overflow: "hidden" }}>
          <div
           style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(5rem,18vw,17rem)",
              lineHeight: 0.87,
              letterSpacing: "-0.035em",
              color: "#0a0908",
              ...fadeIn(0.08),
            }}
          >
            Shaq
          </div>

          {/* Tagline block */}
          <div style={{ maxWidth: 260, paddingBottom: "clamp(1rem,2vw,2rem)", ...fadeIn(0.4) }}>
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.78rem",
              lineHeight: 2,
              letterSpacing: "0.07em",
              color: "rgba(10,9,8,0.95)",
              margin: 0,
            }}>
              A graphic design practice<br />
              specialising in brand identity,<br />
              print, poster &amp; visual campaigns.
            </p>
          </div>
        </div>

      </section>

      {/* ══════ FEATURED WORK ══════ */}
      <section
        id="featured"
        style={{ maxWidth: 1440, margin: "0 auto", padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,4vw,3rem)" }}
      >
        <div
          ref={featuredReveal.ref}
          style={{
            opacity: featuredReveal.visible ? 1 : 0,
            transform: featuredReveal.visible ? "none" : "translateY(22px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(2rem,4vw,3.5rem)", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              
              <Label>01 — Featured</Label>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(2rem,5vw,3.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "#0a0908",
                margin: "0.35rem 0 0",
              }}>
                Selected Work
              </h2>
            </div>
            <Link
              to="/projects"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "#0a0908",
                textDecoration: "none",
                borderBottom: "1px solid rgba(10,9,8,0.25)",
                paddingBottom: "2px",
              }}
            >
              View All →
            </Link>
          </div>
          <Rule style={{ marginBottom: "clamp(2rem,4vw,3rem)" }} />
        </div>

        <GalleryGrid projects={featuredProjects.slice(0, 3)} />
      </section>

      {/* ══════ MARQUEE STRIP ══════ */}
      <div style={{ background: "#0a0908", borderTop: "1px solid rgba(245,240,234,0.06)", borderBottom: "1px solid rgba(245,240,234,0.06)", overflow: "hidden", padding: "1.05rem 0" }}>
        <div style={{ display: "flex", animation: "marquee 24s linear infinite", whiteSpace: "nowrap" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: "0.95rem",
              color: "rgba(245,240,234,0.48)",
              letterSpacing: "0.1em",
              flexShrink: 0,
              paddingRight: "3.5rem",
            }}>
              Branding · Logo Systems · Poster Design · Print · Visual Identity
            </span>
          ))}
        </div>
      </div>

      {/* ══════ CATEGORIES ══════ */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,4vw,3rem)" }}>
        <div
          ref={catReveal.ref}
          style={{
            opacity: catReveal.visible ? 1 : 0,
            transform: catReveal.visible ? "none" : "translateY(22px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <Rule />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "clamp(1.5rem,3vw,2.5rem) 0 clamp(2rem,4vw,3rem)", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <Label>02 — Categories</Label>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(2rem,5vw,3.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "#0a0908",
                margin: "0.35rem 0 0",
              }}>
                Browse by Category
              </h2>
            </div>
            <Label>{categories.length} Categories</Label>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
          gap: "clamp(1.25rem,2.5vw,2rem)",
        }}>
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat}
              category={cat}
              count={projects.filter(p => p.category === cat).length}
              image={projects.find(p => p.category === cat)?.coverImage || ""}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "0 clamp(1.5rem,4vw,3rem) clamp(4rem,10vw,8rem)" }}>
        <div
          ref={ctaReveal.ref}
          style={{
            opacity: ctaReveal.visible ? 1 : 0,
            transform: ctaReveal.visible ? "none" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <Rule />
          <div style={{ display: "flex", justifyContent: "space-between", padding: "0.7rem 0" }}>
            <Label>03 — Contact</Label>
            <Label>Open for projects</Label>
          </div>
          <Rule />

          <div style={{
            marginTop: "clamp(3rem,7vw,6rem)",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "end",
            gap: "2rem",
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600,
              fontStyle: "italic",
              fontSize: "clamp(2.5rem,8vw,7rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "#0a0908",
              margin: 0,
            }}>
              Have a project<br />in mind?
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", alignItems: "flex-end", paddingBottom: "0.5rem" }}>
              <a
                href="https://x.com/thesmallshaq___"
                target="_blank"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase" as const,
                  color: "#f5f0ea",
                  background: "#0a0908",
                  padding: "0.95rem 1.8rem",
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                Get in Touch →
              </a>
              <Link
                to="/projects"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase" as const,
                  color: "rgba(10,9,8,0.4)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(10,9,8,0.2)",
                  paddingBottom: "1px",
                }}
              >
                View Full Portfolio
              </Link>
            </div>
          </div>

          {/* Service indicators */}
          <div style={{
            marginTop: "clamp(3rem,6vw,5rem)",
            display: "flex",
            gap: "clamp(2rem,6vw,5rem)",
            flexWrap: "wrap",
          }}>
            {[
              ["Fast Turnaround", "Deadline-driven delivery"],
              ["Premium Quality", "Studio-grade craft"],
              ["Full Ownership", "All source files included"],
            ].map(([title, sub]) => (
              <div key={title}>
                <div style={{ width: 28, height: 1, background: "rgba(10,9,8,0.2)", marginBottom: "0.7rem" }} />
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "#0a0908",
                  margin: "0 0 0.2rem",
                  letterSpacing: "0.01em",
                }}>
                  {title}
                </p>
                <p style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.08em",
                  color: "rgba(10,9,8,0.35)",
                  margin: 0,
                }}>
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=DM+Mono:wght@400;500&display=swap');
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

/*import { Link } from "react-router-dom";
import { GalleryGrid } from "../Components/gallery/GalleryGrid";
import { Button } from "../Components/ui/Button";
import { projects, getFeaturedProjects, getAllCategories } from "../data/projects";
import { ArrowRight } from "lucide-react";

export const Home = () => {
  const featuredProjects = getFeaturedProjects();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen">
      {/* Hero Section - Premium Styling *
      <section className="relative py-24 md:py-40 overflow-hidden">
        {/* Decorative background elements *
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-neonPink/10 to-transparent rounded-full blur-3xl -mr-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-electricPurple/10 to-transparent rounded-full blur-3xl -ml-32" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 text-center">
          {/* Subtitle *
          <div className="inline-block mb-8 animate-fade-in-blur">
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-sm font-semibold text-white/60 tracking-widest">
                ✨ PORTFOLIO SHOWCASE
              </span>
            </div>
          </div>

          {/* Main heading with premium typography *
          <h1 className="h1-display text-white mb-8 animate-slide-up">
            Creative Design
            <br />
            <span className="bg-gradient-to-r from-hotOrange via-neonPink to-electricPurple bg-clip-text text-transparent">
              Excellence
            </span>
          </h1>

          {/* Description *
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Explore a curated collection of design work spanning branding, posters, print,
            and digital experiences. Each project tells a unique story.
          </p>

          {/* CTA Buttons *
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/projects">
              <Button size="lg" className="group">
                <span>View All Projects</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <a href="#featured">
              <Button variant="outline" size="lg">
                Explore Work
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Projects Section *
      <section id="featured" className="relative py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Section header with premium styling *
          <div className="mb-16 md:mb-20">
            <div className="inline-block mb-4 animate-slide-up">
              <span className="text-sm font-semibold text-neonPink tracking-widest uppercase">
                Featured Collection
              </span>
            </div>

            <h2 className="h2-display text-white mb-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Featured Work
            </h2>

            <p className="text-lg text-white/60 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Showcase of our latest and greatest projects
            </p>
          </div>

          <GalleryGrid projects={featuredProjects.slice(0, 3)} />

          {featuredProjects.length > 3 && (
            <div className="text-center mt-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/projects">
                <Button variant="secondary" size="lg" className="group">
                  <span>View More Projects</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section - Premium Styling *
      <section className="relative py-24 md:py-40 border-t border-white/5">
        {/* Background accent *
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-8">
          {/* Section header *
          <div className="mb-16 md:mb-20">
            <div className="inline-block mb-4 animate-slide-up">
              <span className="text-sm font-semibold text-neonPink tracking-widest uppercase">
                Explore By Category
              </span>
            </div>

            <h2 className="h2-display text-white mb-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Browse by Category
            </h2>

            <p className="text-lg text-white/60 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Discover work organized by type and style
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {categories.map((category, index) => {
              const count = projects.filter((p) => p.category === category).length;
              return (
                <Link
                  key={category}
                  to={`/categories/${category}`}
                  className="group relative h-64 rounded-2xl overflow-hidden stagger-item"
                  style={{
                    opacity: 0,
                    animation: `stagger-item 0.5s ease-out ${index * 0.1}s forwards`,
                  }}
                >
                  {/* Image with reveal effect *
                  <img
                    src={
                      projects.find((p) => p.category === category)?.coverImage || ""
                    }
                    alt={category}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                  />

                  {/* Premium overlay *
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent group-hover:from-slate-950/70 transition-all duration-300" />

                  {/* Accent overlay on hover *
                  <div className="absolute inset-0 bg-gradient-to-br from-neonPink/0 via-transparent to-electricPurple/0 group-hover:from-neonPink/10 group-hover:to-electricPurple/10 transition-all duration-500" />

                  {/* Content *
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h3 className="text-2xl font-semibold text-white capitalize mb-2 group-hover:text-neonPink transition-colors duration-300">
                      {category}
                    </h3>
                    <p className="text-white/70 text-sm">{count} {count === 1 ? "project" : "projects"}</p>
                  </div>

                  {/* Border glow *
                  <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-neonPink/30 transition-colors duration-300 pointer-events-none" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section - Premium *
      <section className="relative py-24 md:py-40 overflow-hidden">
        {/* Decorative backgrounds *
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-hotOrange/10 via-neonPink/5 to-electricPurple/10 m-6 md:m-0" />
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-slate-950/50 to-transparent m-6 md:m-0" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left content *
            <div>
              <h2 className="h3-title text-white mb-6">
                Ready to start a project?
              </h2>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                Let's collaborate and create something amazing together. Get in touch today and let's discuss how we can bring your vision to life.
              </p>

              <Button size="lg" className="group">
                <span>Get In Touch</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Button>

              {/* Trust indicators *
              <div className="mt-12 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-neonPink" />
                  <span className="text-white/70 text-sm">Fast turnaround times</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-electricPurple" />
                  <span className="text-white/70 text-sm">Premium quality work</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-neonPink" />
                  <span className="text-white/70 text-sm">24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Right decoration *
            <div className="hidden md:block relative h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-neonPink/20 to-electricPurple/20 rounded-2xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 h-full flex items-center justify-center">
                <span className="text-white/30 text-6xl font-display">♦</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};*/
