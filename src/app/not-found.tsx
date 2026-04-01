import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="flex flex-col items-center text-center">
        <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-1 text-sm font-medium text-amber-300">
          Contenido no encontrado
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
          No pudimos encontrar esta página
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
          Es posible que el contenido no exista, haya sido removido o que la URL
          esté incorrecta.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild className="bg-amber-400 text-zinc-950 hover:bg-amber-300">
            <Link href="/">Volver al inicio</Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/biblioteca">Ir a biblioteca</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}