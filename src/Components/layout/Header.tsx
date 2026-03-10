import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useFavourites } from "../../hooks/useFavourite";

const MOBILE_BP = 640;

function useWindowWidth() {
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
}

const navItems = [
  { label: "Work",       path: "/projects"   },
  { label: "Categories", path: "/categories" },
];

export const Header = () => {
  const location               = useLocation();
  const { favourites }         = useFavourites();
  const favCount               = favourites.length;
  const [menuOpen, setMenuOpen] = useState(false);
  const width                  = useWindowWidth();
  const isMobile               = width <= MOBILE_BP;

  // Close drawer when route changes
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Close drawer when resizing to desktop
  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  return (
    <>
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "#f5f0ea", borderBottom: "1px solid rgba(10,9,8,0.1)",
      }}>
        <div style={{
          maxWidth: 1440, margin: "0 auto",
          padding: "0 clamp(1.25rem, 4vw, 3rem)", height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Wordmark */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700,
              fontSize: "1.35rem", letterSpacing: "-0.02em", color: "#0a0908", lineHeight: 1,
            }}>
              SHAQ
            </span>
          </Link>

          {/* ── Desktop nav ─────────────────────────────────────── */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "clamp(1rem, 3vw, 2.5rem)" }}>
              {navItems.map((item) => (
                <NavLink key={item.path} item={item} active={isActive(item.path)} />
              ))}
              <FavLink path="/favourites" active={isActive("/favourites")} count={favCount} />
              <ContactBtn />
            </div>
          )}

          {/* ── Mobile: heart + hamburger ────────────────────────── */}
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "1.1rem" }}>
              <FavLink path="/favourites" active={isActive("/favourites")} count={favCount} />
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "#0a0908", padding: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ── Mobile drawer ─────────────────────────────────────────── */}
      {isMobile && (
        <>
          <div style={{
            position: "fixed", top: 64, left: 0, right: 0, zIndex: 49,
            background: "#f5f0ea", borderBottom: "1px solid rgba(10,9,8,0.1)",
            transform: menuOpen ? "translateY(0)" : "translateY(-110%)",
            transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
            padding: "1.25rem clamp(1.25rem,4vw,3rem) 1.75rem",
            pointerEvents: menuOpen ? "all" : "none",
          }}>
            <nav style={{ display: "flex", flexDirection: "column" }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "0.7rem",
                    letterSpacing: "0.2em", textTransform: "uppercase" as const,
                    textDecoration: "none", padding: "0.9rem 0",
                    color: isActive(item.path) ? "#0a0908" : "rgba(10,9,8,0.45)",
                    borderBottom: "1px solid rgba(10,9,8,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <span style={{ fontSize: "0.48rem", letterSpacing: "0.1em", color: "rgba(10,9,8,0.3)" }}>
                      Current
                    </span>
                  )}
                </Link>
              ))}
              <div style={{ marginTop: "1.25rem" }}>
                <ContactBtn fullWidth />
              </div>
            </nav>
          </div>

          {/* Backdrop */}
          {menuOpen && (
            <div
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed", inset: 0, top: 64, zIndex: 48,
                background: "rgba(10,9,8,0.15)",
              }}
            />
          )}
        </>
      )}
    </>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const NavLink = ({ item, active }: { item: { label: string; path: string }; active: boolean }) => (
  <Link to={item.path} style={{
    fontFamily: "'DM Mono', monospace", fontSize: "0.6rem",
    letterSpacing: "0.2em", textTransform: "uppercase" as const,
    textDecoration: "none", whiteSpace: "nowrap" as const,
    color: active ? "#0a0908" : "rgba(10,9,8,0.4)",
    borderBottom: active ? "1px solid rgba(10,9,8,0.5)" : "1px solid transparent",
    paddingBottom: "2px", transition: "color 0.2s, border-color 0.2s",
  }}
    onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "#0a0908"; }}
    onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(10,9,8,0.4)"; }}
  >
    {item.label}
  </Link>
);

const FavLink = ({ path, active, count, onClick }: {
  path: string; active: boolean; count: number; onClick?: () => void;
}) => (
  <Link to={path} onClick={onClick} title="Favourites" style={{
    position: "relative", display: "flex", alignItems: "center",
    textDecoration: "none", color: active ? "#0a0908" : "rgba(10,9,8,0.4)",
    transition: "color 0.2s",
  }}
    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#0a0908")}
    onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(10,9,8,0.4)"; }}
  >
    <Heart size={15} />
    {count > 0 && (
      <span style={{
        position: "absolute", top: -5, right: -7,
        fontFamily: "'DM Mono', monospace", fontSize: "0.42rem", lineHeight: 1,
        background: "#0a0908", color: "#f5f0ea", padding: "1px 3px",
        minWidth: 13, textAlign: "center" as const,
      }}>
        {count}
      </span>
    )}
  </Link>
);

const ContactBtn = ({ fullWidth }: { fullWidth?: boolean }) => (
  <a href="mailto:shaqstudios@gmail.com" style={{
    fontFamily: "'DM Mono', monospace", fontSize: "0.6rem",
    letterSpacing: "0.18em", textTransform: "uppercase" as const,
    textDecoration: "none", color: "#f5f0ea", background: "#0a0908",
    padding: "0.55rem 1rem", transition: "opacity 0.2s",
    whiteSpace: "nowrap" as const,
    display: fullWidth ? "block" : "inline-block",
    textAlign: fullWidth ? "center" as const : "left" as const,
  }}
    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
  >
    Contact
  </a>
);