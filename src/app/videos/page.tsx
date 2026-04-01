import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { ContentCard } from "@/features/content/components/ContentCard";
import { getPublishedVideoContent } from "@/services/content.server";

export default async function VideosPage() {
  const { data: videoItems, error } = await getPublishedVideoContent();

  return (
    <section className="py-16">
      <Container>
        <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
          Videos on-demand
        </Badge>

        <h1 className="mt-4 text-4xl font-bold text-white">Videos</h1>

        <p className="mt-4 max-w-2xl text-zinc-400">
          Contenido audiovisual pensado para aprender y descubrir a demanda.
        </p>

        {error ? (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
            No se pudieron cargar los videos desde Supabase: {error}
          </div>
        ) : null}

        {videoItems.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {videoItems.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 text-zinc-400">
            Aún no hay videos publicados.
          </div>
        )}
      </Container>
    </section>
  );
}