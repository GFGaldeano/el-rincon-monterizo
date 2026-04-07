import "server-only";

import type {
  SponsorItem,
  SponsorLevel,
} from "@/features/sponsors/types/sponsor";
import { createClient } from "@/lib/supabase/server";

type SponsorRecord = {
  id: string;
  slug: string;
  name: string;
  description: string;
  business_category: string;
  city: string;
  website_url: string | null;
  logo_url: string | null;
  level: SponsorLevel;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  start_date: string | null;
  end_date: string | null;
};

function mapSponsorRecord(record: SponsorRecord): SponsorItem {
  return {
    id: record.id,
    name: record.name,
    description: record.description,
    category: record.business_category,
    city: record.city,
    websiteUrl: record.website_url ?? undefined,
    logoUrl: record.logo_url ?? undefined,
    level: record.level,
    featured: record.is_featured,
  };
}

export async function getActiveSponsors(): Promise<{
  data: SponsorItem[];
  error: string | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("sponsors")
    .select(
      `
        id,
        slug,
        name,
        description,
        business_category,
        city,
        website_url,
        logo_url,
        level,
        is_featured,
        is_active,
        display_order,
        start_date,
        end_date
      `
    )
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    return {
      data: [],
      error: error.message,
    };
  }

  return {
    data: ((data ?? []) as SponsorRecord[]).map(mapSponsorRecord),
    error: null,
  };
}

export async function getFeaturedActiveSponsors(limit = 3): Promise<{
  data: SponsorItem[];
  error: string | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("sponsors")
    .select(
      `
        id,
        slug,
        name,
        description,
        business_category,
        city,
        website_url,
        logo_url,
        level,
        is_featured,
        is_active,
        display_order,
        start_date,
        end_date
      `
    )
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("display_order", { ascending: true })
    .limit(limit);

  if (error) {
    return {
      data: [],
      error: error.message,
    };
  }

  return {
    data: ((data ?? []) as SponsorRecord[]).map(mapSponsorRecord),
    error: null,
  };
}