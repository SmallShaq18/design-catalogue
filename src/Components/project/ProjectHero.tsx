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

/*import { Badge } from "../ui/Badge";
import type { DesignProject } from "../../types/DesignProject";
import { useState } from "react";

interface ProjectHeroProps {
  project: DesignProject;
}

export const ProjectHero = ({ project }: ProjectHeroProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative w-full h-96 md:h-[550px] overflow-hidden rounded-3xl mb-16 group">
      {/* Background image with reveal effect *
      <div className="relative w-full h-full">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 animate-shimmer z-20" />
        )}

        <img
          src={project.coverImage}
          alt={project.title}
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isImageLoaded ? "animate-image-reveal" : ""
          } group-hover:scale-102 group-hover:brightness-110`}
        />
      </div>

      {/* Premium gradient overlay *
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent" />

      {/* Accent gradient overlay *
      <div className="absolute inset-0 bg-gradient-to-br from-neonPink/5 via-transparent to-electricPurple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content with entrance animations *
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14 lg:p-16">
        {/* Category badge with animation *
        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 origin-left">
          <Badge text={project.category} variant="primary" />
        </div>

        {/* Title with premium typography *
        <h1 className="h2-display text-white mb-4 max-w-4xl animate-slide-up">
          {project.title}
        </h1>

        {/* Description with sophisticated styling *
        {project.description && (
          <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed animate-slide-up"
            style={{ animationDelay: '0.1s' }}>
            {project.description}
          </p>
        )}

        {/* Decorative line *
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neonPink via-electricPurple to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Subtle corner accent *
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-neonPink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-bl-full" />
    </div>
  );
};*/
