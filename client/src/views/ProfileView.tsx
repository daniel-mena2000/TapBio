import { useForm } from "react-hook-form";
import { ErrorMessage } from "../components/ErrorMessage";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { ProfileForm, UserDataT } from "../types";
import { updateProfile, uploadImage } from "../api/TapBioApi";
import { toast } from "sonner";


export function ProfileView() {

const queryClient = useQueryClient()
const data : UserDataT = queryClient.getQueryData(['user'])!


        const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
            name: data?.name,
            handle: data?.handle,
            description: data?.description
        }})



const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data)
        queryClient.invalidateQueries({queryKey: ['user']})

    }
})


const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
        toast.error(error.message)

    },
    onSuccess: (data) => {
        queryClient.setQueryData(['user'], (prevData: UserDataT) => {
            return {
                ...prevData,
                image: data.image
            }
        })
    }
})

const handleChange = (e:  React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    if (e.target.files) {
        uploadImageMutation.mutate(e.target.files[0])
    }

 }

const handleUserProfileProps = (formData: ProfileForm) => {
    const user : UserDataT = queryClient.getQueryData(['user'])!
    user.name = formData.name
    user.description = formData.description
    user.handle = formData.handle
    console.log(user);



    updateProfileMutation.mutate(user)
        queryClient.invalidateQueries({queryKey: ['user']})

}
  const DEFAULT_PROFILE_IMAGE =
  "https://res.cloudinary.com/dw0gkpu7i/image/upload/v1781383771/ubyfrxropymb5wtp7mtd.png"

  return (
    <form
      className="space-y-8"
      onSubmit={handleSubmit(handleUserProfileProps)}
    >

      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Mi Perfil
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Personaliza la información que verán los visitantes.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <img
          src={DEFAULT_PROFILE_IMAGE}
          alt="Avatar"
          className="h-28 w-28 rounded-full object-cover border-4 border-slate-100"
        />

        <label htmlFor="image" className=" cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
          Cambiar imagen
        </label>

        <input
          id="image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>


      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700">
          Nombre
        </label>

        <input
          id="name"
          type="text"
          placeholder="Daniel"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500"
          {...register('name', {
            required: "El nombre de Usuario es obligatorio"
          })}
        />
      </div>
    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}


      <div className="space-y-2">
        <label
          htmlFor="handle"
          className="block text-sm font-medium text-slate-700"
        >
          Handle
        </label>

        <input
          id="handle"
          type="text"
          placeholder="@daniel_mena"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500"
          {...register('handle', {
            required: "El handle de Usuario es obligatorio"
          })}
        />
      </div>
      {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-slate-700"
        >
          Descripción
        </label>

        <textarea
          id="description"
          rows={4}
          placeholder="Desarrollador Frontend especializado en React y TypeScript..."
          className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500"
             {...register('description')}
        />
      </div>


      <button
        type="submit"
        className="
         w-full rounded-2xl bg-blue-500 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-xl active:translate-y-0 cursor-pointer
        "
      >
        Guardar cambios
      </button>
    </form>
  );
}
