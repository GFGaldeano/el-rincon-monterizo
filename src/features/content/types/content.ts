export type ContentCategory =
  | "biblioteca"
  | "video"
  | "cultura"
  | "documento";

export type VideoProvider = "youtube" | "mux" | "external";

export type ContentItem = {
  id: string;
  title: string;
  description: string;
  category: ContentCategory;
  author: string;
  imageUrl: string;
  featured?: boolean;
  duration?: string;
  format?: string;
  pages?: number;
  organization?: string;
  contentUrl?: string;
  videoProvider?: VideoProvider;
  muxPlaybackId?: string;
};