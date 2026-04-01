export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold text-white">El Rincón Monterizo</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
            Plataforma digital on-demand orientada a contenidos educativos,
            culturales y audiovisuales, con identidad local y visión de crecimiento.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
            Secciones
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li>Biblioteca digital</li>
            <li>Videos on-demand</li>
            <li>Contenido cultural</li>
            <li>Sponsors locales</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
            Estado del proyecto
          </h4>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Primera etapa de construcción: base visual, arquitectura y preparación
            para contenidos, publicidad local y administración.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} El Rincón Monterizo. Todos los derechos reservados.
      </div>
    </footer>
  );
}