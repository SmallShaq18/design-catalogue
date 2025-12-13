import GalleryItem from "./GalleryItem";
import type { DesignItem } from "../types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { designs } from "../data/designs";
import { LayoutGrid, Grid3X3 } from "lucide-react";

interface Props {
  items: DesignItem[];
  searchQuery: string;
  onSelect: (item: DesignItem) => void;
  toggleFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
  downloaded: Record<string, boolean>;
  markDownloaded: (id: string) => void;
  isDownloaded: (id: string) => boolean;
}

export default function Gallery({ items, onSelect, searchQuery, toggleFavourite, isFavourite, markDownloaded, 
  isDownloaded }: Props) {

    const [layout, setLayout] = useState<"masonry" | "grid">("masonry");
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState<"newest" | "oldest" | "az" | "za">("oldest");

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 700); // mock delay
      return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
    const params = new URLSearchParams(location.search);
    const itemId = params.get("item");

    if (itemId) {
      const id = String(itemId);
      const found = designs.find((d) => d.id === id);

      if (found) {
        onSelect(found); // ← Open lightbox
      }
    }
  }, [location.search, designs]);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
  const idA = Number(a.id);
  const idB = Number(b.id);

  switch (sortOption) {
    case "oldest": return idA - idB; // lowest ID first
    case "newest": return idB - idA; // highest ID first
    case "az": return a.title.localeCompare(b.title);
    case "za": return b.title.localeCompare(a.title);
    default: return 0;
  }
});

  return (
  <>
    <p className="relative top-14 sm:top-11 text-center text-lg text-black/80 tracking-wider mt-0
     bg-white/70 sm:max-w-xs backdrop-blur-lg px-4 py-2 rounded-xl">
      <span className="text-2xl font-bold text-purple-600">{filteredItems.length}</span>
      <span className="ml-2">Designs</span>
    </p>


    {/* SORT BAR */}
    <div className="relative bottom-14 sm:top-0 flex justify-center sm:justify-end mb-4">
      <div className="flex items-center justify-end gap-24 bg-white/70 backdrop-blur-lg px-4 py-2 rounded-xl">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as any)}
          className=" px-3 py-2 bg-white text-black border rounded-md text-sm shadow"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="az">A–Z</option>
          <option value="za">Z–A</option>
        </select>
        <ToggleLayout layout={layout} setLayout={setLayout} />
      </div>
    </div>

    {/* CONTENT */}
    <div className={layout === "masonry"
      ? "columns-1 md:columns-2 xl:columns-3 gap-4"
      : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
    }>
      {loading ? (
        /* 🔵 Skeleton blocks */
        [...Array(6)].map((_, i) => (
          <div
            key={i}
            className="mb-4 h-48 w-full bg-gray-300/40 rounded animate-pulse"
          ></div>
        ))
      ) : filteredItems.length === 0 ? (
        <p className="flex items-center justify-center text-neonPink">
          No items here yet
        </p>
      ) : (
        sortedItems.map((item) => (
          <div key={item.id} className="mb-4 break-inside-avoid">
            <GalleryItem
              item={item}
              isFavourite={isFavourite(item.id)}
              onFavourite={() => toggleFavourite(item.id)}
              onClick={() => onSelect(item)}
              markDownloaded={markDownloaded}
              isDownloaded={isDownloaded}
            />
          </div>
        ))
      )}
    </div>
  </>
);
}


interface ToggleLayoutProps {
  layout: "masonry" | "grid";
  setLayout: (layout: "masonry" | "grid") => void;
}

const ToggleLayout = ({layout, setLayout}: ToggleLayoutProps) => {

  return (
    <div className="flex  gap-5">
      <button
        onClick={() => setLayout("masonry")}
        className={`px-3 py-1 rounded ${
          layout === "masonry" ? "bg-neonPink text-white" : "bg-gray-200 text-black"
        }`}
      >
        <LayoutGrid size={20} />
      </button>
      <button
        onClick={() => setLayout("grid")}
        className={`px-3 py-1 rounded ${
          layout === "grid" ? "bg-purple-600 text-white" : "bg-gray-200 text-black"
        }`}
      >
        <Grid3X3 size={20} />
      </button>
</div>
  );
}