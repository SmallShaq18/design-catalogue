import { useEffect, useRef, useState } from "react";
import { Heart, Download } from "lucide-react";
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
  onNext?: () => void;
  onPrev?: () => void;
}

export default function Lightbox({
  image, title, description, category, selected,
  onClose, onFavourite, isFavourite, markDownloaded, onNext, onPrev,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [imgKey, setImgKey] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Re-animate image on nav
  useEffect(() => { setImgKey(k => k + 1); }, [image]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose, onNext, onPrev]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50 && onNext) onNext();
    if (diff < -50 && onPrev) onPrev();
    touchStartX.current = null;
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(8,8,12,0.96)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(1rem, 3vw, 2rem)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ position: "relative", width: "100%", maxWidth: 900, display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "fixed",
            top: "clamp(1rem,3vw,1.5rem)",
            right: "clamp(1rem,3vw,1.5rem)",
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "1px solid rgba(245,240,234,0.15)",
            color: "rgba(245,240,234,0.6)",
            cursor: "pointer",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.75rem",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = "#f5f0ea";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,240,234,0.4)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = "rgba(245,240,234,0.6)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,240,234,0.15)";
          }}
        >
          ✕
        </button>

        {/* Image */}
        <img
          key={imgKey}
          src={image}
          alt={title}
          style={{
            maxHeight: "80vh",
            maxWidth: "100%",
            objectFit: "contain",
            display: "block",
            animation: "lb-in 0.35s cubic-bezier(0.16,1,0.3,1) both",
          }}
        />

        {/* Caption + actions */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginTop: "1.25rem",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {/* Text */}
          <div>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.52rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "rgba(245,240,234,0.35)",
                display: "block",
                marginBottom: "0.3rem",
              }}
            >
              {category}
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: "1.25rem",
                color: "#f5f0ea",
                margin: 0,
                textTransform: "capitalize" as const,
              }}
            >
              {title}
            </h2>
            {description && (
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.06em",
                  color: "rgba(245,240,234,0.35)",
                  marginTop: "0.35rem",
                  textTransform: "capitalize" as const,
                }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <a
              href={image}
              download={`${title}.jpg`}
              onClick={(e) => { e.stopPropagation(); markDownloaded(selected.id); }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
                color: "#0a0908",
                background: "#f5f0ea",
                padding: "0.6rem 1rem",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              <Download size={12} />
              Download
            </a>

            <button
              onClick={(e) => { e.stopPropagation(); onFavourite(); }}
              style={{
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                border: "1px solid rgba(245,240,234,0.15)",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
            >
              <Heart
                size={14}
                style={{ fill: isFavourite ? "#ef4444" : "none", color: isFavourite ? "#ef4444" : "#f5f0ea" }}
              />
            </button>

            <div
              style={{
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(245,240,234,0.15)",
                color: "#f5f0ea",
              }}
            >
              <ShareButton item={selected} />
            </div>
          </div>
        </div>

        {/* Prev / Next */}
        {(onPrev || onNext) && (
          <>
            {onPrev && (
              <NavBtn dir="prev" onClick={onPrev} />
            )}
            {onNext && (
              <NavBtn dir="next" onClick={onNext} />
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes lb-in {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

const NavBtn = ({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    aria-label={dir}
    style={{
      position: "fixed",
      [dir === "prev" ? "left" : "right"]: "clamp(0.75rem,2.5vw,1.5rem)",
      top: "50%",
      transform: "translateY(-50%)",
      width: 42,
      height: 42,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "none",
      border: "1px solid rgba(245,240,234,0.12)",
      color: "rgba(245,240,234,0.5)",
      cursor: "pointer",
      fontFamily: "'DM Mono', monospace",
      fontSize: "1rem",
      transition: "color 0.2s, border-color 0.2s",
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLElement).style.color = "#f5f0ea";
      (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,240,234,0.35)";
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLElement).style.color = "rgba(245,240,234,0.5)";
      (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,240,234,0.12)";
    }}
  >
    {dir === "prev" ? "←" : "→"}
  </button>
);

/*import { useEffect, useRef, useState } from "react";
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

        {/* CLOSE BUTTON *
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition" >
          <X size={26} className="text-white" />
        </button>

        {/* IMAGE *
        <img
          src={image}
          alt={title}
          className="max-h-[80vh] w-full object-contain rounded-xl shadow-[0_0_50px_rgba(255,0,200,0.4)]"
        />

        {/* ACTION BUTTONS *
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

        {/* TEXT INFO *
        <div className="text-center text-white mt-4 max-w-lg">
          <h2 className="text-2xl font-bold capitalize">{title} ({category})</h2>
          {description && 
            <p className="text-sm  opacity-50 capitalize">{description}</p>
          }
        </div>
      </div>
    </div>
  );
}*/
