import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { ContentCard } from "@/features/content/components/ContentCard";
import { contentItems } from "@/features/content/data/content.data";

const videoItems = contentItems.filter((item) => item.category === "video");

export default function VideosPage() {
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

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {videoItems.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}