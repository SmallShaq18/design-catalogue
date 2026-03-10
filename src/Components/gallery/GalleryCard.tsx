import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Download, Loader } from "lucide-react";
//import { ProjectShare } from "../ShareButton";
import { ProjectShare } from "../ShareButton"
import { downloadImage } from "../../utils/donwload";
import { useFavourites } from "../../hooks/useFavourite";
import { useDownloads } from "../../hooks/useDownloaded";
import { toast } from "react-toastify";
import type { DesignProject } from "../../types/DesignProject";

interface Props {
  project: DesignProject;
  isFavourite?: boolean;
  onToggleFavourite?: () => void;
  isDownloaded?: boolean;
  onMarkDownloaded?: () => void;
}

export const GalleryCard = ({
  project,
  isFavourite: favProp,
  onToggleFavourite: toggleProp,
  isDownloaded: dlProp,
  onMarkDownloaded: markDlProp,
}: Props) => {
  const [imgHovered, setImgHovered]   = useState(false);
  const [downloading, setDownloading] = useState(false);

  const { isFavourite: hookFav, toggle: hookToggle } = useFavourites();
  const { isDownloaded: hookDl, markDownloaded: hookMark } = useDownloads();

  const isFav     = favProp    !== undefined ? favProp    : hookFav(project.id);
  const isDl      = dlProp     !== undefined ? dlProp     : hookDl(project.id);
  const toggleFav = toggleProp !== undefined ? toggleProp : () => hookToggle(project.id);
  const markDl    = markDlProp !== undefined ? markDlProp : () => hookMark(project.id);

  const filename = project.coverImage.split("/").pop() ?? `${project.slug}.jpg`;

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (downloading) return;
    await downloadImage(
      project.coverImage, filename,
      () => setDownloading(true),
      () => { setDownloading(false); markDl(); },
      () => { setDownloading(false); toast.error("Download failed — try again."); }
    );
  };

  return (
    <div style={{ background: "#f5f0ea", display: "flex", flexDirection: "column" }}>

      {/* ── Image ──────────────────────────────────────────────── */}
      <Link
        to={`/projects/${project.slug}`}
        style={{ display: "block", textDecoration: "none", overflow: "hidden", flexShrink: 0 }}
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
      >
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          style={{
            width: "100%", height: "auto", display: "block",
            transform: imgHovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />
      </Link>

      {/* ── Always-visible info bar ─────────────────────────────── */}
      <div style={{
        padding: "0.6rem 0.1rem 0.5rem",
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        gap: "0.5rem",
      }}>
        {/* Text */}
        <Link to={`/projects/${project.slug}`} style={{ textDecoration: "none", flex: 1, minWidth: 0 }}>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: "0.5rem",
            letterSpacing: "0.18em", textTransform: "uppercase" as const,
            color: "rgba(10,9,8,0.35)", display: "block", marginBottom: "0.2rem",
          }}>
            {project.category}
          </span>
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic",
            fontSize: "0.95rem", color: "#0a0908", display: "block",
            whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {project.title}
          </span>
        </Link>

        {/* Actions — always visible, compact */}
        <div style={{ display: "flex", gap: "0.25rem", flexShrink: 0, alignItems: "center", paddingTop: "0.15rem" }}>
          {/* Heart */}
          <ActionBtn
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFav(); }}
            title={isFav ? "Remove from favourites" : "Save to favourites"}
            active={isFav}
          >
            <Heart
              size={12}
              style={{
                fill: isFav ? "#ef4444" : "none",
                color: isFav ? "#ef4444" : "rgba(10,9,8,0.4)",
                transition: "fill 0.2s, color 0.2s",
              }}
            />
          </ActionBtn>

          {/* Download */}
          <ActionBtn onClick={handleDownload} title="Download image">
            {downloading
              ? <Loader size={12} color="rgba(10,9,8,0.4)" style={{ animation: "spin 0.8s linear infinite" }} />
              : <Download size={12} color={isDl ? "#0a0908" : "rgba(10,9,8,0.4)"} />
            }
          </ActionBtn>

          {/* Share */}
          <ActionBtn onClick={(e) => e.preventDefault()} title="Share">
            <ProjectShare project={project} iconSize={12} iconColor="rgba(10,9,8,0.4)" />
          </ActionBtn>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// ─── Action button ────────────────────────────────────────────────────────────
const ActionBtn = ({
  onClick, title, children, active,
}: {
  onClick: (e: React.MouseEvent) => void;
  title?: string;
  children: React.ReactNode;
  active?: boolean;
}) => (
  <button
    onClick={onClick}
    title={title}
    style={{
      width: 28, height: 28,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: active ? "rgba(10,9,8,0.06)" : "none",
      border: "1px solid rgba(10,9,8,0.1)",
      cursor: "pointer", padding: 0,
      transition: "background 0.2s, border-color 0.2s",
    }}
    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(10,9,8,0.06)")}
    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = active ? "rgba(10,9,8,0.06)" : "none")}
  >
    {children}
  </button>
);