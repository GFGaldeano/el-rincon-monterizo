"use client";

import { useActionState } from "react";

import { toggleSponsorActiveAction } from "@/features/admin/actions/sponsor.actions";
import { Button } from "@/components/ui/button";
import { isNextRedirectError } from "@/lib/is-next-redirect-error";

type ToggleSponsorActiveButtonProps = {
  id: string;
  isActive: boolean;
};

const initialState = {
  error: "",
};

export function ToggleSponsorActiveButton({
  id,
  isActive,
}: ToggleSponsorActiveButtonProps) {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: typeof initialState, formData: FormData) => {
      try {
        await toggleSponsorActiveAction(formData);
        return { error: "" };
      } catch (error) {
        if (isNextRedirectError(error)) {
          throw error;
        }

        return {
          error:
            error instanceof Error
              ? error.message
              : "No se pudo cambiar el estado del sponsor.",
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
        name="nextActive"
        value={isActive ? "false" : "true"}
      />

      <Button type="submit" variant="outline" disabled={isPending}>
        {isPending ? "Guardando..." : isActive ? "Desactivar" : "Activar"}
      </Button>

      {state.error ? (
        <p className="text-xs text-red-300">{state.error}</p>
      ) : null}
    </form>
  );
}