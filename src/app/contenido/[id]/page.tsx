import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { contentItems } from "@/features/content/data/content.data";

type ContentDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const categoryLabelMap: Record<string, string> = {
  biblioteca: "Biblioteca",
  video: "Video",
  cultura: "Cultura",
  documento: "Documento",
};

export default async function ContentDetailPage({
  params,
}: ContentDetailPageProps) {
  const { id } = await params;

  const item = contentItems.find((content) => content.id === id);

  if (!item) {
    notFound();
  }

  return (
    <section className="py-16">
      <Container>
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm font-medium text-amber-300 transition hover:text-amber-200"
          >
            ← Volver al inicio
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="relative h-[320px] overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 md:h-[480px]">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div>
            <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
              {categoryLabelMap[item.category] ?? item.category}
            </Badge>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              {item.title}
            </h1>

            <p className="mt-4 text-sm text-zinc-500">Autor: {item.author}</p>

            <p className="mt-6 text-lg leading-8 text-zinc-300">
              {item.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300">
                Ver contenido
              </Button>

              <Button asChild variant="outline">
                <Link href="/biblioteca">Explorar más</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}