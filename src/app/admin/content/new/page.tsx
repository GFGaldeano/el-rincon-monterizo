import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateContentForm } from "@/features/admin/components/content/CreateContentForm";

export default function AdminNewContentPage() {
  return (
    <section className="py-16">
      <Container>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
              Admin · Contenidos
            </Badge>
            <h1 className="mt-4 text-4xl font-bold text-white">
              Crear nuevo contenido
            </h1>
            <p className="mt-3 text-zinc-400">
              Completá los datos base para publicar un nuevo recurso.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/admin/content">Volver al listado</Link>
          </Button>
        </div>

        <CreateContentForm />
      </Container>
    </section>
  );
}