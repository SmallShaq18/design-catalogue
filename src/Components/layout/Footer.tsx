export const Footer = () => {
  const year = new Date().getFullYear();

  const socials = [
    { label: "Instagram", href: "https://www.instagram.com/thesmallshaq" },
    { label: "𝕏", href: "https://x.com/thesmallshaq" },
    {/* label: "LinkedIn", href: "https://www.linkedin.com/in/thesmallshaq" */},
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(10,9,8,0.1)",
        background: "#f5f0ea",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "1.4rem clamp(1.5rem, 4vw, 3rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        {/* Left — copyright */}
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.2em",
            color: "rgba(10,9,8,0.55)",
            textTransform: "uppercase",
          }}
        >
          © {year} SHAQ — All rights reserved
        </span>

        {/* Centre — socials */}
        <div style={{ display: "flex", gap: "1.75rem" }}>
          {socials.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "rgba(10,9,8,0.55)",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#0a0908")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(10,9,8,0.35)")}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right — tagline */}
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.2em",
            color: "rgba(10,9,8,0.55)",
            textTransform: "uppercase",
          }}
        >
          Crafted with intention
        </span>
      </div>
    </footer>
  );
};

/*import { useState } from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const footerLinks = {
    Portfolio: [
      { label: "Projects", href: "#projects" },
      { label: "Categories", href: "#categories" },
      { label: "Favorites", href: "#favorites" },
    ],
    Connect: [
      { label: "Instagram", href: "#instagram" },
      { label: "Dribbble", href: "#dribbble" },
      { label: "LinkedIn", href: "#linkedin" },
    ],
    Info: [
      { label: "Contact", href: "#contact" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
    ],
  };

  return (
    <footer className="mt-24 relative overflow-hidden">
      {/* Premium background *
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none" />

      {/* Border *
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neonPink/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Main content *
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section *
            <div className="space-y-4">
              <div className="inline-block">
                <h3 className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-hotOrange via-neonPink to-electricPurple bg-clip-text text-transparent">
                  Shaq Studio
                </h3>
              </div>

              <p className="text-white/60 text-sm leading-relaxed">
                Visual excellence, delivered with passion and precision.
              </p>

              {/* Social icons - subtle *
              <div className="flex gap-4 mt-6">
                {["Instagram", "Dribbble", "LinkedIn"].map((social) => (
                  <a
                    key={social}
                    href={`#${social.toLowerCase()}`}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-neonPink/30 hover:to-electricPurple/30 border border-white/10 hover:border-white/20 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300"
                    title={social}
                  >
                    <span className="text-xs font-bold">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections *
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section} className="space-y-4">
                <h4 className="text-sm font-semibold text-white tracking-widest uppercase">
                  {section}
                </h4>

                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onMouseEnter={() => setHoveredLink(link.label)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="relative text-white/60 hover:text-white text-sm transition-colors duration-300 group inline-block"
                      >
                        <span className="relative">
                          {link.label}

                          {/* Animated underline *
                          <div
                            className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-neonPink to-electricPurple origin-left transition-all duration-300 ${
                              hoveredLink === link.label ? "scale-x-100" : "scale-x-0"
                            }`}
                          />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider *
          <div className="border-t border-white/10 pt-8 md:pt-12" />
        </div>

        {/* Bottom section *
        <div className="py-8 md:py-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-white/50 text-center md:text-left">
            © {currentYear}{" "}
            <span className="font-semibold text-white/70">Shaq Studio</span>. All
            rights reserved.
          </p>

          <div className="flex items-center gap-2 text-white/50">
            <span>Crafted with love</span>
            <span className="text-neonPink">♥</span>
          </div>
        </div>
      </div>

      {/* Bottom accent line *
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electricPurple/20 to-transparent" />
    </footer>
  );
};
*/