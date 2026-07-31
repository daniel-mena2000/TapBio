import type { SocialNetwork } from "../types";

type TapBioLinksProps = {
  item: SocialNetwork;
};

export function TapBioLinks({ item }: TapBioLinksProps) {
  return (
    <li className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg">

      <div className="flex items-center gap-4">

        <div
          className="h-12 w-12 rounded-xl bg-slate-100 bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundImage: `url('/social/${item.name}.svg')`,
            backgroundSize: "28px",
          }}
        />

        <div className="flex flex-col">

          <span className="text-xs uppercase tracking-wider text-slate-400">
            Sígueme en
          </span>

          <span className="text-lg font-semibold capitalize text-slate-800">
            {item.name}
          </span>

        </div>

      </div>

      <span className="text-2xl font-light text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-500">
        →
      </span>

    </li>
  );
}
