"use client";

import { useActionState } from "react";

import { deleteSponsorAction } from "@/features/admin/actions/sponsor.actions";
import { Button } from "@/components/ui/button";

type DeleteSponsorButtonProps = {
  id: string;
  name: string;
};

const initialState = {
  error: "",
};

export function DeleteSponsorButton({
  id,
  name,
}: DeleteSponsorButtonProps) {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: typeof initialState, formData: FormData) => {
      try {
        await deleteSponsorAction(formData);
        return { error: "" };
      } catch (error) {
        return {
          error:
            error instanceof Error
              ? error.message
              : "No se pudo eliminar el sponsor.",
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
          `¿Seguro que querés eliminar "${name}"? Esta acción no se puede deshacer.`
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