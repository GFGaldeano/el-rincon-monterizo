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

function toNullableDateString(value: FormDataEntryValue | null) {
  const normalized = typeof value === "string" ? value.trim() : "";
  return normalized.length > 0 ? normalized : null;
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

function buildSponsorPayload(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const businessCategory = String(formData.get("businessCategory") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const level = String(formData.get("level") ?? "").trim();

  if (!name || !description || !businessCategory || !city || !level) {
    throw new Error("Missing required fields");
  }

  if (
    level !== "oro" &&
    level !== "plata" &&
    level !== "bronce" &&
    level !== "destacado"
  ) {
    throw new Error("Nivel de sponsor inválido.");
  }

  const rawSlug = String(formData.get("slug") ?? "").trim();
  const slug = rawSlug ? slugify(rawSlug) : slugify(name);

  const startDate = toNullableDateString(formData.get("startDate"));
  const endDate = toNullableDateString(formData.get("endDate"));

  if (startDate && endDate && startDate > endDate) {
    throw new Error("La fecha de inicio no puede ser mayor que la fecha de fin.");
  }

  return {
    slug,
    name,
    description,
    business_category: businessCategory,
    city,
    website_url: toNullableString(formData.get("websiteUrl")),
    logo_url: toNullableString(formData.get("logoUrl")),
    level,
    is_featured: toBoolean(formData.get("isFeatured")),
    is_active: toBoolean(formData.get("isActive")),
    display_order: toNullableNumber(formData.get("displayOrder")) ?? 0,
    start_date: startDate,
    end_date: endDate,
  };
}

function revalidateSponsorPaths() {
  revalidatePath("/");
  revalidatePath("/sponsors");
  revalidatePath("/admin");
  revalidatePath("/admin/sponsors");
}

export async function createSponsorAction(formData: FormData) {
  await requireAdminEmail();

  const payload = buildSponsorPayload(formData);
  const adminClient = createAdminClient();

  const { error } = await adminClient.from("sponsors").insert(payload);

  if (error) {
    throw new Error(error.message);
  }

  revalidateSponsorPaths();
  redirect("/admin/sponsors?success=sponsor-created");
}

export async function updateSponsorAction(formData: FormData) {
  await requireAdminEmail();

  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    throw new Error("Missing sponsor id.");
  }

  const payload = buildSponsorPayload(formData);
  const adminClient = createAdminClient();

  const { error } = await adminClient
    .from("sponsors")
    .update(payload)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateSponsorPaths();
  revalidatePath(`/admin/sponsors/${id}/edit`);

  redirect("/admin/sponsors?success=sponsor-updated");
}

export async function toggleSponsorActiveAction(formData: FormData) {
  await requireAdminEmail();

  const id = String(formData.get("id") ?? "").trim();
  const nextActive = String(formData.get("nextActive") ?? "").trim() === "true";

  if (!id) {
    throw new Error("Missing sponsor id.");
  }

  const adminClient = createAdminClient();

  const { error } = await adminClient
    .from("sponsors")
    .update({
      is_active: nextActive,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateSponsorPaths();
  revalidatePath("/admin/sponsors");

  redirect(
    `/admin/sponsors?success=${
      nextActive ? "sponsor-activated" : "sponsor-deactivated"
    }`
  );
}

export async function toggleTrashSponsorAction(formData: FormData) {
  await requireAdminEmail();

  const id = String(formData.get("id") ?? "").trim();
  const nextDeleted = String(formData.get("nextDeleted") ?? "").trim() === "true";

  if (!id) {
    throw new Error("Missing sponsor id.");
  }

  const adminClient = createAdminClient();

  const payload = nextDeleted
    ? {
        deleted_at: new Date().toISOString(),
        is_active: false,
      }
    : {
        deleted_at: null,
      };

  const { error } = await adminClient
    .from("sponsors")
    .update(payload)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateSponsorPaths();
  revalidatePath("/admin/sponsors");

  redirect(
    `/admin/sponsors?success=${
      nextDeleted ? "sponsor-trashed" : "sponsor-restored"
    }`
  );
}