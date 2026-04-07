"use client";

import { useActionState } from "react";

import { updateContentAction } from "@/features/admin/actions/content.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type EditContentFormProps = {
  item: {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: "biblioteca" | "documento" | "video" | "cultura";
    author_name: string;
    organization_name: string | null;
    cover_image_url: string | null;
    content_url: string | null;
    format: string | null;
    duration_seconds: number | null;
    page_count: number | null;
    video_provider: "youtube" | "mux" | "external" | null;
    mux_playback_id: string | null;
    is_featured: boolean;
    is_published: boolean;
    published_at: string | null;
    display_order: number;
  };
};

const initialState = {
  error: "",
};

export function EditContentForm({ item }: EditContentFormProps) {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: typeof initialState, formData: FormData) => {
      try {
        await updateContentAction(formData);
        return { error: "" };
      } catch (error) {
        return {
          error:
            error instanceof Error
              ? error.message
              : "No se pudo actualizar el contenido.",
        };
      }
    },
    initialState
  );

  return (
    <Card className="border-white/10 bg-zinc-900/70">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Editar contenido</CardTitle>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="grid gap-5">
          <input type="hidden" name="id" value={item.id} />
          <input
            type="hidden"
            name="originalPublishedAt"
            value={item.published_at ?? ""}
          />

          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium text-zinc-300">
              Título *
            </label>
            <Input
              id="title"
              name="title"
              required
              defaultValue={item.title}
              className="border-white/10 bg-zinc-950 text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="slug" className="text-sm font-medium text-zinc-300">
              Slug
            </label>
            <Input
              id="slug"
              name="slug"
              defaultValue={item.slug}
              className="border-white/10 bg-zinc-950 text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium text-zinc-300">
              Descripción *
            </label>
            <Textarea
              id="description"
              name="description"
              required
              rows={5}
              defaultValue={item.description}
              className="border-white/10 bg-zinc-950 text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="category" className="text-sm font-medium text-zinc-300">
                Categoría *
              </label>
              <select
                id="category"
                name="category"
                required
                defaultValue={item.category}
                className="h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-white"
              >
                <option value="biblioteca">Biblioteca</option>
                <option value="documento">Documento</option>
                <option value="video">Video</option>
                <option value="cultura">Cultura</option>
              </select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="authorName" className="text-sm font-medium text-zinc-300">
                Autor *
              </label>
              <Input
                id="authorName"
                name="authorName"
                required
                defaultValue={item.author_name}
                className="border-white/10 bg-zinc-950 text-white"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <label
                htmlFor="organizationName"
                className="text-sm font-medium text-zinc-300"
              >
                Organización
              </label>
              <Input
                id="organizationName"
                name="organizationName"
                defaultValue={item.organization_name ?? ""}
                className="border-white/10 bg-zinc-950 text-white"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="format" className="text-sm font-medium text-zinc-300">
                Formato
              </label>
              <Input
                id="format"
                name="format"
                defaultValue={item.format ?? ""}
                className="border-white/10 bg-zinc-950 text-white"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <label
                htmlFor="coverImageUrl"
                className="text-sm font-medium text-zinc-300"
              >
                Cover image URL
              </label>
              <Input
                id="coverImageUrl"
                name="coverImageUrl"
                defaultValue={item.cover_image_url ?? ""}
                className="border-white/10 bg-zinc-950 text-white"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="contentUrl" className="text-sm font-medium text-zinc-300">
                Content URL
              </label>
              <Input
                id="contentUrl"
                name="contentUrl"
                defaultValue={item.content_url ?? ""}
                className="border-white/10 bg-zinc-950 text-white"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="videoProvider" className="text-sm font-medium text-zinc-300">
                Proveedor de video
              </label>
              <select
                id="videoProvider"
                name="videoProvider"
                defaultValue={item.video_provider ?? ""}
                className="h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-white"
              >
                <option value="">Auto / ninguno</option>
                <option value="youtube">YouTube</option>
                <option value="mux">Mux</option>
                <option value="external">Externo</option>
              </select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="muxPlaybackId" className="text-sm font-medium text-zinc-300">
                Mux playback ID
              </label>
              <Input
                id="muxPlaybackId"
                name="muxPlaybackId"
                defaultValue={item.mux_playback_id ?? ""}
                className="border-white/10 bg-zinc-950 text-white"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="grid gap-2">
              <label
                htmlFor="durationSeconds"
                className="text-sm font-medium text-zinc-300"
              >
                Duración (segundos)
              </label>
              <Input
                id="durationSeconds"
                name="durationSeconds"
                type="number"
                min="0"
                step="1"
                defaultValue={item.duration_seconds ?? ""}
                className="border-white/10 bg-zinc-950 text-white"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="pageCount" className="text-sm font-medium text-zinc-300">
                Páginas
              </label>
              <Input
                id="pageCount"
                name="pageCount"
                type="number"
                min="0"
                step="1"
                defaultValue={item.page_count ?? ""}
                className="border-white/10 bg-zinc-950 text-white"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="displayOrder"
                className="text-sm font-medium text-zinc-300"
              >
                Orden
              </label>
              <Input
                id="displayOrder"
                name="displayOrder"
                type="number"
                min="0"
                step="1"
                defaultValue={item.display_order}
                className="border-white/10 bg-zinc-950 text-white"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-2">
            <label
              htmlFor="isFeatured"
              className="flex items-center gap-2 text-sm text-zinc-300"
            >
              <input
                id="isFeatured"
                type="checkbox"
                name="isFeatured"
                defaultChecked={item.is_featured}
                className="h-4 w-4 rounded border-white/20 bg-zinc-950 accent-amber-400"
              />
              Destacado
            </label>

            <label
              htmlFor="isPublished"
              className="flex items-center gap-2 text-sm text-zinc-300"
            >
              <input
                id="isPublished"
                type="checkbox"
                name="isPublished"
                defaultChecked={item.is_published}
                className="h-4 w-4 rounded border-white/20 bg-zinc-950 accent-amber-400"
              />
              Publicado
            </label>
          </div>

          {state.error ? (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {state.error}
            </div>
          ) : null}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-amber-400 text-zinc-950 hover:bg-amber-300"
            >
              {isPending ? "Guardando cambios..." : "Guardar cambios"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}