import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContentItem } from "@/features/content/types/content";

type CultureDetailPanelProps = {
  item: ContentItem;
};

export function CultureDetailPanel({ item }: CultureDetailPanelProps) {
  return (
    <Card className="border-white/10 bg-zinc-900/60">
      <CardHeader>
        <Badge className="w-fit bg-emerald-400/15 text-emerald-300 hover:bg-emerald-400/15">
          Contenido cultural
        </Badge>
        <CardTitle className="text-white">Contexto del contenido</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="rounded-2xl bg-zinc-950/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Organización</p>
          <p className="mt-2 text-sm font-medium text-zinc-200">
            {item.organization ?? item.author}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
          <p className="text-sm leading-7 text-zinc-400">
            Este contenido busca preservar, comunicar y visibilizar expresiones
            culturales, comunitarias e identitarias dentro de la plataforma.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300">
            Explorar contenido
          </Button>
          <Button variant="outline">Compartir</Button>
        </div>
      </CardContent>
    </Card>
  );
}