import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { ContentCard } from "@/features/content/components/ContentCard";
import { getPublishedLibraryContent } from "@/services/content.server";

export default async function BibliotecaPage() {
  const { data: bibliotecaItems, error } = await getPublishedLibraryContent();

  return (
    <section className="py-16">
      <Container>
        <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
          Biblioteca digital
        </Badge>

        <h1 className="mt-4 text-4xl font-bold text-white">Biblioteca</h1>

        <p className="mt-4 max-w-2xl text-zinc-400">
          Recursos digitales, documentos y materiales educativos disponibles para
          consulta.
        </p>

        {error ? (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
            No se pudo cargar el contenido desde Supabase: {error}
          </div>
        ) : null}

        {bibliotecaItems.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {bibliotecaItems.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 text-zinc-400">
            Aún no hay recursos publicados en la biblioteca.
          </div>
        )}
      </Container>
    </section>
  );
}