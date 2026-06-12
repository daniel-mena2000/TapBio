import { Link } from "react-router";

export function HomeView() {
  return (
    <section className="min-h-[80vh] grid md:grid-cols-2 items-center gap-10">
      <div>
        <img
          src="/preview.png"
          alt="Vista previa TapBio"
          className="w-full max-w-md mx-auto"
        />
      </div>

      <div className="space-y-6">
        <h1 className="text-5xl font-black">
          Comparte todos tus enlaces en un solo lugar
        </h1>

        <p className="text-lg text-gray-500">
          Crea tu perfil profesional y comparte redes sociales,
          proyectos, GitHub y mucho más.
        </p>

        <div className="flex gap-4">
            
          <Link
            to="/auth/register"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white"
          >
            Crear cuenta
          </Link>

          <Link
            to="/auth/login"
            className="px-6 py-3 rounded-lg border"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </section>
  );
}
