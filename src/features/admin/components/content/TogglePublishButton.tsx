"use client";

import { useActionState } from "react";

import { togglePublishContentAction } from "@/features/admin/actions/content.actions";
import { Button } from "@/components/ui/button";

type TogglePublishButtonProps = {
  id: string;
  isPublished: boolean;
};

const initialState = {
  error: "",
};

export function TogglePublishButton({
  id,
  isPublished,
}: TogglePublishButtonProps) {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: typeof initialState, formData: FormData) => {
      try {
        await togglePublishContentAction(formData);
        return { error: "" };
      } catch (error) {
        return {
          error:
            error instanceof Error
              ? error.message
              : "No se pudo cambiar el estado de publicación.",
        };
      }
    },
    initialState
  );

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="id" value={id} />
      <input
        type="hidden"
        name="nextPublished"
        value={isPublished ? "false" : "true"}
      />

      <Button type="submit" variant="outline" disabled={isPending}>
        {isPending
          ? "Guardando..."
          : isPublished
          ? "Despublicar"
          : "Publicar"}
      </Button>

      {state.error ? (
        <p className="text-xs text-red-300">{state.error}</p>
      ) : null}
    </form>
  );
}