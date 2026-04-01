import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { ContentCard } from "@/features/content/components/ContentCard";
import { contentItems } from "@/features/content/data/content.data";

const bibliotecaItems = contentItems.filter(
  (item) => item.category === "biblioteca" || item.category === "documento"
);

export default function BibliotecaPage() {
  return (
    <section className="py-16">
      <Container>
        <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
          Biblioteca digital
        </Badge>

        <h1 className="mt-4 text-4xl font-bold text-white">Biblioteca</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Recursos digitales, documentos y materiales educativos disponibles para consulta.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {bibliotecaItems.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}