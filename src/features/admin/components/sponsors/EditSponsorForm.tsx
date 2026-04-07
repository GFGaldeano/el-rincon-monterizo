"use client";

import { useActionState } from "react";

import { updateSponsorAction } from "@/features/admin/actions/sponsor.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type EditSponsorFormProps = {
  item: {
    id: string;
    name: string;
    slug: string;
    description: string;
    business_category: string;
    city: string;
    website_url: string | null;
    logo_url: string | null;
    level: "oro" | "plata" | "bronce" | "destacado";
    is_featured: boolean;
    is_active: boolean;
    display_order: number;
    start_date: string | null;
    end_date: string | null;
  };
};

const initialState = {
  error: "",
};

export function EditSponsorForm({ item }: EditSponsorFormProps) {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: typeof initialState, formData: FormData) => {
      try {
        await updateSponsorAction(formData);
        return { error: "" };
      } catch (error) {
        return {
          error:
            error instanceof Error
              ? error.message
              : "No se pudo actualizar el sponsor.",
        };
      }
    },
    initialState
  );

  return (
    <Card className="border-white/10 bg-zinc-900/70">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Editar sponsor</CardTitle>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="grid gap-5">
          <input type="hidden" name="id" value={item.id} />

          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium text-zinc-300">
              Nombre *
            </label>
            <Input
              id="name"
              name="name"
              required
              defaultValue={item.name}
              className="border-white/10 bg-zinc-950 text-white"
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
              className="border-white/10 bg-zinc-950 text-white"
            />
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-zinc-300"
            >
              Descripción *
            </label>
            <Textarea
              id="description"
              name="description"
              required
              rows={5}
              defaultValue={item.description}
              className="border-white/10 bg-zinc-950 text-white"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <label
                htmlFor="businessCategory"
                className="text-sm font-medium text-zinc-300"
              >
                Categoría de negocio *
              </label>
              <Input
                id="businessCategory"
                name="businessCategory"
                required
                defaultValue={item.business_category}
                className="border-white/10 bg-zinc-950 text-white"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="city" className="text-sm font-medium text-zinc-300">
                Ciudad *
              </label>
              <Input
                id="city"
                name="city"
                required
                defaultValue={item.city}
                className="border-white/10 bg-zinc-950 text-white"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="websiteUrl" className="text-sm font-medium text-zinc-300">
                Website URL
              </label>
              <Input
                id="websiteUrl"
                name="websiteUrl"
                defaultValue={item.website_url ?? ""}
                className="border-white/10 bg-zinc-950 text-white"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="logoUrl" className="text-sm font-medium text-zinc-300">
                Logo URL
              </label>
              <Input
                id="logoUrl"
                name="logoUrl"
                defaultValue={item.logo_url ?? ""}
                className="border-white/10 bg-zinc-950 text-white"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="grid gap-2">
              <label htmlFor="level" className="text-sm font-medium text-zinc-300">
                Nivel *
              </label>
              <select
                id="level"
                name="level"
                required
                defaultValue={item.level}
                className="h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-white"
              >
                <option value="oro">Oro</option>
                <option value="plata">Plata</option>
                <option value="bronce">Bronce</option>
                <option value="destacado">Destacado</option>
              </select>
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

            <div className="grid gap-2">
              <label
                htmlFor="startDate"
                className="text-sm font-medium text-zinc-300"
              >
                Fecha inicio
              </label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                defaultValue={item.start_date ?? ""}
                className="border-white/10 bg-zinc-950 text-white"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="endDate" className="text-sm font-medium text-zinc-300">
                Fecha fin
              </label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                defaultValue={item.end_date ?? ""}
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
              htmlFor="isActive"
              className="flex items-center gap-2 text-sm text-zinc-300"
            >
              <input
                id="isActive"
                type="checkbox"
                name="isActive"
                defaultChecked={item.is_active}
                className="h-4 w-4 rounded border-white/20 bg-zinc-950 accent-amber-400"
              />
              Activo
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