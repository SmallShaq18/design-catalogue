import { useState, useEffect } from "react";

export function useDownloaded() {

    const [downloaded, setDownloaded] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("downloaded");
        return saved ? JSON.parse(saved) : {};
    });

  useEffect(() => {
    localStorage.setItem("downloaded", JSON.stringify(downloaded));
  }, [downloaded]);

  const markDownloaded = (id: string) => {
    setDownloaded(prev => ({ ...prev, [id]: true }));
  };

  const isDownloaded = (id: string) => !!downloaded[id];

  return { downloaded, markDownloaded, isDownloaded };
}
