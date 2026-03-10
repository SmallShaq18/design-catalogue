import { Tag } from "../../Components/ui/Tag";
import type { DesignProject } from "../../types/DesignProject";

interface ProjectDetailsProps {
  project: DesignProject;
}

const DetailBlock = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <span
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.55rem",
        letterSpacing: "0.22em",
        textTransform: "uppercase" as const,
        color: "rgba(10,9,8,0.35)",
        display: "block",
        marginBottom: "0.5rem",
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "1.05rem",
        color: "#0a0908",
        letterSpacing: "0.01em",
      }}
    >
      {value}
    </span>
  </div>
);

export const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  const hasDetails = project.client || project.year || project.tools || project.tags;
  if (!hasDetails) return null;

  return (
    <div style={{ marginBottom: "3.5rem" }}>
      {/* Rule */}
      <div style={{ height: 1, background: "rgba(10,9,8,0.1)", marginBottom: "2rem" }} />

      {/* Detail grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "clamp(1.5rem, 4vw, 3rem)",
          marginBottom: project.tags?.length ? "2.5rem" : 0,
        }}
      >
        {project.client && <DetailBlock label="Client" value={project.client} />}
        {project.year && <DetailBlock label="Year" value={project.year} />}
        {project.tools && project.tools.length > 0 && (
          <DetailBlock label="Tools" value={project.tools.join(", ")} />
        )}
        <DetailBlock label="Category" value={<span style={{ textTransform: "capitalize" }}>{project.category}</span>} />
      </div>

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <div>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase" as const,
              color: "rgba(10,9,8,0.35)",
              display: "block",
              marginBottom: "0.75rem",
            }}
          >
            Tags
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} variant="outline" />
            ))}
          </div>
        </div>
      )}

      <div style={{ height: 1, background: "rgba(10,9,8,0.1)", marginTop: "2rem" }} />
    </div>
  );
};