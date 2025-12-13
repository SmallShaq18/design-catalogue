import { useEffect, useRef, useState } from "react";
import { Heart, X, Download } from "lucide-react";
import ShareButton from "./ShareButton";
import type { DesignItem } from "../types";

interface Props {
  image: string;
  title: string;
  description?: string;
  category?: string;
  selected: DesignItem;
  onClose: () => void;
  onFavourite: () => void;
  isFavourite?: boolean;
  markDownloaded: (id: string) => void;
  onNext?: () => void;   // NEW
  onPrev?: () => void;   // NEW
}

export default function Lightbox({ image, title, description, category, selected, onClose, onFavourite,
  isFavourite, markDownloaded, onNext, onPrev }: Props) {

  const [fadeIn, setFadeIn] = useState(false);
  // For swipe
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setFadeIn(true); // Fade animation on mount
  }, []);

  // Keyboard navigation (ESC, arrows)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNext, onPrev]);

  const handleDownload = () => {
    markDownloaded(selected.id);
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (diff > 50 && onNext) onNext(); // swipe left → next
    if (diff < -50 && onPrev) onPrev(); // swipe right → prev

    touchStartX.current = null;
  };

  return (
    <div
      className={`fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 
      transition-opacity duration-300 ${fadeIn ? "opacity-100" : "opacity-0"}`}
      onClick={onClose} >
      <div
        className="relative max-w-4xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd} >

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition" >
          <X size={26} className="text-white" />
        </button>

        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className="max-h-[80vh] w-full object-contain rounded-xl shadow-[0_0_50px_rgba(255,0,200,0.4)]"
        />

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 mt-3">
          <a
            href={image}
            download={`${title}.jpg`}
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
            className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full shadow hover:scale-105 transition"
          >
            Download
            <Download size={18} />
          </a>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavourite();
            }}
            className="bg-white p-2 rounded-full shadow hover:scale-105 transition"
          >
            <Heart
              size={20}
              className={isFavourite ? "fill-red-500 text-red-500" : "text-black"}
            />
          </button>

          <div className="bg-white p-2 rounded-full text-black shadow hover:scale-105 transition">
            <ShareButton item={selected} />
          </div>
        </div>

        {/* TEXT INFO */}
        <div className="text-center text-white mt-4 max-w-lg">
          <h2 className="text-2xl font-bold capitalize">{title} ({category})</h2>
          {description && 
            <p className="text-sm  opacity-50 capitalize">{description}</p>
          }
        </div>
      </div>
    </div>
  );
}
