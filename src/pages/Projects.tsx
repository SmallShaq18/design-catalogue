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

/*import { useState, useMemo } from "react";
import { GalleryGrid } from "../Components/gallery/GalleryGrid";
import { projects, getAllCategories } from "../data/projects";
import { Search, X } from "lucide-react";

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = getAllCategories();

  const filteredProjects = useMemo(() => {
    let result = projects;

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header with premium styling *
        <div className="mb-16 md:mb-20">
          <div className="inline-block mb-4 animate-slide-up">
            <span className="text-sm font-semibold text-neonPink tracking-widest uppercase">
              All Projects
            </span>
          </div>

          <h1 className="h2-display text-white mb-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Explore Our Work
          </h1>

          <p className="text-lg text-white/60 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} to discover
          </p>
        </div>

        {/* Filters - Premium styled *
        <div className="space-y-6 md:space-y-8 mb-16 md:mb-20">
          {/* Search Bar *
          <div className="relative group animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-neonPink/10 to-electricPurple/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />

            <div className="relative flex items-center gap-3">
              <Search size={20} className="absolute left-5 text-white/40" />
              <input
                type="text"
                placeholder="Search by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-3 md:py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-neonPink/50 focus:bg-white/10 transition-all duration-300 text-base md:text-lg"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 text-white/40 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter *
          <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="mb-4">
              <span className="text-xs font-semibold text-white/60 tracking-widest uppercase">
                Filter by Category
              </span>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`group relative px-5 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all duration-300 overflow-hidden ${
                  selectedCategory === "all"
                    ? "bg-gradient-to-r from-hotOrange to-neonPink text-white shadow-lg"
                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {selectedCategory === "all" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-hotOrange/20 to-neonPink/20 blur-0 group-hover:blur-md transition-all" />
                )}
                <span className="relative">All</span>
              </button>

              {categories.map((cat, index) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`group relative px-5 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all duration-300 overflow-hidden ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-hotOrange to-neonPink text-white shadow-lg"
                      : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
                  }`}
                  style={{
                    animation: selectedCategory === "all" ? `stagger-item 0.5s ease-out ${(index + 1) * 0.05}s forwards` : undefined,
                    opacity: selectedCategory === "all" ? 0 : 1,
                  }}
                >
                  {selectedCategory === cat && (
                    <div className="absolute inset-0 bg-gradient-to-r from-hotOrange/20 to-neonPink/20 blur-0 group-hover:blur-md transition-all" />
                  )}
                  <span className="relative">{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery *
        {filteredProjects.length > 0 ? (
          <GalleryGrid projects={filteredProjects} />
        ) : (
          <div className="py-24 text-center">
            <div className="inline-block mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neonPink/20 to-electricPurple/20 flex items-center justify-center">
                <Search size={32} className="text-white/40" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-white/60 max-w-2xl mx-auto mb-8">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-hotOrange/20 to-neonPink/20 border border-white/20 text-white hover:border-white/40 transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};*/
