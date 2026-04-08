import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContentItem } from "@/features/content/types/content";

type LibraryDetailPanelProps = {
  item: ContentItem;
};

function isPdfUrl(url?: string) {
  if (!url) return false;

  try {
    const parsed = new URL(url);
    return parsed.pathname.toLowerCase().endsWith(".pdf");
  } catch {
    return url.toLowerCase().includes(".pdf");
  }
}

function looksLikePdf(item: ContentItem) {
  return (
    isPdfUrl(item.contentUrl) ||
    item.format?.toLowerCase().includes("pdf") === true
  );
}

export function LibraryDetailPanel({ item }: LibraryDetailPanelProps) {
  const hasContentUrl = Boolean(item.contentUrl);
  const canEmbedPdf = hasContentUrl && looksLikePdf(item);

  return (
    <Card className="border-white/10 bg-zinc-900/60">
      <CardHeader>
        <Badge className="w-fit bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
          Recurso documental
        </Badge>
        <CardTitle className="text-white">Detalle del documento</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-zinc-950/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Formato
            </p>
            <p className="mt-2 text-sm font-medium text-zinc-200">
              {item.format ?? "Documento"}
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-950/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Páginas
            </p>
            <p className="mt-2 text-sm font-medium text-zinc-200">
              {item.pages ?? "No especificado"}
            </p>
          </div>
        </div>

        {canEmbedPdf ? (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60">
            <div className="h-[70vh] min-h-[500px] w-full">
              <iframe
                src={item.contentUrl}
                title={item.title}
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
            <p className="text-sm leading-7 text-zinc-400">
              {hasContentUrl
                ? "Este recurso no se previsualiza embebido por ahora. Podés abrirlo en una nueva pestaña."
                : "Este documento todavía no tiene una URL de lectura configurada."}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {hasContentUrl ? (
            <Button
              asChild
              className="bg-amber-400 text-zinc-950 hover:bg-amber-300"
            >
              <a href={item.contentUrl} target="_blank" rel="noreferrer">
                {canEmbedPdf ? "Abrir documento" : "Abrir recurso"}
              </a>
            </Button>
          ) : (
            <Button
              disabled
              className="bg-amber-400 text-zinc-950 hover:bg-amber-300"
            >
              Documento no disponible
            </Button>
          )}

          {canEmbedPdf ? (
            <Button asChild variant="outline">
              <a href={item.contentUrl} target="_blank" rel="noreferrer">
                Abrir en nueva pestaña
              </a>
            </Button>
          ) : (
            <Button variant="outline" disabled>
              Preview no disponible
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}