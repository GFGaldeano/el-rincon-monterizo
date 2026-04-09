"use client";

import { useActionState } from "react";

import { toggleTrashSponsorAction } from "@/features/admin/actions/sponsor.actions";
import { Button } from "@/components/ui/button";

type DeleteSponsorButtonProps = {
  id: string;
  name: string;
  deletedAt: string | null;
};

const initialState = {
  error: "",
};

export function DeleteSponsorButton({
  id,
  name,
  deletedAt,
}: DeleteSponsorButtonProps) {
  const isDeleted = Boolean(deletedAt);

  const [state, formAction, isPending] = useActionState(
    async (_prevState: typeof initialState, formData: FormData) => {
      try {
        await toggleTrashSponsorAction(formData);
        return { error: "" };
      } catch (error) {
        return {
          error:
            error instanceof Error
              ? error.message
              : "No se pudo actualizar el estado del sponsor.",
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
        if (isDeleted) return;

        const confirmed = window.confirm(
          `¿Seguro que querés mover "${name}" a la papelera?`
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="nextDeleted" value={isDeleted ? "false" : "true"} />

      <Button type="submit" variant={isDeleted ? "outline" : "destructive"} disabled={isPending}>
        {isPending ? "Guardando..." : isDeleted ? "Restaurar" : "Mover a papelera"}
      </Button>

      {state.error ? (
        <p className="text-xs text-red-300">{state.error}</p>
      ) : null}
    </form>
  );
}