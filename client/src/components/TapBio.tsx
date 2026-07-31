import { Toaster } from "sonner";
import { Link, Outlet } from "react-router";
import NavigationTabs from "../components/NavigationTabs";
import type { SocialNetwork, UserDataT } from "../types";
import { useEffect, useState } from "react";
import { TapBioLinks } from "./TapBioLinks";
import HeaderComponent from "./HeaderComponent";

type TapBioProps = {
    data: UserDataT
}

export function TapBio({data}: TapBioProps) {

    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((item: SocialNetwork)  => item.enabled))


    useEffect(()=> {
        setEnabledLinks(JSON.parse(data.links).filter((item: SocialNetwork)  => item.enabled))
    },[data])

     const DEFAULT_PROFILE_IMAGE ="https://res.cloudinary.com/dw0gkpu7i/image/upload/v1781383771/ubyfrxropymb5wtp7mtd.png";

return <>
<div className="min-h-screen bg-slate-50">
      <HeaderComponent/>

        <main className="mx-auto max-w-6xl px-6 py-10">
          <NavigationTabs />

          <div className="flex justify-end mb-8">
            <Link
              to={`/${data.handle}`}
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

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">

              <Outlet />
            </div>

            <aside
              className=" rounded-3xl bg-white p-6 shadow-sm border border-slate-200">

              <h3 className="font-semibold text-slate-800">
                Vista previa
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Así verán tu perfil los visitantes.
              </p>


                <div className="mx-auto flex max-w-md flex-col items-center px-6 py-12">
                    <img src={data.image || DEFAULT_PROFILE_IMAGE}
                     alt={data.name}
                     className="h-32 w-32 rounded-full object-cover"
                    />

                    <div className="mt-6 text-center">
                        <h1 className="text-3xl font-bold text-slate-900">
                        {data.name}
                        </h1>

                        <p className="mt-1 text-blue-500 font-medium">
                        {data.handle}
                        </p>

                        <p className="mt-4 leading-relaxed text-slate-500">
                        {data.description}
                        </p>
                    </div>

                    <div className="mt-20 flex flex-col gap-5 w-full">
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
