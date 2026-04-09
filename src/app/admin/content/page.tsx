import Link from "next/link";
import { redirect } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DeleteContentButton } from "@/features/admin/components/content/DeleteContentButton";
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
  deleted_at: string | null;
};

type AdminContentPageProps = {
  searchParams?: Promise<{
    q?: string;
    category?: string;
    status?: string;
    trash?: string;
    success?: string;
    page?: string;
  }>;
};

const PAGE_SIZE = 8;

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

const trashOptions = [
  { value: "active", label: "Activos" },
  { value: "trashed", label: "Papelera" },
  { value: "all", label: "Todos" },
];

function getSuccessMessage(success?: string) {
  switch (success) {
    case "content-created":
      return "Contenido creado correctamente.";
    case "content-updated":
      return "Contenido actualizado correctamente.";
    case "content-published":
      return "Contenido publicado correctamente.";
    case "content-unpublished":
      return "Contenido despublicado correctamente.";
    case "content-trashed":
      return "Contenido movido a la papelera.";
    case "content-restored":
      return "Contenido restaurado correctamente.";
    default:
      return null;
  }
}

function buildPageUrl(params: {
  q: string;
  category: string;
  status: string;
  trash: string;
  page: number;
}) {
  const search = new URLSearchParams();

  if (params.q) search.set("q", params.q);
  if (params.category !== "all") search.set("category", params.category);
  if (params.status !== "all") search.set("status", params.status);
  if (params.trash !== "active") search.set("trash", params.trash);
  if (params.page > 1) search.set("page", String(params.page));

  const query = search.toString();
  return query ? `/admin/content?${query}` : "/admin/content";
}

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

  const trash =
    typeof resolvedSearchParams.trash === "string" &&
    resolvedSearchParams.trash.length > 0
      ? resolvedSearchParams.trash
      : "active";

  const success =
    typeof resolvedSearchParams.success === "string"
      ? resolvedSearchParams.success
      : "";

  const currentPageRaw =
    typeof resolvedSearchParams.page === "string"
      ? Number(resolvedSearchParams.page)
      : 1;

  const currentPage =
    Number.isFinite(currentPageRaw) && currentPageRaw > 0
      ? Math.floor(currentPageRaw)
      : 1;

  const successMessage = getSuccessMessage(success);

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
      "id, title, slug, category, author_name, is_featured, is_published, display_order, created_at, deleted_at",
      { count: "exact" }
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

  if (trash === "active") {
    query = query.is("deleted_at", null);
  }

  if (trash === "trashed") {
    query = query.not("deleted_at", "is", null);
  }

  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await query.range(from, to);

  const rows = (data ?? []) as AdminContentRow[];
  const totalItems = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  const hasActiveFilters =
    Boolean(q) ||
    category !== "all" ||
    status !== "all" ||
    trash !== "active";

  const prevPageUrl = buildPageUrl({
    q,
    category,
    status,
    trash,
    page: currentPage - 1,
  });

  const nextPageUrl = buildPageUrl({
    q,
    category,
    status,
    trash,
    page: currentPage + 1,
  });

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
              Buscá, filtrá y administrá contenidos publicados, borradores o en papelera.
            </p>
          </div>

          <Button asChild className="bg-amber-400 text-zinc-950 hover:bg-amber-300">
            <Link href="/admin/content/new">Nuevo contenido</Link>
          </Button>
        </div>

        {successMessage ? (
          <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            {successMessage}
          </div>
        ) : null}

        <Card className="mb-8 border-white/10 bg-zinc-900/70">
          <CardContent className="p-6">
            <form className="grid gap-4 xl:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
              <div className="grid gap-2">
                <label htmlFor="q" className="text-sm font-medium text-zinc-300">
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
                <label htmlFor="category" className="text-sm font-medium text-zinc-300">
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
                <label htmlFor="status" className="text-sm font-medium text-zinc-300">
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
                <label htmlFor="trash" className="text-sm font-medium text-zinc-300">
                  Papelera
                </label>
                <select
                  id="trash"
                  name="trash"
                  defaultValue={trash}
                  className="h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-white outline-none"
                >
                  {trashOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end gap-3">
                <Button type="submit" className="bg-amber-400 text-zinc-950 hover:bg-amber-300">
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
          <div className="mb-6 flex flex-col gap-2 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
            <span>
              Resultados encontrados: {totalItems}
            </span>
            <span>
              Página {currentPage} de {totalPages}
            </span>
          </div>
        ) : null}

        {rows.length > 0 ? (
          <div className="grid gap-4">
            {rows.map((row) => {
              const isDeleted = Boolean(row.deleted_at);

              return (
                <Card key={row.id} className="border-white/10 bg-zinc-900/70">
                  <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-white">{row.title}</h2>
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
                        {isDeleted ? (
                          <span className="rounded-full bg-red-500/10 px-3 py-1 text-red-300">
                            En papelera
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {!isDeleted ? (
                        <Button asChild variant="outline">
                          <Link href={`/contenido/${row.id}`}>Ver</Link>
                        </Button>
                      ) : null}

                      <Button asChild variant="outline">
                        <Link href={`/admin/content/${row.id}/edit`}>Editar</Link>
                      </Button>

                      {!isDeleted ? (
                        <TogglePublishButton
                          id={row.id}
                          isPublished={row.is_published}
                        />
                      ) : null}

                      <DeleteContentButton
                        id={row.id}
                        title={row.title}
                        deletedAt={row.deleted_at}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 text-zinc-400">
            No se encontraron contenidos con los filtros aplicados.
          </div>
        )}

        {!error && totalPages > 1 ? (
          <div className="mt-8 flex items-center justify-between gap-4">
            {currentPage > 1 ? (
              <Button asChild variant="outline">
                <Link href={prevPageUrl}>Anterior</Link>
              </Button>
            ) : (
              <Button variant="outline" disabled>
                Anterior
              </Button>
            )}

            {currentPage < totalPages ? (
              <Button asChild variant="outline">
                <Link href={nextPageUrl}>Siguiente</Link>
              </Button>
            ) : (
              <Button variant="outline" disabled>
                Siguiente
              </Button>
            )}
          </div>
        ) : null}
      </Container>
    </section>
  );
}