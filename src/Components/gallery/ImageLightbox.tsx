import { useEffect, useRef, useState, useCallback } from "react";
import { Heart, Download, Loader } from "lucide-react";
import { toast } from "react-toastify";
import { useFavourites } from "../../hooks/useFavourite";
import { useDownloads } from "../../hooks/useDownloaded";
import { downloadImage } from "../../utils/donwload";

interface Props {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageLightbox = ({ images, initialIndex = 0, isOpen, onClose }: Props) => {
  const [index, setIndex]           = useState(initialIndex);
  const [visible, setVisible]       = useState(false);
  const [imgLoaded, setImgLoaded]   = useState(false);
  const [downloading, setDownloading] = useState(false);
  const touchStart = useRef<number | null>(null);

  // Hooks — each call re-renders instantly when any component toggles
  const { isFavourite, toggle: toggleFav } = useFavourites();
  const { isDownloaded, markDownloaded }   = useDownloads();

  const currentImg = images[index];
  const isFav = isFavourite(currentImg);
  const isDl  = isDownloaded(currentImg);

  useEffect(() => {
    if (isOpen) {
      setIndex(initialIndex);
      setImgLoaded(false);
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
  }, [isOpen, initialIndex]);

  useEffect(() => { setImgLoaded(false); }, [index]);

  const prev = useCallback(() => setIndex((i) => (i > 0 ? i - 1 : images.length - 1)), [images.length]);
  const next = useCallback(() => setIndex((i) => (i < images.length - 1 ? i + 1 : 0)), [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [isOpen, prev, next, onClose]);

  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
    touchStart.current = null;
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (downloading) return;
    const filename = currentImg.split("/").pop() ?? "image.jpg";
    await downloadImage(
      currentImg, filename,
      () => setDownloading(true),
      () => { setDownloading(false); markDownloaded(currentImg); },
      () => { setDownloading(false); toast.error("Download failed — try again."); }
    );
  };

  if (!isOpen) return null;

  const counter = `${String(index + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;

  return (
    <div onClick={onClose} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(8,8,10,0.97)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "clamp(1rem,3vw,2rem)", opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}>

      {/* Top bar */}
      <div onClick={(e) => e.stopPropagation()} style={{ position: "fixed", top: 0, left: 0, right: 0,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "clamp(0.75rem,2vw,1.25rem) clamp(1rem,3vw,2rem)",
        borderBottom: "1px solid rgba(245,240,234,0.07)" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem",
          letterSpacing: "0.18em", color: "rgba(245,240,234,0.35)" }}>{counter}</span>

        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
          {/* Heart */}
          <LbBtn
            onClick={(e) => { e.stopPropagation(); toggleFav(currentImg); }}
            title={isFav ? "Remove from favourites" : "Save to favourites"}
          >
            <Heart size={14} style={{ fill: isFav ? "#ef4444" : "none",
              color: isFav ? "#ef4444" : "rgba(245,240,234,0.7)", transition: "fill 0.2s, color 0.2s" }} />
          </LbBtn>

          {/* Download */}
          <LbBtn onClick={handleDownload} title="Download image">
            {downloading
              ? <Loader size={14} color="rgba(245,240,234,0.7)" style={{ animation: "spin 0.8s linear infinite" }} />
              : <Download size={14} color={isDl ? "#f5f0ea" : "rgba(245,240,234,0.7)"} />}
          </LbBtn>

          {/* Close */}
          <LbBtn onClick={(e) => { e.stopPropagation(); onClose(); }} title="Close">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem",
              color: "rgba(245,240,234,0.6)", lineHeight: 1 }}>✕</span>
          </LbBtn>
        </div>
      </div>

      {/* Image */}
      <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", alignItems: "center",
        justifyContent: "center", width: "100%", flex: 1 }}>
        <img key={index} src={currentImg} alt={`Image ${index + 1}`}
          onLoad={() => setImgLoaded(true)}
          style={{ maxHeight: "78vh", maxWidth: "100%", objectFit: "contain", display: "block",
            opacity: imgLoaded ? 1 : 0, transition: "opacity 0.25s ease",
            animation: "lb-in 0.35s cubic-bezier(0.16,1,0.3,1) both" }} />
      </div>

      {/* Bottom bar */}
      <div onClick={(e) => e.stopPropagation()} style={{ position: "fixed", bottom: 0, left: 0, right: 0,
        borderTop: "1px solid rgba(245,240,234,0.07)",
        padding: "clamp(0.6rem,1.5vw,1rem) clamp(1rem,3vw,2rem)",
        display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem",
          letterSpacing: "0.14em", color: "rgba(245,240,234,0.25)", textTransform: "uppercase" as const }}>
          {isDl ? "✓ Downloaded" : ""}
        </span>
        {images.length > 1 && (
          <div style={{ display: "flex", gap: "0.3rem" }}>
            {images.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} style={{ width: i === index ? 16 : 5,
                height: 5, background: i === index ? "rgba(245,240,234,0.7)" : "rgba(245,240,234,0.2)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "width 0.25s ease, background 0.25s ease" }} />
            ))}
          </div>
        )}
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem",
          letterSpacing: "0.14em", color: "rgba(245,240,234,0.25)" }}>
          {images.length > 1 ? "← →" : ""}
        </span>
      </div>

      {images.length > 1 && (
        <>
          <NavArrow dir="prev" onClick={(e) => { e.stopPropagation(); prev(); }} />
          <NavArrow dir="next" onClick={(e) => { e.stopPropagation(); next(); }} />
        </>
      )}

      <style>{`
        @keyframes lb-in { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }
        @keyframes spin   { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

const LbBtn = ({ onClick, title, children }: {
  onClick: (e: React.MouseEvent) => void; title?: string; children: React.ReactNode;
}) => (
  <button onClick={onClick} title={title} style={{ width: 36, height: 36, display: "flex",
    alignItems: "center", justifyContent: "center", background: "none",
    border: "1px solid rgba(245,240,234,0.15)", cursor: "pointer", padding: 0, transition: "background 0.2s" }}
    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(245,240,234,0.08)")}
    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "none")}>
    {children}
  </button>
);

const NavArrow = ({ dir, onClick }: { dir: "prev" | "next"; onClick: (e: React.MouseEvent) => void }) => (
  <button onClick={onClick} aria-label={dir} style={{ position: "fixed",
    [dir === "prev" ? "left" : "right"]: "clamp(0.75rem,2vw,1.5rem)",
    top: "50%", transform: "translateY(-50%)", width: 42, height: 42,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "none", border: "1px solid rgba(245,240,234,0.12)",
    color: "rgba(245,240,234,0.45)", cursor: "pointer",
    fontFamily: "'DM Mono', monospace", fontSize: "1rem",
    transition: "color 0.2s, border-color 0.2s, background 0.2s" }}
    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement;
      el.style.color = "#f5f0ea"; el.style.borderColor = "rgba(245,240,234,0.35)";
      el.style.background = "rgba(245,240,234,0.06)"; }}
    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement;
      el.style.color = "rgba(245,240,234,0.45)"; el.style.borderColor = "rgba(245,240,234,0.12)";
      el.style.background = "none"; }}>
    {dir === "prev" ? "←" : "→"}
  </button>
);

/*import { useEffect, useRef, useState, useCallback } from "react";
import { Heart, Download, Loader } from "lucide-react";
import { toast } from "react-toastify";
import { LS_FAV, LS_DL, readLS, writeLS } from "./GalleryGrid";
import { downloadImage } from "../../utils/donwload";

interface Props {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
}

export const ImageLightbox = ({ images, initialIndex = 0, isOpen, onClose }: Props) => {
  const [index, setIndex]           = useState(initialIndex);
  const [visible, setVisible]       = useState(false);
  const [imgLoaded, setImgLoaded]   = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [favourites, setFavourites] = useState<string[]>(() => readLS(LS_FAV));
  const [downloaded, setDownloaded] = useState<string[]>(() => readLS(LS_DL));
  const touchStart = useRef<number | null>(null);

  const currentImg = images[index];
  const isFav = favourites.includes(currentImg);
  const isDl  = downloaded.includes(currentImg);

  useEffect(() => {
    if (isOpen) {
      setIndex(initialIndex);
      setImgLoaded(false);
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
  }, [isOpen, initialIndex]);

  useEffect(() => { setImgLoaded(false); }, [index]);

  const prev = useCallback(() => setIndex((i) => (i > 0 ? i - 1 : images.length - 1)), [images.length]);
  const next = useCallback(() => setIndex((i) => (i < images.length - 1 ? i + 1 : 0)), [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   prev();
      if (e.key === "ArrowRight")  next();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [isOpen, prev, next, onClose]);

  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
    touchStart.current = null;
  };

  const toggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavourites((prev) => {
      const next = prev.includes(currentImg) ? prev.filter((x) => x !== currentImg) : [...prev, currentImg];
      writeLS(LS_FAV, next);
      return next;
    });
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (downloading) return;

    const filename = currentImg.split("/").pop() ?? "image.jpg";

    await downloadImage(
      currentImg,
      filename,
      () => setDownloading(true),
      () => {
        setDownloading(false);
        setDownloaded((prev) => {
          if (prev.includes(currentImg)) return prev;
          const next = [...prev, currentImg];
          writeLS(LS_DL, next);
          return next;
        });
      },
      () => {
        setDownloading(false);
        toast.error("Download failed — try again.");
      }
    );
  };

  if (!isOpen) return null;

  const counter = `${String(index + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;

  return (
    <div
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(8,8,10,0.97)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "clamp(1rem,3vw,2rem)",
        opacity: visible ? 1 : 0, transition: "opacity 0.3s ease",
      }}
    >
      {/* Top bar *
      <div onClick={(e) => e.stopPropagation()} style={{
        position: "fixed", top: 0, left: 0, right: 0,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "clamp(0.75rem,2vw,1.25rem) clamp(1rem,3vw,2rem)",
        borderBottom: "1px solid rgba(245,240,234,0.07)",
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem",
          letterSpacing: "0.18em", color: "rgba(245,240,234,0.35)" }}>
          {counter}
        </span>

        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
          {/* Heart *
          <LbBtn onClick={toggleFav} title={isFav ? "Remove from favourites" : "Save to favourites"}>
            <Heart size={14} style={{ fill: isFav ? "#ef4444" : "none", color: isFav ? "#ef4444" : "rgba(245,240,234,0.7)" }} />
          </LbBtn>

          {/* Download — blob fetch *
          <LbBtn onClick={handleDownload} title="Download image">
            {downloading
              ? <Loader size={14} color="rgba(245,240,234,0.7)" style={{ animation: "spin 0.8s linear infinite" }} />
              : <Download size={14} color={isDl ? "#f5f0ea" : "rgba(245,240,234,0.7)"} />
            }
          </LbBtn>

          {/* Close *
          <LbBtn onClick={(e) => { e.stopPropagation(); onClose(); }} title="Close">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem",
              color: "rgba(245,240,234,0.6)", lineHeight: 1 }}>✕</span>
          </LbBtn>
        </div>
      </div>

      {/* Image *
      <div onClick={(e) => e.stopPropagation()} style={{
        display: "flex", alignItems: "center", justifyContent: "center", width: "100%", flex: 1,
      }}>
        <img
          key={index}
          src={currentImg}
          alt={`Image ${index + 1}`}
          onLoad={() => setImgLoaded(true)}
          style={{
            maxHeight: "78vh", maxWidth: "100%", objectFit: "contain", display: "block",
            opacity: imgLoaded ? 1 : 0, transition: "opacity 0.25s ease",
            animation: "lb-in 0.35s cubic-bezier(0.16,1,0.3,1) both",
          }}
        />
      </div>

      {/* Bottom bar *
      <div onClick={(e) => e.stopPropagation()} style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        borderTop: "1px solid rgba(245,240,234,0.07)",
        padding: "clamp(0.6rem,1.5vw,1rem) clamp(1rem,3vw,2rem)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem",
          letterSpacing: "0.14em", color: "rgba(245,240,234,0.95)", textTransform: "uppercase" as const }}>
          {isDl ? "✓ Downloaded" : ""}
        </span>

        {images.length > 1 && (
          <div style={{ display: "flex", gap: "0.3rem" }}>
            {images.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} style={{
                width: i === index ? 16 : 5, height: 5,
                background: i === index ? "rgba(245,240,234,0.7)" : "rgba(245,240,234,0.2)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "width 0.25s ease, background 0.25s ease",
              }} />
            ))}
          </div>
        )}

        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem",
          letterSpacing: "0.14em", color: "rgba(245,240,234,0.25)" }}>
          {images.length > 1 ? "← →" : ""}
        </span>
      </div>

      {/* Prev / Next *
      {images.length > 1 && (
        <>
          <NavArrow dir="prev" onClick={(e) => { e.stopPropagation(); prev(); }} />
          <NavArrow dir="next" onClick={(e) => { e.stopPropagation(); next(); }} />
        </>
      )}

      <style>{`
        @keyframes lb-in { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }
        @keyframes spin   { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const LbBtn = ({ onClick, title, children }: {
  onClick: (e: React.MouseEvent) => void;
  title?: string;
  children: React.ReactNode;
}) => (
  <button onClick={onClick} title={title} style={{
    width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
    background: "none", border: "1px solid rgba(245,240,234,0.15)", cursor: "pointer", padding: 0,
    transition: "background 0.2s",
  }}
    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(245,240,234,0.08)")}
    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "none")}
  >
    {children}
  </button>
);

const NavArrow = ({ dir, onClick }: { dir: "prev" | "next"; onClick: (e: React.MouseEvent) => void }) => (
  <button onClick={onClick} aria-label={dir} style={{
    position: "fixed",
    [dir === "prev" ? "left" : "right"]: "clamp(0.75rem,2vw,1.5rem)",
    top: "50%", transform: "translateY(-50%)",
    width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center",
    background: "none", border: "1px solid rgba(245,240,234,0.12)",
    color: "rgba(245,240,234,0.45)", cursor: "pointer",
    fontFamily: "'DM Mono', monospace", fontSize: "1rem",
    transition: "color 0.2s, border-color 0.2s, background 0.2s",
  }}
    onMouseEnter={(e) => {
      const el = e.currentTarget as HTMLElement;
      el.style.color = "#f5f0ea";
      el.style.borderColor = "rgba(245,240,234,0.35)";
      el.style.background = "rgba(245,240,234,0.06)";
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget as HTMLElement;
      el.style.color = "rgba(245,240,234,0.45)";
      el.style.borderColor = "rgba(245,240,234,0.12)";
      el.style.background = "none";
    }}
  >
    {dir === "prev" ? "←" : "→"}
  </button>
);*/