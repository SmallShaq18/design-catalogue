import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Download, Loader } from "lucide-react";
//import { ProjectShare } from "./ProjectShare";
import { ProjectShare } from "../ShareButton"
import { downloadImage } from "../../utils/donwload";
import { useFavourites } from "../../hooks/useFavourite";
import { useDownloads } from "../../hooks/useDownloaded";
import { toast } from "react-toastify";
import type { DesignProject } from "../../types/DesignProject";

interface Props {
  project: DesignProject;
  // These can still be passed in (e.g. from GalleryGrid) or the card reads hooks directly
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
  const [hovered, setHovered]         = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Fall back to own hooks if props not provided (e.g. standalone usage)
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
    <div
      style={{ position: "relative", display: "block", background: "rgba(10,9,8,0.05)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/projects/${project.slug}`} style={{ display: "block", textDecoration: "none" }}>
        <img
          src={project.coverImage} alt={project.title} loading="lazy"
          style={{
            width: "100%", height: "auto", display: "block",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            filter: hovered ? "brightness(0.68)" : "brightness(1)",
            transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.45s ease",
          }}
        />
        {/* Hover caption */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          justifyContent: "flex-end", padding: "1.1rem",
          opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease", pointerEvents: "none" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.2em",
            textTransform: "uppercase" as const, color: "rgba(245,240,234,0.5)", display: "block",
            marginBottom: "0.25rem", transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "transform 0.35s ease" }}>{project.category}</span>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic",
            fontSize: "0.95rem", color: "#f5f0ea", display: "block",
            transform: hovered ? "translateY(0)" : "translateY(8px)", transition: "transform 0.35s ease 0.04s" }}>
            {project.title}
          </span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.15em",
            color: "rgba(245,240,234,0.4)", marginTop: "0.4rem", display: "inline-block",
            borderBottom: "1px solid rgba(245,240,234,0.3)", paddingBottom: "1px",
            transform: hovered ? "translateY(0)" : "translateY(8px)", transition: "transform 0.35s ease 0.07s" }}>
            View project →
          </span>
        </div>
      </Link>

      {/* Actions */}
      <div style={{ position: "absolute", top: "0.65rem", right: "0.65rem", display: "flex",
        gap: "0.3rem", opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease", zIndex: 2 }}>
        <ActionBtn
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFav(); }}
          title={isFav ? "Remove from favourites" : "Save to favourites"}
        >
          <Heart size={13} style={{ fill: isFav ? "#ef4444" : "none", color: isFav ? "#ef4444" : "#f5f0ea",
            transition: "fill 0.2s, color 0.2s" }} />
        </ActionBtn>

        <ActionBtn onClick={handleDownload} title="Download image">
          {downloading
            ? <Loader size={13} color="#f5f0ea" style={{ animation: "spin 0.8s linear infinite" }} />
            : <Download size={13} color="#f5f0ea" />}
        </ActionBtn>

        <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(10,9,8,0.65)", border: "1px solid rgba(245,240,234,0.15)", color: "#f5f0ea" }}>
          <ProjectShare project={project} />
        </div>
      </div>

      {isDl && (
        <div style={{ position: "absolute", bottom: "0.65rem", left: "0.65rem",
          fontFamily: "'DM Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.14em",
          textTransform: "uppercase" as const, color: "#f5f0ea",
          background: "rgba(10,9,8,0.7)", padding: "0.2rem 0.45rem", pointerEvents: "none" }}>
          ✓ Downloaded
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

const ActionBtn = ({ onClick, title, children }: {
  onClick: (e: React.MouseEvent) => void; title?: string; children: React.ReactNode;
}) => (
  <button onClick={onClick} title={title} style={{ width: 32, height: 32, display: "flex",
    alignItems: "center", justifyContent: "center", background: "rgba(10,9,8,0.65)",
    border: "1px solid rgba(245,240,234,0.15)", cursor: "pointer", padding: 0 }}>
    {children}
  </button>
);

/*import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Download, Loader } from "lucide-react";
//import { ProjectShare } from "./ProjectShare";
import { ProjectShare } from "../ShareButton"
import { downloadImage } from "../../utils/donwload";
import { toast } from "react-toastify";
import type { DesignProject } from "../../types/DesignProject";

interface Props {
  project: DesignProject;
  isFavourite: boolean;
  onToggleFavourite: () => void;
  isDownloaded: boolean;
  onMarkDownloaded: () => void;
}

export const GalleryCard = ({
  project, isFavourite, onToggleFavourite, isDownloaded, onMarkDownloaded,
}: Props) => {
  const [hovered, setHovered]       = useState(false);
  const [downloading, setDownloading] = useState(false);

  const filename = project.coverImage.split("/").pop() ?? `${project.slug}.jpg`;

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (downloading) return;

    await downloadImage(
      project.coverImage,
      filename,
      () => setDownloading(true),
      () => {
        setDownloading(false);
        onMarkDownloaded();
      },
      () => {
        setDownloading(false);
        toast.error("Download failed — try again.");
      }
    );
  };

  return (
    <div
      style={{ position: "relative", display: "block", background: "rgba(10,9,8,0.05)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image → project page *
      <Link to={`/projects/${project.slug}`} style={{ display: "block", textDecoration: "none" }}>
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          style={{
            width: "100%", height: "auto", display: "block",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            filter: hovered ? "brightness(0.68)" : "brightness(1)",
            transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.45s ease",
          }}
        />

        {/* Hover caption *
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          justifyContent: "flex-end", padding: "1.1rem",
          opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease", pointerEvents: "none",
        }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem",
            letterSpacing: "0.2em", textTransform: "uppercase" as const,
            color: "rgba(245,240,234,0.5)", display: "block", marginBottom: "0.25rem",
            transform: hovered ? "translateY(0)" : "translateY(8px)", transition: "transform 0.35s ease" }}>
            {project.category}
          </span>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic",
            fontSize: "0.95rem", color: "#f5f0ea", display: "block",
            transform: hovered ? "translateY(0)" : "translateY(8px)", transition: "transform 0.35s ease 0.04s" }}>
            {project.title}
          </span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem",
            letterSpacing: "0.15em", color: "rgba(245,240,234,0.4)", marginTop: "0.4rem",
            display: "inline-block", borderBottom: "1px solid rgba(245,240,234,0.3)", paddingBottom: "1px",
            transform: hovered ? "translateY(0)" : "translateY(8px)", transition: "transform 0.35s ease 0.07s" }}>
            View project →
          </span>
        </div>
      </Link>

      {/* Action buttons *
      <div style={{
        position: "absolute", top: "0.65rem", right: "0.65rem",
        display: "flex", gap: "0.3rem",
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease", zIndex: 2,
      }}>
        {/* Heart *
        <ActionBtn
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavourite(); }}
          title={isFavourite ? "Remove from favourites" : "Save to favourites"}
        >
          <Heart size={13} style={{ fill: isFavourite ? "#ef4444" : "none", color: isFavourite ? "#ef4444" : "#f5f0ea" }} />
        </ActionBtn>

        {/* Download — blob fetch *
        <ActionBtn onClick={handleDownload} title="Download image">
          {downloading
            ? <Loader size={13} color="#f5f0ea" style={{ animation: "spin 0.8s linear infinite" }} />
            : <Download size={13} color="#f5f0ea" />
          }
        </ActionBtn>

        {/* Share *
        <div style={{
          width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(10,9,8,0.65)", border: "1px solid rgba(245,240,234,0.15)", color: "#f5f0ea",
        }}>
          <ProjectShare project={project} />
        </div>
      </div>

      {/* Downloaded pip *
      {isDownloaded && (
        <div style={{
          position: "absolute", bottom: "0.05rem", left: "0.65rem",
          fontFamily: "'DM Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.14em",
          textTransform: "uppercase" as const, color: "#f5f0ea",
          background: "rgba(10,9,8,0.7)", padding: "0.2rem 0.45rem", pointerEvents: "none",
        }}>✓ Downloaded</div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

const ActionBtn = ({ onClick, title, children }: {
  onClick: (e: React.MouseEvent) => void;
  title?: string;
  children: React.ReactNode;
}) => (
  <button onClick={onClick} title={title} style={{
    width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(10,9,8,0.65)", border: "1px solid rgba(245,240,234,0.15)",
    cursor: "pointer", padding: 0,
  }}>
    {children}
  </button>
);*/

