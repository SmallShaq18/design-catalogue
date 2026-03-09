import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projects, getAllCategories } from "../data/projects";

export const Categories = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const categories = getAllCategories();

  // Build category cards: pick first project's cover as the category image
  const categoryData = categories.map((cat) => {
    const catProjects = projects.filter((p) => p.category === cat);
    return {
      name: cat,
      count: catProjects.length,
      cover: catProjects[0]?.coverImage ?? "",
      slug: cat,
    };
  });

  const fadeIn = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "none" : "translateY(14px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0ea" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "3%" }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(3rem,5vw,4.5rem)" }}>
          <div style={fadeIn(0)}>
            <div style={{ height: 1, background: "rgba(10,9,8,0.1)", marginBottom: "0.7rem" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.7rem" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem",
                letterSpacing: "0.25em", color: "rgba(10,9,8,0.35)", textTransform: "uppercase" as const }}>
                Disciplines
              </span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem",
                letterSpacing: "0.18em", color: "rgba(10,9,8,0.3)" }}>
                {categories.length} Categories
              </span>
            </div>
            <div style={{ height: 1, background: "rgba(10,9,8,0.1)" }} />
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700,
            fontSize: "clamp(3rem,10vw,8rem)", lineHeight: 0.9, letterSpacing: "-0.03em",
            color: "#0a0908", margin: "clamp(1.5rem,3vw,2.5rem) 0 0",
            ...fadeIn(0.08),
          }}>
            Categories
          </h1>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(clamp(200px, 28vw, 340px), 1fr))",
            gap: "clamp(1rem, 2vw, 1.75rem)",
            ...fadeIn(0.18),
          }}
        >
          {categoryData.map((cat, i) => (
            <CategoryCard key={cat.name} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Category card ────────────────────────────────────────────────────────────
const CategoryCard = ({
  cat, index,
}: {
  cat: { name: string; count: number; cover: string; slug: string };
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/categories/${cat.slug}`}
      style={{ textDecoration: "none", display: "block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3", background: "rgba(10,9,8,0.06)", marginBottom: "0.85rem" }}>
        {cat.cover && (
          <img
            src={cat.cover}
            alt={cat.name}
            loading="lazy"
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              filter: hovered ? "brightness(0.7)" : "brightness(1)",
              transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.45s ease",
            }}
          />
        )}

        {/* Index number */}
        <span style={{
          position: "absolute", top: "0.75rem", left: "0.75rem",
          fontFamily: "'DM Mono', monospace", fontSize: "0.5rem",
          letterSpacing: "0.1em", color: "rgba(245,240,234,0.45)",
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Hover label */}
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease",
        }}>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: "0.58rem",
            letterSpacing: "0.2em", textTransform: "uppercase" as const,
            color: "#f5f0ea", borderBottom: "1px solid rgba(245,240,234,0.4)",
            paddingBottom: "2px",
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "transform 0.3s ease", display: "inline-block",
          }}>
            Browse →
          </span>
        </div>
      </div>

      {/* Label row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic",
          fontSize: "clamp(1rem,2vw,1.2rem)", color: "#0a0908", textTransform: "capitalize" as const,
          transition: "opacity 0.2s ease",
          opacity: hovered ? 0.55 : 1,
        }}>
          {cat.name}
        </span>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: "0.52rem",
          letterSpacing: "0.15em", color: "rgba(10,9,8,0.3)",
        }}>
          {cat.count} {cat.count === 1 ? "project" : "projects"}
        </span>
      </div>
    </Link>
  );
};