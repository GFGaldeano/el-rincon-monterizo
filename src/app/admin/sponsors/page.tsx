import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";

export default function AdminSponsorsPage() {
  return (
    <section className="py-16">
      <Container>
        <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
          Admin · Sponsors
        </Badge>

        <h1 className="mt-4 text-4xl font-bold text-white">
          Gestión de sponsors
        </h1>

        <p className="mt-4 max-w-2xl text-zinc-400">
          Próximamente podrás crear, editar y administrar sponsors desde este panel.
        </p>
      </Container>
    </section>
  );
}