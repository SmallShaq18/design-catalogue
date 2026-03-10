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
