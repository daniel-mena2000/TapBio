import { Toaster } from "sonner";
import { Link, Outlet } from "react-router";
import NavigationTabs from "../components/NavigationTabs";
import type { SocialNetwork, UserDataT } from "../types";
import { useEffect, useState } from "react";
import { TapBioLinks } from "./TapBioLinks";

type TapBioProps = {
    data: UserDataT
}

export function TapBio({data}: TapBioProps) {

//Si queremos colocar un red social en el perfil verificamos cuales estan como enabled
    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((item: SocialNetwork)  => item.enabled))

//UseEffect para que cada que habilite o deshabilite un link este se vea reflejado en la interfaz dependiendo si esta activo o no
    useEffect(()=> {
        setEnabledLinks(JSON.parse(data.links).filter((item: SocialNetwork)  => item.enabled))
    },[data])

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

              <div className="mt-10">
                    <p className="text-4xl text-center p-2">{data.name}</p>
                    <span className="text-xs text-gray-400 text-center block w-full p-2">{data.handle}</span>
                    {data.image ?
                        <img src={data.image} alt="Imagen perfil" className="mx-auto max-w-['250px']"/>
                        :
                        <img src="https://res.cloudinary.com/dw0gkpu7i/image/upload/q_auto/f_auto/v1781383771/ubyfrxropymb5wtp7mtd.png" alt="" />
                    }

                    <p className="text-center text-lg font-black p-2">{data.description}</p>

                    <div className="mt-20 flex flex-col gap-5">
                        {enabledLinks.map(item => (
                            <TapBioLinks key={item.name} item={item}/>
                        ))}

                    </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      <Toaster position="top-right" />
    </>
}
