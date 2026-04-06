import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContentItem, VideoProvider } from "@/features/content/types/content";

type VideoDetailPanelProps = {
  item: ContentItem;
};

function inferVideoProvider(
  item: ContentItem
): VideoProvider | undefined {
  if (item.videoProvider) return item.videoProvider;

  if (item.contentUrl?.includes("youtube.com") || item.contentUrl?.includes("youtu.be")) {
    return "youtube";
  }

  if (item.contentUrl) {
    return "external";
  }

  return undefined;
}

function getYouTubeEmbedUrl(url?: string) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      const videoId = parsed.pathname.replace("/", "");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    return null;
  } catch {
    return null;
  }
}

function getMuxEmbedUrl(playbackId?: string) {
  if (!playbackId) return null;
  return `https://player.mux.com/${playbackId}`;
}

export function VideoDetailPanel({ item }: VideoDetailPanelProps) {
  const provider = inferVideoProvider(item);
  const youtubeEmbedUrl = provider === "youtube" ? getYouTubeEmbedUrl(item.contentUrl) : null;
  const muxEmbedUrl = provider === "mux" ? getMuxEmbedUrl(item.muxPlaybackId) : null;

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
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Duración
            </p>
            <p className="mt-2 text-sm font-medium text-zinc-200">
              {item.duration ?? "Próximamente"}
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-950/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Formato
            </p>
            <p className="mt-2 text-sm font-medium text-zinc-200">
              {item.format ?? "Video"}
            </p>
          </div>
        </div>

        {(youtubeEmbedUrl || muxEmbedUrl) && (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60">
            <div className="aspect-video w-full">
              <iframe
                src={youtubeEmbedUrl ?? muxEmbedUrl ?? ""}
                title={item.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
          <p className="text-sm leading-7 text-zinc-400">
            Este contenido está pensado para consumirse en formato audiovisual,
            priorizando acceso simple, experiencia clara y visualización on-demand.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {provider === "external" && item.contentUrl ? (
            <Button
              asChild
              className="bg-amber-400 text-zinc-950 hover:bg-amber-300"
            >
              <a href={item.contentUrl} target="_blank" rel="noreferrer">
                Reproducir video
              </a>
            </Button>
          ) : provider === "youtube" || provider === "mux" ? (
            <Button
              disabled
              className="bg-amber-400 text-zinc-950 hover:bg-amber-300"
            >
              Reproduciendo embebido
            </Button>
          ) : (
            <Button
              disabled
              className="bg-amber-400 text-zinc-950 hover:bg-amber-300"
            >
              Reproducir video
            </Button>
          )}

          <Button variant="outline">Guardar para después</Button>
        </div>

        {!item.contentUrl && !item.muxPlaybackId ? (
          <p className="text-sm text-zinc-500">
            Este video todavía no tiene una fuente de reproducción configurada.
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}