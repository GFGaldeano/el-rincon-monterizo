import "server-only";


import type {
  ContentCategory,
  ContentItem,
} from "@/features/content/types/content";
import { createClient } from "@/lib/supabase/server";

type ContentRecord = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ContentCategory;
  author_name: string;
  organization_name: string | null;
  cover_image_url: string | null;
  content_url: string | null;
  format: string | null;
  duration_seconds: number | null;
  page_count: number | null;
  is_featured: boolean;
  is_published: boolean;
  published_at: string | null;
  display_order: number;
};

const fallbackImageUrl =
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80";

function formatDuration(durationSeconds: number | null): string | undefined {
  if (!durationSeconds || durationSeconds <= 0) return undefined;

  const minutes = Math.ceil(durationSeconds / 60);
  return `${minutes} min`;
}

function mapContentRecord(record: ContentRecord): ContentItem {
  return {
    id: record.id,
    title: record.title,
    description: record.description,
    category: record.category,
    author: record.author_name,
    imageUrl: record.cover_image_url ?? fallbackImageUrl,
    featured: record.is_featured,
    duration: formatDuration(record.duration_seconds),
    format: record.format ?? undefined,
    pages: record.page_count ?? undefined,
    organization: record.organization_name ?? undefined,
  };
}

export async function getPublishedLibraryContent(): Promise<{
  data: ContentItem[];
  error: string | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content")
    .select(
      `
        id,
        slug,
        title,
        description,
        category,
        author_name,
        organization_name,
        cover_image_url,
        content_url,
        format,
        duration_seconds,
        page_count,
        is_featured,
        is_published,
        published_at,
        display_order
      `
    )
    .in("category", ["biblioteca", "documento"])
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  if (error) {
    return {
      data: [],
      error: error.message,
    };
  }

  return {
    data: ((data ?? []) as ContentRecord[]).map(mapContentRecord),
    error: null,
  };
}

export async function getPublishedContentById(
  id: string
): Promise<ContentItem | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content")
    .select(
      `
        id,
        slug,
        title,
        description,
        category,
        author_name,
        organization_name,
        cover_image_url,
        content_url,
        format,
        duration_seconds,
        page_count,
        is_featured,
        is_published,
        published_at,
        display_order
      `
    )
    .eq("id", id)
    .eq("is_published", true)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapContentRecord(data as ContentRecord);
}

export async function getRelatedPublishedContent(
  category: ContentCategory,
  excludeId: string,
  limit = 3
): Promise<ContentItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content")
    .select(
      `
        id,
        slug,
        title,
        description,
        category,
        author_name,
        organization_name,
        cover_image_url,
        content_url,
        format,
        duration_seconds,
        page_count,
        is_featured,
        is_published,
        published_at,
        display_order
      `
    )
    .eq("category", category)
    .eq("is_published", true)
    .neq("id", excludeId)
    .order("display_order", { ascending: true })
    .limit(limit);

  if (error) {
    return [];
  }

  return ((data ?? []) as ContentRecord[]).map(mapContentRecord);
}


export async function getFeaturedPublishedContent(limit = 3): Promise<{
  data: ContentItem[];
  error: string | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content")
    .select(
      `
        id,
        slug,
        title,
        description,
        category,
        author_name,
        organization_name,
        cover_image_url,
        content_url,
        format,
        duration_seconds,
        page_count,
        is_featured,
        is_published,
        published_at,
        display_order
      `
    )
    .eq("is_published", true)
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
    data: ((data ?? []) as ContentRecord[]).map(mapContentRecord),
    error: null,
  };
}

export async function getPublishedVideoContent(): Promise<{
  data: ContentItem[];
  error: string | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content")
    .select(
      `
        id,
        slug,
        title,
        description,
        category,
        author_name,
        organization_name,
        cover_image_url,
        content_url,
        format,
        duration_seconds,
        page_count,
        is_featured,
        is_published,
        published_at,
        display_order
      `
    )
    .eq("category", "video")
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  if (error) {
    return {
      data: [],
      error: error.message,
    };
  }

  return {
    data: ((data ?? []) as ContentRecord[]).map(mapContentRecord),
    error: null,
  };
}