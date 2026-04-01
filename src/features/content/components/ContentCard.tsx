import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ContentItem } from "@/features/content/types/content";

type ContentCardProps = {
  item: ContentItem;
};

const categoryLabelMap: Record<ContentItem["category"], string> = {
  biblioteca: "Biblioteca",
  video: "Video",
  cultura: "Cultura",
  documento: "Documento",
};

export function ContentCard({ item }: ContentCardProps) {
  return (
    <Card className="overflow-hidden border-white/10 bg-zinc-900/70 transition hover:border-amber-400/30">
      <Link href={`/contenido/${item.id}`} className="block">
        <div className="relative h-52 w-full">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <CardHeader>
          <Badge className="w-fit bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
            {categoryLabelMap[item.category]}
          </Badge>

          <CardTitle className="mt-3 text-xl text-white">{item.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm leading-6 text-zinc-400">{item.description}</p>
        </CardContent>

        <CardFooter>
          <p className="text-sm text-zinc-500">Por {item.author}</p>
        </CardFooter>
      </Link>
    </Card>
  );
}