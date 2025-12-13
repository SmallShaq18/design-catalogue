import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function useFavourites() {

  // Load from localStorage or default to []
    const [favourites, setFavourites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever favourites changes
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);


  // Toggle favourite
  const toggleFavourite = (id: string) => {
    setFavourites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
    const message = favourites.includes(id)
      ? "Removed from favourites"
      : "Added to favourites";
    toast.info(message);
  };

  const isFavourite = (id: string) => favourites.includes(id);

  return { favourites, toggleFavourite, isFavourite };
}
