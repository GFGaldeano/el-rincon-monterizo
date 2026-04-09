"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { isAdminEmail } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

function toNullableString(value: FormDataEntryValue | null) {
  const normalized = typeof value === "string" ? value.trim() : "";
  return normalized.length > 0 ? normalized : null;
}

function toNullableNumber(value: FormDataEntryValue | null) {
  const normalized = typeof value === "string" ? value.trim() : "";

  if (!normalized) return null;

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function toBoolean(value: FormDataEntryValue | null) {
  return value === "on";
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function toNullableVideoProvider(value: FormDataEntryValue | null) {
  const normalized = typeof value === "string" ? value.trim() : "";

  if (!normalized) return null;

  if (
    normalized === "youtube" ||
    normalized === "mux" ||
    normalized === "external"
  ) {
    return normalized;
  }

  return null;
}

function inferVideoProviderFromUrl(url: string | null) {
  if (!url) return null;

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "youtube";
  }

  return "external";
}

async function requireAdminEmail() {
  const supabase = await createClient();

  const { data: claimsData } = await supabase.auth.getClaims();

  const email =
    claimsData && typeof claimsData.claims.email === "string"
      ? claimsData.claims.email
      : null;

  if (!isAdminEmail(email)) {
    throw new Error("Unauthorized");
  }

  return email;
}

function buildContentPayload(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const authorName = String(formData.get("authorName") ?? "").trim();

  if (!title || !description || !category || !authorName) {
    throw new Error("Missing required fields");
  }

  const rawSlug = String(formData.get("slug") ?? "").trim();
  const slug = rawSlug ? slugify(rawSlug) : slugify(title);

  const contentUrl = toNullableString(formData.get("contentUrl"));
  const muxPlaybackId = toNullableString(formData.get("muxPlaybackId"));

  const explicitVideoProvider = toNullableVideoProvider(
    formData.get("videoProvider")
  );

  const videoProvider =
    category === "video"
      ? explicitVideoProvider ?? inferVideoProviderFromUrl(contentUrl)
      : null;

  if (category === "video" && videoProvider === "mux" && !muxPlaybackId) {
    throw new Error("Para videos Mux, el playback ID es obligatorio.");
  }

  if (
    category === "video" &&
    (videoProvider === "youtube" || videoProvider === "external") &&
    !contentUrl
  ) {
    throw new Error(
      "Para videos YouTube o externos, la URL del contenido es obligatoria."
    );
  }

  if (category !== "video" && muxPlaybackId) {
    throw new Error("El playback ID de Mux solo aplica a contenidos tipo video.");
  }

  return {
    slug,
    title,
    description,
    category,
    author_name: authorName,
    organization_name: toNullableString(formData.get("organizationName")),
    cover_image_url: toNullableString(formData.get("coverImageUrl")),
    content_url: contentUrl,
    format: toNullableString(formData.get("format")),
    duration_seconds: toNullableNumber(formData.get("durationSeconds")),
    page_count: toNullableNumber(formData.get("pageCount")),
    video_provider: videoProvider,
    mux_playback_id: muxPlaybackId,
    is_featured: toBoolean(formData.get("isFeatured")),
    is_published: toBoolean(formData.get("isPublished")),
    display_order: toNullableNumber(formData.get("displayOrder")) ?? 0,
  };
}

function revalidateContentPaths() {
  revalidatePath("/");
  revalidatePath("/biblioteca");
  revalidatePath("/videos");
  revalidatePath("/cultura");
  revalidatePath("/sponsors");
  revalidatePath("/admin");
  revalidatePath("/admin/content");
  revalidatePath("/contenido");
}

export async function createContentAction(formData: FormData) {
  await requireAdminEmail();

  const payload = buildContentPayload(formData);
  const adminClient = createAdminClient();

  const { error } = await adminClient.from("content").insert({
    ...payload,
    published_at: payload.is_published ? new Date().toISOString() : null,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidateContentPaths();
  redirect("/admin/content?success=content-created");
}

export async function updateContentAction(formData: FormData) {
  await requireAdminEmail();

  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    throw new Error("Missing content id.");
  }

  const payload = buildContentPayload(formData);
  const originalPublishedAt = toNullableString(formData.get("originalPublishedAt"));

  const adminClient = createAdminClient();

  const publishedAt = payload.is_published
    ? originalPublishedAt ?? new Date().toISOString()
    : null;

  const { error } = await adminClient
    .from("content")
    .update({
      ...payload,
      published_at: publishedAt,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateContentPaths();
  revalidatePath(`/contenido/${id}`);
  revalidatePath(`/admin/content/${id}/edit`);

  redirect("/admin/content?success=content-updated");
}

export async function togglePublishContentAction(formData: FormData) {
  await requireAdminEmail();

  const id = String(formData.get("id") ?? "").trim();
  const nextPublished = String(formData.get("nextPublished") ?? "").trim() === "true";

  if (!id) {
    throw new Error("Missing content id.");
  }

  const adminClient = createAdminClient();

  const payload = nextPublished
    ? {
        is_published: true,
        published_at: new Date().toISOString(),
      }
    : {
        is_published: false,
        published_at: null,
      };

  const { error } = await adminClient
    .from("content")
    .update(payload)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateContentPaths();
  revalidatePath(`/contenido/${id}`);
  revalidatePath("/admin/content");

  redirect(
    `/admin/content?success=${
      nextPublished ? "content-published" : "content-unpublished"
    }`
  );
}

export async function toggleTrashContentAction(formData: FormData) {
  await requireAdminEmail();

  const id = String(formData.get("id") ?? "").trim();
  const nextDeleted = String(formData.get("nextDeleted") ?? "").trim() === "true";

  if (!id) {
    throw new Error("Missing content id.");
  }

  const adminClient = createAdminClient();

  const payload = nextDeleted
    ? {
        deleted_at: new Date().toISOString(),
        is_published: false,
        published_at: null,
      }
    : {
        deleted_at: null,
      };

  const { error } = await adminClient
    .from("content")
    .update(payload)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateContentPaths();
  revalidatePath(`/contenido/${id}`);
  revalidatePath("/admin/content");

  redirect(
    `/admin/content?success=${
      nextDeleted ? "content-trashed" : "content-restored"
    }`
  );
}