import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SponsorItem, SponsorLevel } from "@/features/sponsors/types/sponsor";

type SponsorCardProps = {
  sponsor: SponsorItem;
};

const levelLabelMap: Record<SponsorLevel, string> = {
  oro: "Sponsor Oro",
  plata: "Sponsor Plata",
  bronce: "Sponsor Bronce",
  destacado: "Sponsor Destacado",
};

const levelStyleMap: Record<SponsorLevel, string> = {
  oro: "bg-amber-400/15 text-amber-300 hover:bg-amber-400/15",
  plata: "bg-slate-300/10 text-slate-200 hover:bg-slate-300/10",
  bronce: "bg-orange-400/15 text-orange-300 hover:bg-orange-400/15",
  destacado: "bg-sky-400/15 text-sky-300 hover:bg-sky-400/15",
};

export function SponsorCard({ sponsor }: SponsorCardProps) {
  return (
    <Card className="border-white/10 bg-zinc-900/70">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-lg font-bold text-white">
            {sponsor.name.slice(0, 2).toUpperCase()}
          </div>

          <Badge className={levelStyleMap[sponsor.level]}>
            {levelLabelMap[sponsor.level]}
          </Badge>
        </div>

        <CardTitle className="mt-4 text-xl text-white">{sponsor.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm leading-6 text-zinc-400">{sponsor.description}</p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{sponsor.category}</Badge>
          <Badge variant="secondary">{sponsor.city}</Badge>
        </div>
      </CardContent>

      <CardFooter>
        {sponsor.websiteUrl ? (
          <Button asChild variant="outline">
            <a
              href={sponsor.websiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visitar sponsor
            </a>
          </Button>
        ) : (
          <Button variant="outline" disabled>
            Próximamente
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}