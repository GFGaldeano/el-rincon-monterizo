export type ContentCategory =
  | "biblioteca"
  | "video"
  | "cultura"
  | "documento";

export type ContentItem = {
  id: string;
  title: string;
  description: string;
  category: ContentCategory;
  author: string;
  imageUrl: string;
  featured?: boolean;
};