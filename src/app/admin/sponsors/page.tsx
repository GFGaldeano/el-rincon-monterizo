import Link from "next/link";
import { redirect } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleSponsorActiveButton } from "@/features/admin/components/sponsors/ToggleSponsorActiveButton";
import { isAdminEmail } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

type AdminSponsorRow = {
  id: string;
  name: string;
  slug: string;
  business_category: string;
  city: string;
  level: "oro" | "plata" | "bronce" | "destacado";
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  start_date: string | null;
  end_date: string | null;
};

export default async function AdminSponsorsPage() {
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
      "id, name, slug, business_category, city, level, is_featured, is_active, display_order, start_date, end_date"
    )
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  const rows = (data ?? []) as AdminSponsorRow[];

  return (
    <section className="py-16">
      <Container>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
              Admin · Sponsors
            </Badge>
            <h1 className="mt-4 text-4xl font-bold text-white">
              Gestión de sponsors
            </h1>
            <p className="mt-3 text-zinc-400">
              Listado inicial de sponsors activos e inactivos.
            </p>
          </div>

          <Button asChild className="bg-amber-400 text-zinc-950 hover:bg-amber-300">
            <Link href="/admin/sponsors/new">Nuevo sponsor</Link>
          </Button>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
            No se pudo cargar el listado: {error.message}
          </div>
        ) : null}

        {rows.length > 0 ? (
          <div className="grid gap-4">
            {rows.map((row) => (
              <Card key={row.id} className="border-white/10 bg-zinc-900/70">
                <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">{row.name}</h2>
                    <p className="mt-1 text-sm text-zinc-500">
                      {row.business_category} · {row.city} · {row.slug}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-white/5 px-3 py-1 text-zinc-300">
                        Orden: {row.display_order}
                      </span>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-zinc-300">
                        {row.level}
                      </span>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-zinc-300">
                        {row.is_active ? "Activo" : "Inactivo"}
                      </span>
                      {row.is_featured ? (
                        <span className="rounded-full bg-amber-400/10 px-3 py-1 text-amber-300">
                          Destacado
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild variant="outline">
                      <Link href="/sponsors">Ver público</Link>
                    </Button>

                    <Button asChild variant="outline">
                      <Link href={`/admin/sponsors/${row.id}/edit`}>Editar</Link>
                    </Button>

                    <ToggleSponsorActiveButton
                      id={row.id}
                      isActive={row.is_active}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 text-zinc-400">
            Aún no hay sponsors cargados.
          </div>
        )}
      </Container>
    </section>
  );
}