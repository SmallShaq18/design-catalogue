import React from "react";

interface BadgeProps {
  text: string;
  variant?: "primary" | "secondary" | "success";
}

export const Badge = ({ text, variant = "primary" }: BadgeProps) => {
  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: "#0a0908",
      color: "#f5f0ea",
    },
    secondary: {
      background: "rgba(10,9,8,0.08)",
      color: "rgba(10,9,8,0.65)",
    },
    success: {
      background: "rgba(34,197,94,0.1)",
      color: "rgba(22,163,74,1)",
    },
  };

  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.28rem 0.7rem",
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.55rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        lineHeight: 1,
        ...styles[variant],
      }}
    >
      {text}
    </span>
  );
};