import { useState } from "react";
import { ImageLightbox } from "../../Components/gallery/ImageLightbox";
import type { DesignProject } from "../../types/DesignProject";

interface ProjectGalleryProps {
  project: DesignProject;
}

export const ProjectGallery = ({ project }: ProjectGalleryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  if (project.gallery.length === 0) return null;

  const cols =
    project.gallery.length === 1 ? 1 :
    project.gallery.length === 2 ? 2 : 3;

  return (
    <>
      <div style={{ marginBottom: "3.5rem" }}>
        {/* Section header */}
        <div style={{ height: 1, background: "rgba(10,9,8,0.1)", marginBottom: "1.75rem" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.75rem" }}>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase" as const,
              color: "rgba(10,9,8,0.35)",
            }}
          >
            Gallery
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.15em",
              color: "rgba(10,9,8,0.3)",
            }}
          >
            {String(project.gallery.length).padStart(2, "0")} Images
          </span>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: "clamp(0.75rem, 1.5vw, 1.25rem)",
          }}
        >
          {project.gallery.map((image, index) => (
            <GalleryThumb
              key={index}
              src={image}
              index={index}
              total={project.gallery.length}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      </div>

      <ImageLightbox
        images={project.gallery}
        initialIndex={selectedIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
};

/* ─── Single thumbnail ─── */
const GalleryThumb = ({
  src, index, total, onClick,
}: {
  src: string; index: number; total: number; onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  // Give the first image extra row height when total > 3
  const tall = total > 3 && index === 0;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: tall ? "4/5" : "1/1",
        gridRow: tall ? "span 2" : "span 1",
        background: "rgba(10,9,8,0.05)",
      }}
    >
      <img
        src={src}
        alt={`Gallery ${index + 1}`}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          filter: hovered ? "brightness(0.75)" : "brightness(1)",
          transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.45s ease",
        }}
      />
      {/* Expand hint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "#f5f0ea",
            borderBottom: "1px solid rgba(245,240,234,0.4)",
            paddingBottom: "2px",
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "transform 0.35s ease",
            display: "inline-block",
          }}
        >
          Open →
        </span>
      </div>

      {/* Index pip */}
      <div
        style={{
          position: "absolute",
          top: "0.75rem",
          left: "0.75rem",
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.5rem",
          letterSpacing: "0.1em",
          color: "rgba(245,240,234,0.5)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
};

/*import { useState } from "react";
import { ImageLightbox } from "../../Components/gallery/ImageLightbox";
import type { DesignProject } from "../../types/DesignProject";

interface ProjectGalleryProps {
  project: DesignProject;
}

export const ProjectGallery = ({ project }: ProjectGalleryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  if (project.gallery.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">Project Gallery</h2>

        {/* Gallery Grid *
        <div
          className={`grid gap-4 ${
            project.gallery.length === 1
              ? "grid-cols-1"
              : project.gallery.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {project.gallery.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl cursor-pointer h-80"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Hover overlay *
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox *
      <ImageLightbox
        images={project.gallery}
        initialIndex={selectedIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
};*/
