import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { ContentCard } from "@/features/content/components/ContentCard";
import { CultureDetailPanel } from "@/features/content/components/detail/CultureDetailPanel";
import { LibraryDetailPanel } from "@/features/content/components/detail/LibraryDetailPanel";
import { VideoDetailPanel } from "@/features/content/components/detail/VideoDetailPanel";
import { contentItems } from "@/features/content/data/content.data";
import type { ContentItem } from "@/features/content/types/content";

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

function renderDetailPanel(item: ContentItem) {
  if (item.category === "video") {
    return <VideoDetailPanel item={item} />;
  }

  if (item.category === "cultura") {
    return <CultureDetailPanel item={item} />;
  }

  return <LibraryDetailPanel item={item} />;
}

export async function generateMetadata({
  params,
}: ContentDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  const item = contentItems.find((content) => content.id === id);

  if (!item) {
    return {
      title: "Contenido no encontrado | El Rincón Monterizo",
    };
  }

  return {
    title: `${item.title} | El Rincón Monterizo`,
    description: item.description,
  };
}

export default async function ContentDetailPage({
  params,
}: ContentDetailPageProps) {
  const { id } = await params;

  const item = contentItems.find((content) => content.id === id);

  if (!item) {
    notFound();
  }

  const relatedItems = contentItems
    .filter((content) => content.category === item.category && content.id !== item.id)
    .slice(0, 3);

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

        <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
          <div>
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

            <div className="mt-8">
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
            </div>
          </div>

          <div>{renderDetailPanel(item)}</div>
        </div>

        {relatedItems.length > 0 && (
          <div className="mt-20">
            <div className="max-w-2xl">
              <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
                Relacionado
              </Badge>
              <h2 className="mt-4 text-3xl font-bold text-white">
                Más contenido que podría interesarte
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {relatedItems.map((relatedItem) => (
                <ContentCard key={relatedItem.id} item={relatedItem} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}