import type { SocialNetwork } from "../types"

type TapBioLinksProps = {
    item: SocialNetwork
}
//Este componente se renderiza en LinkTapBioView
export function TapBioLinks({item}: TapBioLinksProps) {
    return(
       <li className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

    <div
        className="h-12 w-12 rounded-xl bg-slate-100 bg-cover bg-center p-2 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundImage: `url('/social/${item.name}.svg')` }}
    />

    <div className="flex flex-col">
        <span className="text-xs uppercase tracking-wider text-slate-400">
            Sígueme en
        </span>

        <p className="text-lg font-semibold capitalize text-slate-800">
            {item.name}
        </p>
    </div>

</li>
    )
}
