"use client";

import Image from "next/image";
import { useActionState, useState } from "react";

import { createSponsorAction } from "@/features/admin/actions/sponsor.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialState = {
  error: "",
};

export function CreateSponsorForm() {
  const [logoPreviewUrl, setLogoPreviewUrl] = useState("");

  const [state, formAction, isPending] = useActionState(
    async (_prevState: typeof initialState, formData: FormData) => {
      try {
        await createSponsorAction(formData);
        return { error: "" };
      } catch (error) {
        return {
          error:
            error instanceof Error
              ? error.message
              : "No se pudo crear el sponsor.",
        };
      }
    },
    initialState
  );

  return (
    <Card className="border-white/10 bg-zinc-900/70">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Nuevo sponsor</CardTitle>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="grid gap-5">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium text-zinc-300">
              Nombre *
            </label>
            <Input
              id="name"
              name="name"
              required
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
              placeholder="opcional-se-genera-automaticamente"
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
                value={logoPreviewUrl}
                onChange={(event) => setLogoPreviewUrl(event.target.value)}
                className="border-white/10 bg-zinc-950 text-white"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-zinc-300">
              Vista previa del logo
            </label>

            {logoPreviewUrl ? (
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-white">
                <Image
                  src={logoPreviewUrl}
                  alt="Vista previa del logo"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-zinc-950 text-xs text-zinc-500">
                Sin logo
              </div>
            )}
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
                defaultValue="plata"
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
                defaultValue="0"
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
                defaultChecked
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
              {isPending ? "Guardando..." : "Crear sponsor"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}