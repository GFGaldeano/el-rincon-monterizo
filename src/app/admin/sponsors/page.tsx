import Image from "next/image";
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
import { DeleteSponsorButton } from "@/features/admin/components/sponsors/DeleteSponsorButton";

type AdminSponsorRow = {
  id: string;
  name: string;
  slug: string;
  business_category: string;
  city: string;
  logo_url: string | null;
  level: "oro" | "plata" | "bronce" | "destacado";
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  start_date: string | null;
  end_date: string | null;
};

type AdminSponsorsPageProps = {
  searchParams?: Promise<{
    q?: string;
    level?: string;
    status?: string;
    featured?: string;
  }>;
};

const levelOptions = [
  { value: "all", label: "Todos" },
  { value: "oro", label: "Oro" },
  { value: "plata", label: "Plata" },
  { value: "bronce", label: "Bronce" },
  { value: "destacado", label: "Destacado" },
];

const statusOptions = [
  { value: "all", label: "Todos" },
  { value: "active", label: "Activos" },
  { value: "inactive", label: "Inactivos" },
];

const featuredOptions = [
  { value: "all", label: "Todos" },
  { value: "featured", label: "Destacados" },
  { value: "standard", label: "No destacados" },
];

export default async function AdminSponsorsPage({
  searchParams,
}: AdminSponsorsPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};

  const q =
    typeof resolvedSearchParams.q === "string"
      ? resolvedSearchParams.q.trim()
      : "";

  const level =
    typeof resolvedSearchParams.level === "string" &&
    resolvedSearchParams.level.length > 0
      ? resolvedSearchParams.level
      : "all";

  const status =
    typeof resolvedSearchParams.status === "string" &&
    resolvedSearchParams.status.length > 0
      ? resolvedSearchParams.status
      : "all";

  const featured =
    typeof resolvedSearchParams.featured === "string" &&
    resolvedSearchParams.featured.length > 0
      ? resolvedSearchParams.featured
      : "all";

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

  let query = adminClient
    .from("sponsors")
    .select(
      "id, name, slug, business_category, city, logo_url, level, is_featured, is_active, display_order, start_date, end_date"
    )
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (q) {
    query = query.or(
      `name.ilike.%${q}%,slug.ilike.%${q}%,business_category.ilike.%${q}%,city.ilike.%${q}%`
    );
  }

  if (level !== "all") {
    query = query.eq("level", level);
  }

  if (status === "active") {
    query = query.eq("is_active", true);
  }

  if (status === "inactive") {
    query = query.eq("is_active", false);
  }

  if (featured === "featured") {
    query = query.eq("is_featured", true);
  }

  if (featured === "standard") {
    query = query.eq("is_featured", false);
  }

  const { data, error } = await query;

  const rows = (data ?? []) as AdminSponsorRow[];
  const hasActiveFilters =
    Boolean(q) || level !== "all" || status !== "all" || featured !== "all";

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
              Buscá, filtrá y administrá sponsors activos, inactivos o destacados.
            </p>
          </div>

          <Button asChild className="bg-amber-400 text-zinc-950 hover:bg-amber-300">
            <Link href="/admin/sponsors/new">Nuevo sponsor</Link>
          </Button>
        </div>

        <Card className="mb-8 border-white/10 bg-zinc-900/70">
          <CardContent className="p-6">
            <form className="grid gap-4 xl:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
              <div className="grid gap-2">
                <label
                  htmlFor="q"
                  className="text-sm font-medium text-zinc-300"
                >
                  Buscar por nombre, slug, categoría o ciudad
                </label>
                <input
                  id="q"
                  name="q"
                  defaultValue={q}
                  placeholder="Ej. librería, monteros, café..."
                  className="h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-white outline-none placeholder:text-zinc-500"
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="level"
                  className="text-sm font-medium text-zinc-300"
                >
                  Nivel
                </label>
                <select
                  id="level"
                  name="level"
                  defaultValue={level}
                  className="h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-white outline-none"
                >
                  {levelOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="status"
                  className="text-sm font-medium text-zinc-300"
                >
                  Estado
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={status}
                  className="h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-white outline-none"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="featured"
                  className="text-sm font-medium text-zinc-300"
                >
                  Destacado
                </label>
                <select
                  id="featured"
                  name="featured"
                  defaultValue={featured}
                  className="h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-white outline-none"
                >
                  {featuredOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end gap-3">
                <Button
                  type="submit"
                  className="bg-amber-400 text-zinc-950 hover:bg-amber-300"
                >
                  Aplicar
                </Button>

                {hasActiveFilters ? (
                  <Button asChild variant="outline">
                    <Link href="/admin/sponsors">Limpiar</Link>
                  </Button>
                ) : null}
              </div>
            </form>
          </CardContent>
        </Card>

        {error ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
            No se pudo cargar el listado: {error.message}
          </div>
        ) : null}

        {!error ? (
          <div className="mb-6 text-sm text-zinc-500">
            Resultados encontrados: {rows.length}
          </div>
        ) : null}

        {rows.length > 0 ? (
          <div className="grid gap-4">
            {rows.map((row) => (
              <Card key={row.id} className="border-white/10 bg-zinc-900/70">
                <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-4">
                    {row.logo_url ? (
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white">
                        <Image
                          src={row.logo_url}
                          alt={`${row.name} logo`}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-800 text-sm font-bold text-white">
                        {row.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {row.name}
                      </h2>
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

  <DeleteSponsorButton
    id={row.id}
    name={row.name}
  />
</div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 text-zinc-400">
            No se encontraron sponsors con los filtros aplicados.
          </div>
        )}
      </Container>
    </section>
  );
}