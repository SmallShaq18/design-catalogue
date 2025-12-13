import { Share2 } from "lucide-react";
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

export default ShareButton;