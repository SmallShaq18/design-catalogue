export interface DesignProject {
  id: string;
  slug: string;
  title: string;
  category: "branding" | "logo" | "poster" | "flyer" | "print" | "others";
  coverImage: string;
  gallery: string[];
  
  description?: string;
  client?: string;
  year?: number;
  tools?: string[];
  tags?: string[];
  //isFavourite?: boolean;
  //image?: string;
  
  featured?: boolean;
}

export type ProjectCategory = DesignProject["category"];
