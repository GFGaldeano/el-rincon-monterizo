import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContentItem } from "@/features/content/types/content";

type VideoDetailPanelProps = {
  item: ContentItem;
};

export function VideoDetailPanel({ item }: VideoDetailPanelProps) {
  return (
    <Card className="border-white/10 bg-zinc-900/60">
      <CardHeader>
        <Badge className="w-fit bg-sky-400/15 text-sky-300 hover:bg-sky-400/15">
          Experiencia audiovisual
        </Badge>
        <CardTitle className="text-white">Detalle del video</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-zinc-950/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Duración</p>
            <p className="mt-2 text-sm font-medium text-zinc-200">
              {item.duration ?? "Próximamente"}
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-950/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Formato</p>
            <p className="mt-2 text-sm font-medium text-zinc-200">
              {item.format ?? "Video"}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
          <p className="text-sm leading-7 text-zinc-400">
            Este contenido está pensado para consumirse en formato audiovisual,
            priorizando acceso simple, experiencia clara y visualización on-demand.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300">
            Reproducir video
          </Button>
          <Button variant="outline">Guardar para después</Button>
        </div>
      </CardContent>
    </Card>
  );
}