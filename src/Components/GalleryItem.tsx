import type { DesignItem } from "../types";
import {Heart, Download} from "lucide-react";
import ShareButton from "./ShareButton";

interface Props {
  item: DesignItem;
  isFavourite: boolean;
  onFavourite: () => void;
  onClick: () => void;
  markDownloaded: (id: string) => void;
  isDownloaded: (id: string) => boolean;
}

export default function GalleryItem({ item, isFavourite, markDownloaded, isDownloaded, onFavourite, onClick }: Props) {

const handleDownload = (item: DesignItem) => {
  markDownloaded(item.id); // update localStorage + state
};

  return (
    <div onClick={onClick} className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-glowPink" >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent 
        opacity-0 group-hover:opacity-100 transition" />


      <div className="absolute flex bottom-4 left-4 text-base font-bold translate-y-4 
      group-hover:translate-y-0 transition uppercase">

        {isDownloaded(item.id) ? (
          <span className="text-green-500 text-xs absolute -bottom-5 bg-black/50 px-2 py-1 rounded-full">
            Downloaded ✓</span>
        ) : (
          <span className="text-gray-400 text-xs absolute -bottom-5 bg-black/50  px-2 py-1 rounded-full">
            Not downloaded</span>
        )}

        <span className="text-xs sm:text-base">{item.title}</span>

        {/* Action buttons */}
        <div className="flex justify-between items-center ml-4">

          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavourite();
            }}
            className="mb-5 ml-12 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow
              hover:scale-110 transition"  >
            <Heart
              size={20}
              className={isFavourite ? "fill-red-500 text-red-500" : "text-black"}
            />
          </button>

          <a
            onClick={(e) => {
              e.stopPropagation();
              handleDownload(item);
            }}
            href={item.image}
            download={`${item.title}.jpg`}
            className="ml-12 mb-5 p-2 mx-5 bg-white/80 rounded-full
            hover:scale-110 transition shadow"
          >
            <Download size={20} className=" text-black" />
          </a>

          <div className="mb-5 p-2 mr-6 bg-white/80 rounded-full
            hover:scale-110 transition shadow text-black">
            <ShareButton item={item} />
          </div>

        </div>
      </div>
    </div>
  );
}
