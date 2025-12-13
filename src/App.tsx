import { useState } from "react";
import Header from "./Components/Header";
import FilterBar from "./Components/Filter";
import Gallery from "./Components/Gallery";
import Lightbox from "./Components/LightBox";
import { designs } from "./data/designs";
import type { DesignItem } from "./types";
import { useFavourites } from "./hooks/useFavourite";
import { useDownloaded } from "./hooks/useDownloaded";
import { ToastContainer } from "react-toastify";

export default function App() {
  
  const {  toggleFavourite, isFavourite } = useFavourites();
  const { downloaded, markDownloaded, isDownloaded } = useDownloaded();
  const categories = ["all", "flyer", "poster", "branding", "others", "favourites ❤️"];
  const [active, setActive] = useState("all");
  const [selected, setSelected] = useState<DesignItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = active === "favourites ❤️"
  ? designs.filter((d) => isFavourite(d.id))
  : active === "all"
  ? designs
  : designs.filter((d) => d.category === active);

  return (
    <div className="bg-gradient-to-br from-purple-500 via-purple-400 to-hotOrange">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <FilterBar
          categories={categories}
          active={active}
          onChange={setActive}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Gallery items={filtered} onSelect={setSelected} searchQuery={searchQuery}
        toggleFavourite={toggleFavourite} isFavourite={isFavourite}
        downloaded={downloaded} isDownloaded={isDownloaded} markDownloaded={markDownloaded} />
      </div>

      {selected && (
        <Lightbox
          isFavourite={isFavourite(selected.id)}
          onFavourite={() => toggleFavourite(selected.id)}
          selected={selected}
          image={selected.image}
          title={selected.title}
          description={selected.description}
          category={selected.category}
          onClose={() => setSelected(null)}
          markDownloaded={markDownloaded}
        />
      )}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
}

