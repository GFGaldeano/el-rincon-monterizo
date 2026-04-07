import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditContentForm } from "@/features/admin/components/content/EditContentForm";
import { isAdminEmail } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

type AdminEditContentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminEditContentPage({
  params,
}: AdminEditContentPageProps) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();

  const email =
    claimsData && typeof claimsData.claims.email === "string"
      ? claimsData.claims.email
      : null;

  if (!isAdminEmail(email)) {
    redirect("/admin/login");
  }

  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from("content")
    .select(
      `
        id,
        title,
        slug,
        description,
        category,
        author_name,
        organization_name,
        cover_image_url,
        content_url,
        format,
        duration_seconds,
        page_count,
        video_provider,
        mux_playback_id,
        is_featured,
        is_published,
        published_at,
        display_order
      `
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  return (
    <section className="py-16">
      <Container>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
              Admin · Contenidos
            </Badge>
            <h1 className="mt-4 text-4xl font-bold text-white">
              Editar contenido
            </h1>
            <p className="mt-3 text-zinc-400">
              Modificá la información del contenido seleccionado.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/admin/content">Volver al listado</Link>
          </Button>
        </div>

        <EditContentForm
          item={{
            id: data.id,
            title: data.title,
            slug: data.slug,
            description: data.description,
            category: data.category,
            author_name: data.author_name,
            organization_name: data.organization_name,
            cover_image_url: data.cover_image_url,
            content_url: data.content_url,
            format: data.format,
            duration_seconds: data.duration_seconds,
            page_count: data.page_count,
            video_provider: data.video_provider,
            mux_playback_id: data.mux_playback_id,
            is_featured: data.is_featured,
            is_published: data.is_published,
            published_at: data.published_at,
            display_order: data.display_order,
          }}
        />
      </Container>
    </section>
  );
}