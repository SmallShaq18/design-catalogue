import { Share2 } from "lucide-react";
import { toast } from "react-toastify";
import type { DesignProject } from "../types/DesignProject";

interface Props {
  project: DesignProject;
  iconSize?: number;
  iconColor?: string;
}

const toastStyle = {
  fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.08em",
  background: "#0a0908", color: "#f5f0ea", borderRadius: 0, boxShadow: "none",
  border: "1px solid rgba(245,240,234,0.1)", minHeight: "auto", padding: "0.6rem 1rem",
};

export const ProjectShare = ({ project, iconSize = 14, iconColor = "#f5f0ea" }: Props) => {
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/projects/${project.slug}`;
    if (navigator.share) {
      try { await navigator.share({ title: project.title, text: "Check out this project by SHAQ", url }); }
      catch { /* cancelled */ }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied.", { style: toastStyle });
      } catch { toast.error("Failed to copy.", { style: toastStyle }); }
    } else {
      window.prompt("Copy this link:", url);
    }
  };

  return (
    <button onClick={handleShare} title="Share project"
      style={{ background: "none", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 0, color: iconColor }}>
      <Share2 size={iconSize} />
    </button>
  );
};

/*import { Share2 } from "lucide-react";
import type { DesignItem } from "../types";
import { toast } from "react-toastify";

interface Props {
  item: DesignItem;
}

const ShareButton = ({ item }: Props) => {
  const handleShare = async (e: any) => {
    e.preventDefault();
    const url = `${window.location.origin}?item=${item.id}`;
    const shareData = {
      title: item.title,
      text: "Check out this design! ",
      url,
    };

    if (navigator.share) {

      try {
        await navigator.share(shareData);
      } catch (err) {
        toast.error("Sharing failed.");
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      } catch {
        toast.error("Failed to copy link.");
      }
    } else {
      // Fallback for very old browsers
      window.prompt("Copy this link:", url);
    }
  };

  return (
    <button title="Share" onClick={handleShare} >
      <Share2 size={18} className="-mb-1" />
    </button>
  );
};

export default ShareButton;*/