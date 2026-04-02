import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { AdminLoginForm } from "@/features/admin/components/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <section className="py-20">
      <Container className="flex flex-col items-center">
        <div className="mb-8 max-w-2xl text-center">
          <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
            Panel administrativo
          </Badge>

          <h1 className="mt-4 text-4xl font-bold text-white">
            Acceso de administración
          </h1>

          <p className="mt-4 text-zinc-400">
            Ingresá con una cuenta autorizada para gestionar contenidos y sponsors.
          </p>
        </div>

        <AdminLoginForm />
      </Container>
    </section>
  );
}