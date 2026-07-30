import type { UserHandle, SocialNetwork } from "../types";

type HandleDataProfileProps = {
  data: UserHandle;
};

export default function HandleDataProfile({data,}: HandleDataProfileProps) {

  const links: SocialNetwork[] = JSON.parse(data.links);

  const DEFAULT_PROFILE_IMAGE =
  "https://res.cloudinary.com/dw0gkpu7i/image/upload/v1781383771/ubyfrxropymb5wtp7mtd.png";

  return (
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

      <div className="mt-10 flex w-full flex-col gap-4">
        {links
          .filter(link => link.enabled)
          .map(link => (
          <a href={link.url} target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
            >

    <div className="flex items-center gap-4">
        <div
            className="h-12 w-12 rounded-xl bg-slate-100 bg-center bg-no-repeat"
            style={{backgroundImage: `url('/social/${link.name}.svg')`, backgroundSize: "28px",}}
    />

    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-wider text-slate-400">
        Sígueme en
      </span>

      <span className="text-lg font-semibold capitalize text-slate-800">
        {link.name}
      </span>
    </div>
  </div>

        <span className="text-2xl font-light text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-500">
            →
        </span>
    </a>
          ))}
</div>


      <p className="mt-12 text-sm text-slate-400">
        Creado con{" "}
            <span className="font-semibold text-blue-500">
                TapBio
            </span>
      </p>

    </div>
  );
}
