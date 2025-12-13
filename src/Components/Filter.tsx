import { Search } from "lucide-react";

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
    {/* Search Bar */}
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
}
