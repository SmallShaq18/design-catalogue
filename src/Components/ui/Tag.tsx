interface TagProps {
  label: string;
  variant?: "default" | "outline";
  active?: boolean;
  onClick?: () => void;
}

export const Tag = ({ label, variant = "default", active = false, onClick }: TagProps) => {
  return (
    <span
      onClick={onClick}
      style={{
        display: "inline-block",
        padding: "0.3rem 0.75rem",
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.56rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.2s ease",
        ...(active
          ? {
              background: "#0a0908",
              color: "#f5f0ea",
              border: "1px solid #0a0908",
            }
          : variant === "outline"
          ? {
              background: "transparent",
              color: "rgba(10,9,8,0.85)",
              border: "1px solid rgba(10,9,8,0.18)",
            }
          : {
              background: "rgba(10,9,8,0.06)",
              color: "rgba(10,9,8,0.55)",
              border: "1px solid transparent",
            }),
      }}
      onMouseEnter={e => {
        if (!active && onClick) {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(10,9,8,0.35)";
          (e.currentTarget as HTMLElement).style.color = "#0a0908";
        }
      }}
      onMouseLeave={e => {
        if (!active && onClick) {
          (e.currentTarget as HTMLElement).style.borderColor =
            variant === "outline" ? "rgba(10,9,8,0.18)" : "transparent";
          (e.currentTarget as HTMLElement).style.color =
            variant === "outline" ? "rgba(10,9,8,0.45)" : "rgba(10,9,8,0.55)";
        }
      }}
    >
      {label}
    </span>
  );
};