import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ContentCard } from "@/features/content/components/ContentCard";
import { SponsorCard } from "@/features/sponsors/components/SponsorCard";
import { sponsorItems } from "@/features/sponsors/data/sponsors.data";
import { getFeaturedPublishedContent } from "@/services/content.server";

const sponsorHighlights = [
  "Espacios publicitarios integrados con diseño limpio",
  "Sponsors locales con presencia destacada",
  "Modelo gratuito para usuarios en etapa inicial",
];

const featuredSponsors = sponsorItems.filter((item) => item.featured).slice(0, 3);

export default async function Home() {
  const { data: featuredContent, error } = await getFeaturedPublishedContent(3);

  return (
    <div className="bg-zinc-950">
      <section className="py-20">
        <Container className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
              Plataforma on-demand
            </Badge>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
              El Rincón Monterizo
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Un espacio digital para compartir contenido educativo, cultural y
              audiovisual, con foco en la comunidad, el acceso gratuito y una
              experiencia moderna.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300">
                Explorar contenido
              </Button>
              <Button variant="outline">Ver sponsors</Button>
            </div>
          </div>

          <Card className="border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950">
            <CardHeader>
              <Badge className="w-fit bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
                Visión del proyecto
              </Badge>
              <CardTitle className="mt-3 text-2xl text-white">
                Educación, cultura y contenido audiovisual en un solo lugar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-zinc-300">
                El objetivo es construir una plataforma clara, escalable y útil,
                donde la experiencia del usuario conviva con oportunidades de
                difusión para anunciantes locales.
              </p>
            </CardContent>
          </Card>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-2xl">
            <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
              Contenido destacado
            </Badge>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Primeros recursos y materiales de la plataforma
            </h2>
          </div>

          {error ? (
            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              No se pudo cargar el contenido destacado desde Supabase: {error}
            </div>
          ) : null}

          {featuredContent.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {featuredContent.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 text-zinc-400">
              Aún no hay contenido destacado publicado.
            </div>
          )}
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Card className="border-white/10 bg-zinc-900/50">
            <CardContent className="grid gap-10 p-8 md:grid-cols-2 md:items-center md:p-10">
              <div>
                <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
                  Monetización inicial
                </Badge>
                <h2 className="mt-4 text-3xl font-bold text-white">
                  Publicidad local integrada de forma limpia
                </h2>
                <p className="mt-4 leading-7 text-zinc-400">
                  El proyecto será gratuito para los usuarios y se financiará
                  inicialmente mediante sponsors y espacios publicitarios locales,
                  cuidando siempre la experiencia visual y la claridad del contenido.
                </p>
              </div>

              <div className="space-y-4">
                {sponsorHighlights.map((item, index) => (
                  <div key={item}>
                    <div className="rounded-2xl bg-zinc-950/60 px-5 py-4 text-zinc-300">
                      {item}
                    </div>
                    {index < sponsorHighlights.length - 1 && (
                      <Separator className="mt-4 bg-white/10" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-2xl">
            <Badge className="bg-amber-400/15 text-amber-300 hover:bg-amber-400/15">
              Sponsors destacados
            </Badge>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Marcas e instituciones que acompañan el proyecto
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredSponsors.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}