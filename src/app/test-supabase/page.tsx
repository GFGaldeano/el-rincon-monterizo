import { createClient } from "@/lib/supabase/server";

export default async function TestSupabasePage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content")
    .select("id, slug, title, category, is_published, display_order")
    .order("display_order", { ascending: true });

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-white">
      <h1 className="text-3xl font-bold">Prueba de lectura con Supabase</h1>

      {error ? (
        <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
          <p className="font-semibold">Error al leer Supabase</p>
          <pre className="mt-3 overflow-x-auto text-sm text-red-200">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
          <p className="mb-4 text-sm text-zinc-400">
            Filas encontradas: {data?.length ?? 0}
          </p>

          <pre className="overflow-x-auto text-sm text-zinc-200">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}