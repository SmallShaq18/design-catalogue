import { useState, useEffect, useCallback } from "react";

const LS_DL = "shaq_downloaded";
const EVENT = "shaq:downloads-changed";

const read = (): string[] => {
  try { return JSON.parse(localStorage.getItem(LS_DL) ?? "[]"); }
  catch { return []; }
};

const write = (next: string[]) => {
  localStorage.setItem(LS_DL, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(EVENT));
};

export function useDownloads() {
  const [downloaded, setDownloaded] = useState<string[]>(read);

  useEffect(() => {
    const sync = () => setDownloaded(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const markDownloaded = useCallback((id: string) => {
    const current = read();
    if (current.includes(id)) return;
    const next = [...current, id];
    write(next);
    setDownloaded(next);
  }, []);

  const isDownloaded = useCallback(
    (id: string) => downloaded.includes(id),
    [downloaded]
  );

  return { downloaded, markDownloaded, isDownloaded };
}

export { LS_DL, read as readDownloads, write as writeDownloads };
