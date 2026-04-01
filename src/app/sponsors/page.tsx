import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SponsorCard } from "@/features/sponsors/components/SponsorCard";
import { getActiveSponsors, getFeaturedActiveSponsors } from "@/services/sponsors.server";

export default async function SponsorsPage() {
  const { data: sponsors, error } = await getActiveSponsors();
  const { data: featuredSponsors } = await getFeaturedActiveSponsors(3);

  return (
    <section className="py-16">
      <Container>
        <div className="max-w-3xl">
          <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
            Sponsors y anunciantes locales
          </Badge>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Espacios de difusión para marcas, instituciones y comercios locales
          </h1>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            El Rincón Monterizo se financiará inicialmente a través de sponsors y
            publicidad local integrada de manera limpia, priorizando siempre una
            experiencia visual clara y profesional.
          </p>
        </div>

        <Card className="mt-10 border-white/10 bg-zinc-900/50">
          <CardContent className="grid gap-6 p-8 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Sponsor local
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Espacios pensados para instituciones, comercios y proyectos de la región.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Publicidad limpia
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Integración visual coherente, sin saturar ni dañar la experiencia.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Alcance comunitario
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Difusión dentro de una plataforma con foco en cultura, educación y comunidad.
              </p>
            </div>
          </CardContent>
        </Card>

        {error ? (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
            No se pudieron cargar los sponsors desde Supabase: {error}
          </div>
        ) : null}

        {featuredSponsors.length > 0 && (
          <div className="mt-16">
            <div className="max-w-2xl">
              <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
                Sponsors destacados
              </Badge>
              <h2 className="mt-4 text-3xl font-bold text-white">
                Primeros aliados del proyecto
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {featuredSponsors.map((sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-16">
          <div className="max-w-2xl">
            <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
              Todos los sponsors
            </Badge>
            <h2 className="mt-4 text-3xl font-bold text-white">
              Red de anunciantes y espacios promocionales
            </h2>
          </div>

          {sponsors.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {sponsors.map((sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 text-zinc-400">
              Aún no hay sponsors activos publicados.
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}