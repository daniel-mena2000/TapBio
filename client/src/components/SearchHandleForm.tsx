import { useForm } from "react-hook-form";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ErrorMessage } from "./ErrorMessage";
import slug from "slug";
import { useMutation } from "@tanstack/react-query";
import { searchByHandle } from "../api/TapBioApi";
import { Link } from "react-router";

type SearchHandleForm = {
  handle: string;
};
export default function SearchHandleForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      handle: "",
    },
  });

//Mutation tiene toda la informacion disponible de si esta o no disponible en handle
  const mutation = useMutation({
        mutationFn: searchByHandle
  })
 
 const handle = watch("handle");
  const slugHandle = `@${slug(handle, "_")}`;

  const handleSearch = () => {
    mutation.mutate(slugHandle)
  };



  return (

    <form
  onSubmit={handleSubmit(handleSearch)}
  className="mx-auto mt-12 w-full max-w-2xl"
>
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl transition-all duration-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

    <div className="flex items-center">

      <span className="border-r border-slate-200 px-5 text-lg font-semibold text-slate-400">
        tapBio.com/@
      </span>

      <input
        id="handle"
        type="text"
        placeholder="daniel_mena"
        className="flex-1 bg-transparent px-5 py-5 text-lg text-slate-700 placeholder:text-slate-400 focus:outline-none"
        {...register("handle", {
          required: "Ingresa un nombre de usuario",
        })}
      />

      <button
        type="submit"
        disabled={mutation.isPending}
        className="mr-2 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <MagnifyingGlassIcon className="h-6 w-6" />
      </button>

    </div>

  </div>

  {errors.handle && (
    <div className="mt-3">
      <ErrorMessage>{errors.handle.message}</ErrorMessage>
    </div>
  )}

  <p className="mt-4 text-center text-sm text-slate-500">
Verifica la disponibilidad de tu nombre de usuario antes de crear tu cuenta.  </p>

  <div className="mt-6 min-h-17.5">

    {mutation.isPending && (
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center">
        <p className="font-medium text-blue-600">
          🔍 Buscando perfil...
        </p>
      </div>
    )}

    {mutation.isError && (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
        <p className="font-semibold text-red-600">
          ❌ {mutation.error.message}
        </p>
      </div>
    )}

    {mutation.data && (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
        <p className="font-semibold text-emerald-700">
          🎉 {mutation.data}
        </p>

        <Link
          to="/auth/register"
          className="mt-3 inline-flex rounded-lg bg-emerald-600 px-5 py-2 font-semibold text-white transition hover:bg-emerald-700" state={{handle: slugHandle}}
        >
          Crear una cuenta
        </Link>
      </div>
    )}

  </div>
</form>
  );
}
