import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GalleryGrid } from "../Components/gallery/GalleryGrid";
import { getProjectsByCategory } from "../data/projects";

export const CategoryPage = () => {
  const { category } = useParams();
  const categoryProjects = getProjectsByCategory(category || "");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  if (categoryProjects.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f5f0ea",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: "1.5rem",
              color: "rgba(10,9,8,0.4)",
              marginBottom: "1.5rem",
            }}
          >
            No projects in this category.
          </p>
          <Link
            to="/categories"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: "#0a0908",
              textDecoration: "none",
              borderBottom: "1px solid rgba(10,9,8,0.3)",
              paddingBottom: "2px",
            }}
          >
            ← Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  const fadeIn = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "none" : "translateY(14px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0ea" }}>
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "3%",
        }}
      >
        {/* Back */}
        <div style={{ marginBottom: "clamp(2rem,4vw,3rem)", ...fadeIn(0) }}>
          <Link
            to="/categories"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: "rgba(10,9,8,0.8)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(10,9,8,0.55)",
              paddingBottom: "2px",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "#0a0908";
              el.style.borderBottomColor = "rgba(10,9,8)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "rgba(10,9,8,0.8)";
              el.style.borderBottomColor = "rgba(10,9,8,0.55)";
            }}
          >
            ← Back to Categories
          </Link>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "clamp(3rem,5vw,4.5rem)" }}>
          <div style={fadeIn(0.05)}>
            <div style={{ height: 1, background: "rgba(10,9,8,0.1)", marginBottom: "0.7rem" }} />
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.7rem" }}>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.25em",
                  color: "rgba(10,9,8,0.35)",
                  textTransform: "uppercase" as const,
                }}
              >
                Discipline
              </span>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.18em",
                  color: "rgba(10,9,8,0.3)",
                }}
              >
                {categoryProjects.length} {categoryProjects.length === 1 ? "Project" : "Projects"}
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
              textTransform: "capitalize" as const,
              ...fadeIn(0.12),
            }}
          >
            {category}
          </h1>
        </div>

        {/* Gallery */}
        <GalleryGrid projects={categoryProjects} />
      </div>
    </div>
  );
};