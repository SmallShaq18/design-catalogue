import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", style, children, ...props }, ref) => {
    const base: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      fontFamily: "'DM Mono', monospace",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      cursor: "pointer",
      border: "none",
      transition: "opacity 0.2s ease, background 0.2s ease",
      lineHeight: 1,
    };

    const variants: Record<string, React.CSSProperties> = {
      primary: {
        background: "#0a0908",
        color: "#f5f0ea",
      },
      secondary: {
        background: "transparent",
        color: "#0a0908",
        border: "1px solid rgba(10,9,8,0.2)",
      },
      outline: {
        background: "transparent",
        color: "#0a0908",
        border: "1px solid rgba(10,9,8,0.35)",
      },
    };

    const sizes: Record<string, React.CSSProperties> = {
      sm: { fontSize: "0.58rem", padding: "0.55rem 1rem" },
      md: { fontSize: "0.62rem", padding: "0.75rem 1.4rem" },
      lg: { fontSize: "0.68rem", padding: "0.95rem 1.8rem" },
    };

    return (
      <button
        ref={ref}
        style={{ ...base, ...variants[variant], ...sizes[size], ...style }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.72")}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
