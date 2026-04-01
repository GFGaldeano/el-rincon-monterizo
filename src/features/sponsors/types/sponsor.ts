export type SponsorLevel = "oro" | "plata" | "bronce" | "destacado";

export type SponsorItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  city: string;
  websiteUrl?: string;
  level: SponsorLevel;
  featured?: boolean;
};