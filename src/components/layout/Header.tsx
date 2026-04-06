"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/biblioteca", label: "Biblioteca" },
  { href: "/videos", label: "Videos" },
  { href: "/cultura", label: "Cultura" },
  { href: "/sponsors", label: "Sponsors" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 font-bold text-zinc-950">
            ERM
          </div>

          <div className="flex flex-col">
            <span className="w-fit rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-zinc-300">
              Plataforma on-demand
            </span>
            <span className="text-lg font-bold text-white">
              El Rincón Monterizo
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${
                  active ? "text-amber-300" : "text-zinc-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button
            variant="outline"
            className="border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10 hover:text-white"
          >
            Comunidad local
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                aria-label="Abrir menú"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              aria-describedby={undefined}
              className="border-white/10 bg-zinc-950 text-white"
            >
              <SheetTitle className="sr-only">Menú principal</SheetTitle>

              <div className="mt-8 flex flex-col gap-6">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 font-bold text-zinc-950">
                      ERM
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">
                        El Rincón Monterizo
                      </span>
                      <span className="text-xs text-zinc-400">
                        Plataforma on-demand
                      </span>
                    </div>
                  </Link>
                </SheetClose>

                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => {
                    const active = isActive(pathname, item.href);

                    return (
                      <SheetClose key={item.href} asChild>
                        <Link
                          href={item.href}
                          className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                            active
                              ? "bg-amber-400/10 text-amber-300"
                              : "text-zinc-300 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>

                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className="mt-2 border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10 hover:text-white"
                  >
                    Comunidad local
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}