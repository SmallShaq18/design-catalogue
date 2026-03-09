import { useRef } from "react";

interface Props {
  categories: string[];
  active: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onChange: (cat: string) => void;
}

export default function Filter({ categories, active, searchQuery, setSearchQuery, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
      {/* Search */}
      <div
        style={{
          position: "relative",
          marginBottom: "1.75rem",
          maxWidth: 480,
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search projects…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.08em",
            color: "#0a0908",
            background: "transparent",
            border: "none",
            borderBottom: "1px solid rgba(10,9,8,0.2)",
            padding: "0.7rem 2.5rem 0.7rem 0",
            outline: "none",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => ((e.target as HTMLInputElement).style.borderBottomColor = "rgba(10,9,8,0.6)")}
          onBlur={(e) => ((e.target as HTMLInputElement).style.borderBottomColor = "rgba(10,9,8,0.2)")}
        />
        {/* Search icon */}
        <svg
          onClick={() => inputRef.current?.focus()}
          width="14" height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(10,9,8,0.35)"
          strokeWidth="1.5"
          style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", cursor: "text" }}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      {/* Category pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          overflowX: "auto",
          paddingBottom: "0.25rem",
        }}
      >
        {categories.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.56rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                padding: "0.35rem 0.85rem",
                background: isActive ? "#0a0908" : "transparent",
                color: isActive ? "#f5f0ea" : "rgba(10,9,8,0.45)",
                border: `1px solid ${isActive ? "#0a0908" : "rgba(10,9,8,0.18)"}`,
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap" as const,
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.color = "#0a0908";
                  el.style.borderColor = "rgba(10,9,8,0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.color = "rgba(10,9,8,0.45)";
                  el.style.borderColor = "rgba(10,9,8,0.18)";
                }
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/*import { Search } from "lucide-react";

interface Props {
  categories: string[];
  active: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onChange: (cat: string) => void;
}

export default function Filter({ categories, active, searchQuery, setSearchQuery, onChange }: Props) {

  return (
    <>
    {/* Search Bar *
          <div className="relative">
            <Search className="absolute right-4 md:right-14 lg:right-40 xl:right-48 z-40 top-1/2 transform -translate-y-1/2 text-slate-600" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-3xl flex justify-center mx-auto px-4 py-3 rounded-2xl bg-white/45 backdrop-blur-lg border border-white/40 shadow-lg placeholder-black/60 text-black"
            />
          </div>
          


    <div className="w-full overflow-x-auto">
      <div className="flex gap-3 mb-10 mt-7 px-4 sm:justify-center sm:flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`px-5 py-2 shrink-0 rounded-full whitespace-nowrap text-sm font-semibold transition 
            bg-white/70 text-black
            hover:shadow-glowPink ${
              active === cat
                ? "bg-gradient-to-r from-hotOrange to-neonPink opacity-100 text-white"
                : "opacity-70 hover:opacity-90"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>
</div>

    </>
  );
}*/
