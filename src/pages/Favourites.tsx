import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavourites } from "../hooks/useFavourite";
import { GalleryGrid } from "../Components/gallery/GalleryGrid";
import { ImageLightbox } from "../Components/gallery/ImageLightbox";
import { projects } from "../data/projects";

export const Favourites = () => {
  const [mounted, setMounted]           = useState(false);
  const [tab, setTab]                   = useState<"projects" | "images">("projects");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { favourites, toggle } = useFavourites();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Split favourites into project IDs vs individual image URLs
  const favProjectIds = useMemo(
    () => favourites.filter((x) => !x.startsWith("http")),
    [favourites]
  );
  const favImageUrls = useMemo(
    () => favourites.filter((x) => x.startsWith("http")),
    [favourites]
  );

  const favProjects = useMemo(
    () => projects.filter((p) => favProjectIds.includes(p.id)),
    [favProjectIds]
  );

  const isEmpty = favProjects.length === 0 && favImageUrls.length === 0;
  const hasBoth = favProjects.length > 0 && favImageUrls.length > 0;

  const fadeIn = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "none" : "translateY(14px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  // Auto-switch tab if the active one becomes empty
  useEffect(() => {
    if (tab === "projects" && favProjects.length === 0 && favImageUrls.length > 0) setTab("images");
    if (tab === "images"   && favImageUrls.length === 0 && favProjects.length > 0) setTab("projects");
  }, [favProjects.length, favImageUrls.length, tab]);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0ea" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "3%" }}>

        {/* ── Header ────────────────────────────────────────────── */}
        <div style={{ marginBottom: "clamp(3rem,5vw,4.5rem)" }}>
          <div style={fadeIn(0)}>
            <div style={{ height: 1, background: "rgba(10,9,8,0.1)", marginBottom: "0.7rem" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.7rem" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem",
                letterSpacing: "0.25em", color: "rgba(10,9,8,0.35)", textTransform: "uppercase" as const }}>
                Saved
              </span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem",
                letterSpacing: "0.18em", color: "rgba(10,9,8,0.3)" }}>
                {favourites.length} {favourites.length === 1 ? "Item" : "Items"}
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
            Favourites
          </h1>
        </div>

        {/* ── Empty state ───────────────────────────────────────── */}
        {isEmpty ? (
          <div style={{ padding: "5rem 0", textAlign: "center", ...fadeIn(0.15) }}>
            <Heart size={28} style={{ color: "rgba(10,9,8,0.12)", margin: "0 auto 1.5rem", display: "block" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic",
              fontSize: "1.4rem", color: "rgba(10,9,8,0.35)", marginBottom: "1.5rem" }}>
              Nothing saved yet.
            </p>
            <Link to="/projects" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem",
              letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#0a0908",
              textDecoration: "none", borderBottom: "1px solid rgba(10,9,8,0.3)", paddingBottom: "2px" }}>
              Browse Work →
            </Link>
          </div>
        ) : (
          <div style={fadeIn(0.15)}>

            {/* ── Tab switcher (only when both buckets have items) ── */}
            {hasBoth && (
              <div style={{ display: "flex", gap: "0.45rem", marginBottom: "2rem" }}>
                {(["projects", "images"] as const).map((t) => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "0.55rem",
                    letterSpacing: "0.18em", textTransform: "uppercase" as const,
                    padding: "0.32rem 0.8rem",
                    background: tab === t ? "#0a0908" : "transparent",
                    color: tab === t ? "#f5f0ea" : "rgba(10,9,8,0.4)",
                    border: `1px solid ${tab === t ? "#0a0908" : "rgba(10,9,8,0.15)"}`,
                    cursor: "pointer", transition: "all 0.2s ease",
                  }}>
                    {t === "projects"
                      ? `Projects (${favProjects.length})`
                      : `Images (${favImageUrls.length})`}
                  </button>
                ))}
              </div>
            )}

            {/* ── Saved projects ────────────────────────────────── */}
            {(!hasBoth || tab === "projects") && favProjects.length > 0 && (
              <GalleryGrid projects={favProjects} />
            )}

            {/* ── Saved individual images ───────────────────────── */}
            {(!hasBoth || tab === "images") && favImageUrls.length > 0 && (
              <>
                <div style={{ height: 1, background: "rgba(10,9,8,0.1)", marginBottom: "2rem" }} />
                <div style={{ display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: "clamp(0.75rem,1.5vw,1.25rem)" }}>
                  {favImageUrls.map((url, i) => (
                    <SavedImageCard
                      key={url}
                      url={url}
                      onOpen={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                      onRemove={() => toggle(url)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Lightbox for saved individual images */}
      <ImageLightbox
        images={favImageUrls}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

// ─── Saved image card ─────────────────────────────────────────────────────────
const SavedImageCard = ({
  url, onOpen, onRemove,
}: {
  url: string;
  onOpen: () => void;
  onRemove: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", cursor: "pointer" }}
    >
      <img src={url} alt="Saved image" loading="lazy" style={{
        width: "100%", height: "auto", display: "block",
        filter: hovered ? "brightness(0.72)" : "brightness(1)",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        transition: "filter 0.4s ease, transform 0.55s ease",
      }} />

      {/* Un-heart button */}
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        title="Remove from favourites"
        style={{
          position: "absolute", top: "0.6rem", right: "0.6rem",
          width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(10,9,8,0.65)", border: "1px solid rgba(245,240,234,0.15)",
          cursor: "pointer", padding: 0,
          opacity: hovered ? 1 : 0, transition: "opacity 0.25s ease",
        }}
      >
        <Heart size={12} style={{ fill: "#ef4444", color: "#ef4444" }} />
      </button>
    </div>
  );
};
