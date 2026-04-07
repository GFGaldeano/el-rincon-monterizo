import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateSponsorForm } from "@/features/admin/components/sponsors/CreateSponsorForm";

export default function AdminNewSponsorPage() {
  return (
    <section className="py-16">
      <Container>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
              Admin · Sponsors
            </Badge>
            <h1 className="mt-4 text-4xl font-bold text-white">
              Crear nuevo sponsor
            </h1>
            <p className="mt-3 text-zinc-400">
              Completá los datos base para registrar un sponsor.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/admin/sponsors">Volver al listado</Link>
          </Button>
        </div>

        <CreateSponsorForm />
      </Container>
    </section>
  );
}