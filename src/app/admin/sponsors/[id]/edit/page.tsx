import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditSponsorForm } from "@/features/admin/components/sponsors/EditSponsorForm";
import { isAdminEmail } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

type AdminEditSponsorPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminEditSponsorPage({
  params,
}: AdminEditSponsorPageProps) {
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
    .from("sponsors")
    .select(
      `
        id,
        name,
        slug,
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
              Admin · Sponsors
            </Badge>
            <h1 className="mt-4 text-4xl font-bold text-white">
              Editar sponsor
            </h1>
            <p className="mt-3 text-zinc-400">
              Modificá la información del sponsor seleccionado.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/admin/sponsors">Volver al listado</Link>
          </Button>
        </div>

        <EditSponsorForm
          item={{
            id: data.id,
            name: data.name,
            slug: data.slug,
            description: data.description,
            business_category: data.business_category,
            city: data.city,
            website_url: data.website_url,
            logo_url: data.logo_url,
            level: data.level,
            is_featured: data.is_featured,
            is_active: data.is_active,
            display_order: data.display_order,
            start_date: data.start_date,
            end_date: data.end_date,
          }}
        />
      </Container>
    </section>
  );
}