import Link from "next/link";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Biblioteca", href: "/biblioteca" },
  { label: "Videos", href: "/videos" },
  { label: "Cultura", href: "/cultura" },
  { label: "Sponsors", href: "/sponsors" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 font-bold text-zinc-950">
            ER
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-300">Plataforma on-demand</p>
            <h1 className="text-lg font-bold text-white">El Rincón Monterizo</h1>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <button className="rounded-full border border-amber-400/40 px-4 py-2 text-sm font-semibold text-amber-300 transition hover:bg-amber-400/10">
            Comunidad local
          </button>
        </div>
      </div>
    </header>
  );
}