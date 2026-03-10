import { useState, useMemo, useEffect, useRef } from "react";
import { GalleryGrid } from "../Components/gallery/GalleryGrid";
import { projects, getAllCategories } from "../data/projects";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const categories = getAllCategories();
  const gridReveal = useReveal();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const filteredProjects = useMemo(() => {
    let result = projects;
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const fadeIn = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "none" : "translateY(16px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0ea" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "2%" }}>

        {/* Page header */}
        <div style={{ marginBottom: "clamp(3rem,6vw,5rem)" }}>
          <div style={fadeIn(0)}>
            <div style={{ height: 1, background: "rgba(10,9,8,0.1)", marginBottom: "0.7rem" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.7rem" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.25em", color: "rgba(10,9,8,0.35)", textTransform: "uppercase" as const }}>
                Full Catalogue
              </span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.18em", color: "rgba(10,9,8,0.3)" }}>
                {filteredProjects.length} {filteredProjects.length === 1 ? "Collection" : "Collections"}
              </span>
            </div>
            <div style={{ height: 1, background: "rgba(10,9,8,0.1)" }} />
          </div>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(3rem,10vw,8rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: "#0a0908",
              margin: "clamp(1.5rem,3vw,2.5rem) 0 0",
              ...fadeIn(0.08),
            }}
          >
            Collections
          </h1>
        </div>

        {/* Filters */}
        <div style={{ marginBottom: "clamp(2.5rem,5vw,4rem)", ...fadeIn(0.2) }}>
          {/* Search */}
          <div style={{ position: "relative", maxWidth: 440, marginBottom: "1.75rem" }}>
            <input
              type="text"
              placeholder="Search title, description, tags…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.07em",
                color: "#0a0908",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(10,9,8,0.2)",
                padding: "0.7rem 2rem 0.7rem 0",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => ((e.target as HTMLInputElement).style.borderBottomColor = "rgba(10,9,8,0.6)")}
              onBlur={(e) => ((e.target as HTMLInputElement).style.borderBottomColor = "rgba(10,9,8,0.2)")}
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "rgba(10,9,8,0.4)",
                }}
              >
                ✕
              </button>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(10,9,8,0.3)" strokeWidth="1.5"
                style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            )}
          </div>

          {/* Category pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
            {["all", ...categories].map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase" as const,
                    padding: "0.32rem 0.8rem",
                    background: active ? "#0a0908" : "transparent",
                    color: active ? "#f5f0ea" : "rgba(10,9,8,0.6)",
                    border: `1px solid ${active ? "#0a0908" : "rgba(10,9,8,0.25)"}`,
                    cursor: "pointer",
                    whiteSpace: "nowrap" as const,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.color = "#0a0908";
                      el.style.borderColor = "rgba(10,9,8,0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.color = "rgba(10,9,8,0.6)";
                      el.style.borderColor = "rgba(10,9,8,0.25)";
                    }
                  }}
                >
                  {cat === "all" ? "All" : cat}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(10,9,8,0.1)", marginBottom: "clamp(2rem,4vw,3rem)" }} />

        {/* Gallery or empty state */}
        <div
          ref={gridReveal.ref}
          style={{
            opacity: gridReveal.visible ? 1 : 0,
            transform: gridReveal.visible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {filteredProjects.length > 0 ? (
            <GalleryGrid projects={filteredProjects} />
          ) : (
            <div style={{ padding: "5rem 0", textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontSize: "1.5rem", color: "rgba(10,9,8,0.35)", marginBottom: "1.5rem" }}>
                Nothing matched that search.
              </p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase" as const,
                  color: "#0a0908",
                  background: "none",
                  border: "1px solid rgba(10,9,8,0.25)",
                  padding: "0.55rem 1.1rem",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(10,9,8,0.6)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(10,9,8,0.25)")}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};