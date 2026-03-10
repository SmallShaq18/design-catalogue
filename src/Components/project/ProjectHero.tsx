import type { DesignProject } from "../../types/DesignProject";
import { useState } from "react";

interface ProjectHeroProps {
  project: DesignProject;
}

export const ProjectHero = ({ project }: ProjectHeroProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
      {/* Full-bleed image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          aspectRatio: "16/7",
          background: "rgba(10,9,8,0.06)",
          marginBottom: "clamp(2rem, 4vw, 3rem)",
        }}
      >
        <img
          src={project.coverImage}
          alt={project.title}
          onLoad={() => setLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />
      </div>

      {/* Title block */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 3rem)" }}>
        {/* Meta row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.25rem",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase" as const,
              color: "rgba(10,9,8,0.4)",
            }}
          >
            {project.category}
          </span>
          {project.year && (
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                color: "rgba(10,9,8,0.3)",
              }}
            >
              {project.year}
            </span>
          )}
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "#0a0908",
            margin: "0 0 clamp(1rem, 2vw, 1.5rem)",
          }}
        >
          {project.title}
        </h1>

        {/* Description */}
        {project.description && (
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
              lineHeight: 1.6,
              color: "rgba(10,9,8,0.75)",
              maxWidth: "65ch",
              margin: 0,
            }}
          >
            {project.description}
          </p>
        )}
      </div>
    </div>
  );
};