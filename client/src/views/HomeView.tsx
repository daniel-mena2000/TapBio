import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import SearchHandleForm from "../components/SearchHandleForm";

export function HomeView() {
  return (
<>
<div className="relative flex justify-center flex-col items-center bg-slate-950 h-full">

      <div className="m-8 flex flex-wrap justify-center gap-5">
          <Link
            to="/auth/register"
            className="group inline-flex items-center gap-2 rounded-xl bg-blue-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-xl"
          >
            Crear cuenta

            <ArrowRightIcon className="h-5 w-5 transition group-hover:translate-x-1" />
          </Link>

          <Link
            to="/auth/login"
            className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition-all duration-300 hover:border-blue-500 hover:text-blue-500"
          >
            Iniciar sesión
          </Link>

        </div>

 <img
    src="/preview.png"
    alt="Vista previa TapBio"
    className="w-full max-w-md rounded-3xl border border-slate-200 shadow-2xl"
  />

   <div className="mt-5 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="h-5 w-5 text-blue-500" />
            <span className="text-slate-600">
              Perfil personalizable
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircleIcon className="h-5 w-5 text-blue-500" />
            <span className="text-slate-600">
              Redes sociales
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircleIcon className="h-5 w-5 text-blue-500" />
            <span className="text-slate-600">
              Fácil de compartir
            </span>
          </div>
        </div>


</div>
      <div className="max-w-3xl text-center">
        <img className="w-xs mx-auto" src="logoTapBio.png" alt="" />
        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
          🚀 Tu presencia digital en un solo lugar
        </span>

        <h1 className="mt-8 text-5xl font-black leading-tight text-slate-900 lg:text-6xl">
          Comparte todos tus{" "}
          <span className="text-blue-500">
            enlaces
          </span>{" "}
          desde una sola página.
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-500">
          Diseña un perfil elegante para compartir tus redes sociales,
          GitHub, Instagram, TikTok y cualquier enlace importante.
          Todo organizado en un solo lugar.
        </p>

          <div className="mt-10">

            
    <SearchHandleForm />
  </div>


      </div>



</>
  );
}
