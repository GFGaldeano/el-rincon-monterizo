"use client";

import { useActionState } from "react";

import { deleteContentAction } from "@/features/admin/actions/content.actions";
import { Button } from "@/components/ui/button";

type DeleteContentButtonProps = {
  id: string;
  title: string;
};

const initialState = {
  error: "",
};

export function DeleteContentButton({
  id,
  title,
}: DeleteContentButtonProps) {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: typeof initialState, formData: FormData) => {
      try {
        await deleteContentAction(formData);
        return { error: "" };
      } catch (error) {
        return {
          error:
            error instanceof Error
              ? error.message
              : "No se pudo eliminar el contenido.",
        };
      }
    },
    initialState
  );

  return (
    <form
      action={formAction}
      className="flex flex-col gap-2"
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `¿Seguro que querés eliminar "${title}"? Esta acción no se puede deshacer.`
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />

      <Button type="submit" variant="destructive" disabled={isPending}>
        {isPending ? "Eliminando..." : "Eliminar"}
      </Button>

      {state.error ? (
        <p className="text-xs text-red-300">{state.error}</p>
      ) : null}
    </form>
  );
}