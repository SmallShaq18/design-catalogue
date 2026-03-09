import { Link, useLocation } from "react-router-dom";
import { Heart } from "lucide-react";
//import { useState, useEffect } from "react";
import { useFavourites } from "../../hooks/useFavourite";

const navItems = [
  { label: "Work",       path: "/projects"   },
  { label: "Categories", path: "/categories" },
];

export const Header = () => {
  const location = useLocation();
  const { favourites } = useFavourites();
  const favCount = favourites.length;

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "#f5f0ea",
      borderBottom: "1px solid rgba(10,9,8,0.1)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto",
        padding: "0 clamp(1.5rem, 4vw, 3rem)", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Wordmark */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700,
            fontSize: "1.35rem", letterSpacing: "-0.02em", color: "#0a0908", lineHeight: 1 }}>
            SHAQ
          </span>
        </Link>

        {/* Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(0.5rem, 4vw, 3rem)" }}>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} style={{ fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase" as const,
                textDecoration: "none", color: active ? "#0a0908" : "rgba(10,9,8,0.4)",
                borderBottom: active ? "1px solid rgba(10,9,8,0.5)" : "1px solid transparent",
                paddingBottom: "2px", transition: "color 0.2s ease, border-color 0.2s ease" }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "#0a0908"; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(10,9,8,0.4)"; }}>
                {item.label}
              </Link>
            );
          })}

          {/* Favourites heart icon with live count */}
          <Link to="/favourites" title="Favourites"
            style={{ position: "relative", display: "flex", alignItems: "center",
              textDecoration: "none", transition: "color 0.2s ease",
              color: location.pathname === "/favourites" ? "#0a0908" : "rgba(10,9,8,0.4)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#0a0908")}
            onMouseLeave={(e) => {
              if (location.pathname !== "/favourites")
                (e.currentTarget as HTMLElement).style.color = "rgba(10,9,8,0.4)";
            }}>
            <Heart size={15} />
            {favCount > 0 && (
              <span style={{ position: "absolute", top: -5, right: -7,
                fontFamily: "'DM Mono', monospace", fontSize: "0.42rem", lineHeight: 1,
                background: "#0a0908", color: "#f5f0ea", padding: "1px 3px",
                minWidth: 13, textAlign: "center" as const }}>
                {favCount}
              </span>
            )}
          </Link>

          {/* Contact */}
          <a href="mailto:hello@shaq.studio" style={{ fontFamily: "'DM Mono', monospace",
            fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase" as const,
            textDecoration: "none", color: "#f5f0ea", background: "#0a0908",
            padding: "0.55rem 1.1rem", transition: "opacity 0.2s ease" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}>
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

/*import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { LS_FAV, readLS } from "../gallery/GalleryGrid";

const navItems = [
  { label: "Work", path: "/projects" },
  { label: "Categories", path: "/categories" },
];

export const Header = () => {
  const [favCount, setFavCount] = useState(0);
  useEffect(() => {
    const update = () => setFavCount(readLS(LS_FAV).length);
    update();
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);
  const location = useLocation();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#f5f0ea",
        borderBottom: "1px solid rgba(10,9,8,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 4vw, 3rem)",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Wordmark *
        <Link
          to="/"
          style={{ textDecoration: "none" }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: "1.35rem",
              letterSpacing: "-0.02em",
              color: "#0a0908",
              lineHeight: 1,
            }}
          >
            SHAQ
          </span>
        </Link>

        {/* Nav + CTA *
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(1.0rem, 3vw, 2rem)" }}>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: active ? "#0a0908" : "rgba(10,9,8,0.7)",
                  borderBottom: active ? "1px solid rgba(10,9,8,0.5)" : "1px solid transparent",
                  paddingBottom: "2px",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = "#0a0908";
                }}
                onMouseLeave={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(10,9,8,0.7)";
                }}
              >
                {item.label}
              </Link>
            );
          })}


          {/* Favourites icon *
          <Link
            to="/favourites"
            title="Favourites"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: location.pathname === "/favourites" ? "#0a0908" : "rgba(10,9,8,0.4)",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#0a0908")}
            onMouseLeave={e => {
              if (location.pathname !== "/favourites")
                (e.currentTarget as HTMLElement).style.color = "rgba(10,9,8,0.4)";
            }}
          >
            <Heart size={15} />
            {favCount > 0 && (
              <span style={{
                position: "absolute",
                top: -5, right: -6,
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.42rem",
                lineHeight: 1,
                background: "#0a0908",
                color: "#f5f0ea",
                padding: "1px 3px",
                minWidth: 13,
                textAlign: "center",
              }}>{favCount}</span>
            )}
          </Link>
          <a
            href="https://x.com/thesmallshaq___"
            target="_blank"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#f5f0ea",
              background: "#0a0908",
              padding: "0.55rem 1.1rem",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};*/