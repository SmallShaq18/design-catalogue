import { useState } from "react";
import { GalleryCard } from "./GalleryCard";
import { useFavourites } from "../../hooks/useFavourite";
import { useDownloads } from "../../hooks/useDownloaded";
import type { DesignProject } from "../../types/DesignProject";

// Re-export keys so other files can import from one place
export { LS_FAV, readFavourites, writeFavourites } from "../../hooks/useFavourite";
export { LS_DL, readDownloads, writeDownloads } from "../../hooks/useDownloaded";

type Layout = "masonry" | "grid";

interface Props {
  projects: DesignProject[];
  hideToolbar?: boolean;
}

export const GalleryGrid = ({ projects: items, hideToolbar = false }: Props) => {
  const [layout, setLayout] = useState<Layout>("masonry");
  const { isFavourite, toggle } = useFavourites();
  const { isDownloaded, markDownloaded } = useDownloads();

  if (items.length === 0) return null;

  const iconFill = (active: boolean) => active ? "#f5f0ea" : "rgba(10,9,8,0.4)";

  return (
    <div>
      {!hideToolbar && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem",
            letterSpacing: "0.2em", color: "rgba(10,9,8,0.3)", textTransform: "uppercase" as const }}>
            {items.length} {items.length === 1 ? "Project" : "Projects"}
          </span>
          <div style={{ display: "flex", gap: "0.35rem" }}>
            {(["masonry", "grid"] as Layout[]).map((l) => (
              <button key={l} onClick={() => setLayout(l)} title={l}
                style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                  background: layout === l ? "#0a0908" : "transparent",
                  border: `1px solid ${layout === l ? "#0a0908" : "rgba(10,9,8,0.15)"}`,
                  cursor: "pointer", transition: "all 0.2s ease", padding: 0 }}>
                {l === "masonry" ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="0" y="0" width="5" height="7" fill={iconFill(layout === l)} />
                    <rect x="7" y="0" width="5" height="4" fill={iconFill(layout === l)} />
                    <rect x="7" y="6" width="5" height="6" fill={iconFill(layout === l)} />
                    <rect x="0" y="9" width="5" height="3" fill={iconFill(layout === l)} />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="0" y="0" width="5" height="5" fill={iconFill(layout === l)} />
                    <rect x="7" y="0" width="5" height="5" fill={iconFill(layout === l)} />
                    <rect x="0" y="7" width="5" height="5" fill={iconFill(layout === l)} />
                    <rect x="7" y="7" width="5" height="5" fill={iconFill(layout === l)} />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={
  layout === "masonry"
    ? "columns-2 lg:columns-3 gap-[clamp(0.75rem,1.5vw,1.25rem)]"
    : "grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[clamp(0.75rem,1.5vw,1.25rem)]"
}
      //style={
        //layout === "masonry"
          //? { columnCount: 3, columnGap: "clamp(0.75rem,1.5vw,1.25rem)" }
          //: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "clamp(0.75rem,1.5vw,1.25rem)" }
      >
        {items.map((project) => (
          <div key={project.id}
            style={layout === "masonry" ? { marginBottom: "clamp(0.75rem,1.5vw,1.25rem)", breakInside: "avoid" } : {}}>
            <GalleryCard
              project={project}
              isFavourite={isFavourite(project.id)}
              onToggleFavourite={() => toggle(project.id)}
              isDownloaded={isDownloaded(project.id)}
              onMarkDownloaded={() => markDownloaded(project.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/*import { useState, useCallback } from "react";
import { GalleryCard } from "./GalleryCard";
import type { DesignProject } from "../../types/DesignProject";

// ─── localStorage helpers ────────────────────────────────────────────────────
export const LS_FAV = "shaq_favourites";
export const LS_DL  = "shaq_downloaded";

export const readLS = (key: string): string[] => {
  try { return JSON.parse(localStorage.getItem(key) ?? "[]"); }
  catch { return []; }
};
export const writeLS = (key: string, val: string[]) =>
  localStorage.setItem(key, JSON.stringify(val));

type Layout = "masonry" | "grid";

interface Props {
  projects: DesignProject[];
  hideToolbar?: boolean;
}

export const GalleryGrid = ({ projects: items, hideToolbar = false }: Props) => {
  const [layout, setLayout]       = useState<Layout>("masonry");
  const [favourites, setFavourites] = useState<string[]>(() => readLS(LS_FAV));
  const [downloaded, setDownloaded] = useState<string[]>(() => readLS(LS_DL));

  const toggleFav = useCallback((id: string) => {
    setFavourites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeLS(LS_FAV, next);
      return next;
    });
  }, []);

  const markDownloaded = useCallback((id: string) => {
    setDownloaded((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      writeLS(LS_DL, next);
      return next;
    });
  }, []);

  if (items.length === 0) return null;

  const iconFill = (active: boolean) => active ? "#f5f0ea" : "rgba(10,9,8,0.4)";

  return (
    <div>
      {!hideToolbar && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "rgba(10,9,8,0.3)", textTransform: "uppercase" as const }}>
            {items.length} {items.length === 1 ? "Project" : "Projects"}
          </span>
          <div style={{ display: "flex", gap: "0.35rem" }}>
            {(["masonry", "grid"] as Layout[]).map((l) => (
              <button key={l} onClick={() => setLayout(l)} title={l}
                style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                  background: layout === l ? "#0a0908" : "transparent",
                  border: `1px solid ${layout === l ? "#0a0908" : "rgba(10,9,8,0.15)"}`,
                  cursor: "pointer", transition: "all 0.2s ease", padding: 0 }}>
                {l === "masonry" ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="0" y="0" width="5" height="7" fill={iconFill(layout === l)} />
                    <rect x="7" y="0" width="5" height="4" fill={iconFill(layout === l)} />
                    <rect x="7" y="6" width="5" height="6" fill={iconFill(layout === l)} />
                    <rect x="0" y="9" width="5" height="3" fill={iconFill(layout === l)} />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="0" y="0" width="5" height="5" fill={iconFill(layout === l)} />
                    <rect x="7" y="0" width="5" height="5" fill={iconFill(layout === l)} />
                    <rect x="0" y="7" width="5" height="5" fill={iconFill(layout === l)} />
                    <rect x="7" y="7" width="5" height="5" fill={iconFill(layout === l)} />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={
        layout === "masonry"
          ? { columnCount: 3, columnGap: "clamp(0.75rem,1.5vw,1.25rem)" }
          : { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "clamp(0.75rem,1.5vw,1.25rem)" }
      }>
        {items.map((project) => (
          <div key={project.id}
            style={layout === "masonry" ? { marginBottom: "clamp(0.75rem,1.5vw,1.25rem)", breakInside: "avoid" } : {}}>
            <GalleryCard
              project={project}
              isFavourite={favourites.includes(project.id)}
              onToggleFavourite={() => toggleFav(project.id)}
              isDownloaded={downloaded.includes(project.id)}
              onMarkDownloaded={() => markDownloaded(project.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};*/