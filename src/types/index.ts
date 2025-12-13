export interface DesignItem {
  id: string;
  title: string;
  category: "flyer" | "poster" | "branding" | "others" | "favourites";
  image: string;
  description?: string;
  tags?: string[];
  isFavourite: boolean;
}
