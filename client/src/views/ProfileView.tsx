import { useForm } from "react-hook-form";
import { ErrorMessage } from "../components/ErrorMessage";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { ProfileForm, UserDataT } from "../types";
import { updateProfile, uploadImage } from "../api/TapBioApi";
import { toast } from "sonner";


export function ProfileView() {
//Como ya usamos useQuery y en AppLayout useQuery con un queryKey['user'] este ya tiene los datos cachados, y como aqui necesitamos usar data, isError etc. No es necesario duplicar el código de ese useQuery, react-query nos da "useQueryClient" con muchas configuraciones incluyendo la info que ya cachamos en el AppLayout, se usa el metodo "getQueryData" que nos permite acceder a los datos que estan en cache, y se le pasa el "queryKey" al que quieres acceder

const queryClient = useQueryClient()
const data : UserDataT = queryClient.getQueryData(['user'])!

//console.log(data);


//Descripcion podemos o no que sea obligatoria,
// se coloca optionalChaining en automatico ya que pues depende de si la informacion ya llego o no, y te dice este valor puede ser string o undefined, entonces lo toma como opcional
        const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
            name: data?.name,
            handle: data?.handle,
            description: data?.description
        }})

//Usamos useMutation de tanstackQuery, este se usa a la hora de modificar como con UPDATE o PATCH
//mutation maneja dentro sus propios errores y succes
//como en updateProfile estamos retornando "data" este se pasa en automatico aqui

const updateProfileMutation = useMutation({
//Le indicamos la funcion que queremos ejecutar
    mutationFn: updateProfile,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
//Usamos Query invalidation, para actualizar el cache manualmente, si alguien edita su información, este borrara el cache y actualizara los datos nuevos, asi no tenemos que recargar la pagina para ver los cambios, si no que descarga nuevamente la info del usuario
        toast.success(data)
        queryClient.invalidateQueries({queryKey: ['user']})

    }
})


const uploadImageMutation = useMutation({
//Le indicamos la funcion que queremos ejecutar
    mutationFn: uploadImage,
    onError: (error) => {
        toast.error(error.message)

    },
    onSuccess: (data) => {
        //console.log(data);
//Opción 2: Actualizar el cache directamente, Aquí no hace ninguna petición. Simplemente React Query actualiza el estado local.
        queryClient.setQueryData(['user'], (prevData: UserDataT) => {
            return {
                ...prevData,
                image: data.image
            }
        })

        //queryClient.invalidateQueries({queryKey: ['user']})


    }
})

const handleChange = (e:  React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
//entramos a "files" del input ahi esta la info que queremos mandar al backend
    if (e.target.files) {

        uploadImageMutation.mutate(e.target.files[0])
    }

 }

//formData solo actualiza solo descripcition y handle pero podemos obtener toda la instancia de "user" para actualizar esos datos que necesitamos "description" y "handle"
const handleUserProfileProps = (formData: ProfileForm) => {
    const user : UserDataT = queryClient.getQueryData(['user'])!
    user.name = formData.name
    user.description = formData.description
    user.handle = formData.handle
    console.log(user);
    //console.log(formData);


//En mutate colocas tus variables que vas a enviar para realizar el cambio, en este caso es handle, description y name
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
      {/* Encabezado */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Mi Perfil
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Personaliza la información que verán los visitantes.
        </p>
      </div>

      {/* Imagen */}
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

       {/* Nombre */}
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


      {/* Handle */}
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

      {/* Descripción */}
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
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-slate-200
            px-4
            py-3
            text-slate-800
            placeholder-slate-400
            outline-none
            transition
            focus:border-blue-500
          "
             {...register('description')}
        />
      </div>


      {/* Botón */}
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
