// ─── Legacy Header (DesignItem app) ───────────────────────────────────────────
export function LegacyHeader() {
  return (
    <header
      style={{
        borderBottom: "1px solid rgba(10,9,8,0.1)",
        background: "#f5f0ea",
        padding: "0 clamp(1.5rem, 4vw, 3rem)",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
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

      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.58rem",
          letterSpacing: "0.2em",
          color: "rgba(10,9,8,0.35)",
          textTransform: "uppercase" as const,
        }}
      >
        Design Catalogue
      </span>
    </header>
  );
}

export default LegacyHeader;
