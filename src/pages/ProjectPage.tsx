import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProjectHero } from "../Components/project/ProjectHero";
import { ProjectGallery } from "../Components/project/ProjectGallery";
import { ProjectDetails } from "../Components/project/ProjectDetails";
import { getProjectBySlug, projects } from "../data/projects";

export const ProjectPage = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug || "");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, [slug]);

  if (!project) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f5f0ea",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: "1.5rem",
              color: "rgba(10,9,8,0.4)",
              marginBottom: "1.5rem",
            }}
          >
            Project not found.
          </p>
          <Link
            to="/projects"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: "#0a0908",
              textDecoration: "none",
              borderBottom: "1px solid rgba(10,9,8,0.3)",
              paddingBottom: "2px",
            }}
          >
            ← Back to Work
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f0ea",
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      {/* Back nav */}
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "1%",
        }}
      >
        <Link
          to="/projects"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "rgba(10,9,8,0.8)",
            textDecoration: "none",
            borderBottom: "1px solid rgba(10,9,8)",
            paddingBottom: "2px",
            transition: "color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = "#0a0908";
            el.style.borderBottomColor = "rgba(10,9,8)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = "rgba(10,9,8,0.8)";
            el.style.borderBottomColor = "rgba(10,9,8)";
          }}
        >
          ← Back To Work
        </Link>
      </div>

      {/* Hero — full width */}
      <div style={{ marginTop: "clamp(2rem,4vw,3rem)" }}>
        <ProjectHero project={project} />
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 clamp(1.5rem,4vw,3rem) clamp(4rem,8vw,7rem)",
        }}
      >
        <ProjectDetails project={project} />
        <ProjectGallery project={project} />

        {/* Prev / Next navigation */}
        {(prevProject || nextProject) && (
          <div>
            <div style={{ height: 1, background: "rgba(10,9,8,0.1)", margin: "clamp(3rem,5vw,4rem) 0 clamp(2rem,4vw,3rem)" }} />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(1rem,3vw,2.5rem)",
              }}
            >
              {/* Prev */}
              {prevProject ? (
                <Link
                  to={`/projects/${prevProject.slug}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.55rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase" as const,
                      color: "rgba(10,9,8,0.35)",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    ← Previous
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontStyle: "italic",
                      fontSize: "clamp(1rem, 2vw, 1.3rem)",
                      color: "#0a0908",
                      display: "block",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(10,9,8,0.5)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#0a0908")}
                  >
                    {prevProject.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {/* Next */}
              {nextProject ? (
                <Link
                  to={`/projects/${nextProject.slug}`}
                  style={{ textDecoration: "none", display: "block", textAlign: "right" }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.55rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase" as const,
                      color: "rgba(10,9,8,0.35)",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Next →
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontStyle: "italic",
                      fontSize: "clamp(1rem, 2vw, 1.3rem)",
                      color: "#0a0908",
                      display: "block",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(10,9,8,0.5)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#0a0908")}
                  >
                    {nextProject.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/*import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { ProjectHero } from "../Components/project/ProjectHero";
import { ProjectGallery } from "../Components/project/ProjectGallery";
import { ProjectDetails } from "../Components/project/ProjectDetails";
import { Button } from "../Components/ui/Button";
import { getProjectBySlug, projects } from "../data/projects";

export const ProjectPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug || "");

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-white/60 mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Find prev and next projects
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button *
        <Link to="/projects" className="inline-flex items-center gap-2 text-neonPink hover:text-hotOrange transition mb-8">
          <ChevronLeft size={20} />
          Back to Projects
        </Link>

        {/* Project Content *
        <ProjectHero project={project} />
        <ProjectDetails project={project} />
        <ProjectGallery project={project} />

        {/* Navigation *
        {(prevProject || nextProject) && (
          <div className="mt-20 pt-12 border-t border-white/10 grid grid-cols-2 gap-6">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.slug}`}
                className="group p-6 rounded-xl bg-white/5 hover:bg-white/10 transition"
              >
                <div className="text-white/60 text-sm mb-2">← Previous</div>
                <h3 className="text-white font-bold group-hover:text-hotOrange transition">
                  {prevProject.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group p-6 rounded-xl bg-white/5 hover:bg-white/10 transition text-right"
              >
                <div className="text-white/60 text-sm mb-2">Next →</div>
                <h3 className="text-white font-bold group-hover:text-hotOrange transition">
                  {nextProject.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    </div>
  );
};*/
