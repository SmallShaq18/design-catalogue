import { useState, useEffect, useCallback } from "react";

const LS_FAV = "shaq_favourites";
const EVENT  = "shaq:favourites-changed";

// ─── helpers ─────────────────────────────────────────────────────────────────

const read = (): string[] => {
  try { return JSON.parse(localStorage.getItem(LS_FAV) ?? "[]"); }
  catch { return []; }
};

const write = (next: string[]) => {
  localStorage.setItem(LS_FAV, JSON.stringify(next));
  // Notify every component using this hook in the same tab
  window.dispatchEvent(new CustomEvent(EVENT));
};

// ─── hook ─────────────────────────────────────────────────────────────────────

export function useFavourites() {
  const [favourites, setFavourites] = useState<string[]>(read);

  // Sync when another component calls write()
  useEffect(() => {
    const sync = () => setFavourites(read());
    window.addEventListener(EVENT, sync);
    // Also catch changes from other browser tabs
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const current = read();
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    write(next);
    setFavourites(next);
  }, []);

  const isFavourite = useCallback(
    (id: string) => favourites.includes(id),
    [favourites]
  );

  return { favourites, toggle, isFavourite };
}

// ─── also export the key + helpers for components that need raw access ────────
export { LS_FAV, read as readFavourites, write as writeFavourites };


/*import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function useFavourites() {
  const [favourites, setFavourites] = useState<string[]>(() => {
    const saved = localStorage.getItem("projectFavourites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("projectFavourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (id: string) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
    const message = favourites.includes(id)
      ? "Removed from favourites"
      : "Added to favourites";
    toast.info(message);
  };

  const isFavourite = (id: string) => favourites.includes(id);

  return { favourites, toggleFavourite, isFavourite };
}*/
