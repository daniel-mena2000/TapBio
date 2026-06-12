import { Toaster } from "sonner";
import { Link, Outlet } from "react-router";
import NavigationTabs from "../components/NavigationTabs";
import type { UserDataT } from "../types";

type TapBioProps = {
    data: UserDataT
}

export function TapBio({data}: TapBioProps) {
return <>
<div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 h-20 flex items-center justify-between">
            <img
              src="/logoTapBioA.png"
              alt="TapBio"
              className="h-12"
            />

            <button
              className="
                rounded-xl
                px-4
                py-2
                text-sm
                font-medium
                text-slate-600
                hover:bg-slate-100
                hover:text-blue-500
                transition
                cursor-pointer
              "
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* Contenido */}
        <main className="mx-auto max-w-6xl px-6 py-10">
          <NavigationTabs />

          <div className="flex justify-end mb-8">
            <Link
              to=""
              target="_blank"
              rel="noreferrer noopener"
              className="
                text-sm
                font-medium
                text-blue-600
                hover:text-blue-700
              "
            >
              Ver mi perfil →
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* Formulario */}
            <div
              className="
                rounded-3xl
                bg-white
                p-8
                shadow-sm
                border
                border-slate-200
              "
            >
              <Outlet />
            </div>

            {/* Preview */}
            <aside
              className="
                rounded-3xl
                bg-white
                p-6
                shadow-sm
                border
                border-slate-200
              "
            >
              <h3 className="font-semibold text-slate-800">
                Vista previa
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Así verán tu perfil los visitantes.
              </p>
            </aside>
          </div>
        </main>
      </div>

      <Toaster position="top-right" />
    </>
}
