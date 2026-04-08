import Link from "next/link";
import { redirect } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TogglePublishButton } from "@/features/admin/components/content/TogglePublishButton";
import { isAdminEmail } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

type AdminContentRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  author_name: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
};

type AdminContentPageProps = {
  searchParams?: Promise<{
    q?: string;
    category?: string;
    status?: string;
  }>;
};

const categoryOptions = [
  { value: "all", label: "Todas" },
  { value: "biblioteca", label: "Biblioteca" },
  { value: "documento", label: "Documento" },
  { value: "video", label: "Video" },
  { value: "cultura", label: "Cultura" },
];

const statusOptions = [
  { value: "all", label: "Todos" },
  { value: "published", label: "Publicados" },
  { value: "draft", label: "Borradores" },
];

export default async function AdminContentPage({
  searchParams,
}: AdminContentPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};

  const q =
    typeof resolvedSearchParams.q === "string"
      ? resolvedSearchParams.q.trim()
      : "";

  const category =
    typeof resolvedSearchParams.category === "string" &&
    resolvedSearchParams.category.length > 0
      ? resolvedSearchParams.category
      : "all";

  const status =
    typeof resolvedSearchParams.status === "string" &&
    resolvedSearchParams.status.length > 0
      ? resolvedSearchParams.status
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
    .from("content")
    .select(
      "id, title, slug, category, author_name, is_featured, is_published, display_order, created_at"
    )
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (q) {
    query = query.or(`title.ilike.%${q}%,slug.ilike.%${q}%`);
  }

  if (category !== "all") {
    query = query.eq("category", category);
  }

  if (status === "published") {
    query = query.eq("is_published", true);
  }

  if (status === "draft") {
    query = query.eq("is_published", false);
  }

  const { data, error } = await query;

  const rows = (data ?? []) as AdminContentRow[];
  const hasActiveFilters = Boolean(q) || category !== "all" || status !== "all";

  return (
    <section className="py-16">
      <Container>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
              Admin · Contenidos
            </Badge>
            <h1 className="mt-4 text-4xl font-bold text-white">
              Gestión de contenidos
            </h1>
            <p className="mt-3 text-zinc-400">
              Buscá, filtrá y administrá contenidos publicados o borradores.
            </p>
          </div>

          <Button asChild className="bg-amber-400 text-zinc-950 hover:bg-amber-300">
            <Link href="/admin/content/new">Nuevo contenido</Link>
          </Button>
        </div>

        <Card className="mb-8 border-white/10 bg-zinc-900/70">
          <CardContent className="p-6">
            <form className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_auto]">
              <div className="grid gap-2">
                <label
                  htmlFor="q"
                  className="text-sm font-medium text-zinc-300"
                >
                  Buscar por título o slug
                </label>
                <input
                  id="q"
                  name="q"
                  defaultValue={q}
                  placeholder="Ej. historia, monteros, video..."
                  className="h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-white outline-none placeholder:text-zinc-500"
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="category"
                  className="text-sm font-medium text-zinc-300"
                >
                  Categoría
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={category}
                  className="h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-white outline-none"
                >
                  {categoryOptions.map((option) => (
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

              <div className="flex items-end gap-3">
                <Button
                  type="submit"
                  className="bg-amber-400 text-zinc-950 hover:bg-amber-300"
                >
                  Aplicar
                </Button>

                {hasActiveFilters ? (
                  <Button asChild variant="outline">
                    <Link href="/admin/content">Limpiar</Link>
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
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {row.title}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                      {row.category} · {row.author_name} · {row.slug}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-white/5 px-3 py-1 text-zinc-300">
                        Orden: {row.display_order}
                      </span>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-zinc-300">
                        {row.is_published ? "Publicado" : "Borrador"}
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
                      <Link href={`/contenido/${row.id}`}>Ver</Link>
                    </Button>

                    <Button asChild variant="outline">
                      <Link href={`/admin/content/${row.id}/edit`}>Editar</Link>
                    </Button>

                    <TogglePublishButton
                      id={row.id}
                      isPublished={row.is_published}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 text-zinc-400">
            No se encontraron contenidos con los filtros aplicados.
          </div>
        )}
      </Container>
    </section>
  );
}