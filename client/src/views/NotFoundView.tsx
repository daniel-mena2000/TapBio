import { Link } from "react-router";

export default function NotFoundView() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="space-y-6">
        <span className="text-8xl font-black text-blue-500">404</span>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">
            Perfil no encontrado
          </h1>

          <p className="mx-auto max-w-md text-slate-500">
            El perfil que estás buscando no existe, fue eliminado o el enlace
            es incorrecto.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="rounded-xl bg-blue-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
