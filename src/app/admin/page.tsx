import Link from "next/link";
import { redirect } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AdminSignOutButton } from "@/features/admin/components/AdminSignOutButton";
import { isAdminEmail } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: claimsData } = await supabase.auth.getClaims();

  const email =
    claimsData && typeof claimsData.claims.email === "string"
      ? claimsData.claims.email
      : null;

  if (!isAdminEmail(email)) {
    redirect("/admin/login");
  }

  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
              Admin dashboard
            </Badge>
            <h1 className="mt-4 text-4xl font-bold text-white">Panel admin</h1>
            <p className="mt-3 text-zinc-400">
              Bienvenido. Desde aquí vamos a gestionar contenidos y sponsors.
            </p>
          </div>

          <AdminSignOutButton />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card className="border-white/10 bg-zinc-900/70">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-white">Contenidos</h2>
              <p className="mt-3 text-zinc-400">
                Alta inicial y listado de contenidos publicados o borradores.
              </p>

              <div className="mt-4">
                <Button asChild variant="outline">
                  <Link href="/admin/content">Ir a contenidos</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-zinc-900/70">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-white">Sponsors</h2>
              <p className="mt-3 text-zinc-400">
                Próximo paso: alta, edición y activación de sponsors.
              </p>

              <div className="mt-4">
                <Button asChild variant="outline">
                  <Link href="/admin/sponsors">Ir a sponsors</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}