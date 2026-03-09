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

/*import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", ...props }, ref) => {
    const baseStyles = "relative font-semibold transition-all duration-300 rounded-xl overflow-hidden group flex items-center justify-center gap-2";
    
    const variantStyles = {
      primary: "bg-gradient-to-r from-hotOrange to-neonPink text-white shadow-elegant hover:shadow-elegant-lg hover:scale-105 active:scale-95",
      secondary: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/30 hover:shadow-elegant active:scale-95",
      outline: "border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 active:scale-95",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {/* Glow effect for primary *
        {variant === "primary" && (
          <div className="absolute inset-0 bg-gradient-to-r from-hotOrange/50 to-neonPink/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        )}

        {/* Shine effect *
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
        </div>

        {/* Content *
        <span className="relative">{props.children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";*/
