import {useForm } from "react-hook-form"
import {isAxiosError} from "axios"
import { toast } from "sonner" //Mandamos llamar el componente de toast
import { Link, useLocation, useNavigate } from "react-router"
import type { RegisterForm } from "../types"
import { ErrorMessage } from "../components/ErrorMessage"
import api from "../config/axios"
import Logo from "../components/Logo"

export function RegisterView() {

//Mandamos llamar location ya que queremos el state del Link Crear cuenta de "SearchHadleForm" y se lo pasamos a initialValues, si es que le estamos pasando location, si no pues lo dejamos vacio. Para asi llenar en automatico el input con ese handle, los ponemos opcionales, si no la pagina de resgitrarse nos dara error, ya que serian obligatorio un handle de primera entrada a la ruta.
const location = useLocation()
//console.log(location.state.handle);

const navigate = useNavigate()

//Estos valores los pasaremos como valores iniciales de nuestro formulario, useForm tiene un metodo para agregarlos
    const initialValues: RegisterForm = {
        name: '', email: '', handle: location?.state?.handle || '', password: '', confirmPassword: ''
    }

    const {register, watch, reset, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})
//Verificamos que las 2 contraseñas de los inputs coincidan, sacamos el valor del input de password, lo asiganamos a una variable, y en el input de confirmPassword usamos: "validate" para hacer una comparativa de las 2 contraseñas
    const password = watch('password')

//formData guarda la info del formulario en un objeto, ya que esta funcion ya se paso a la funcion de: handleSubmit de react-hook-form.
//Esta funcion se encargara de enviar los datos al blackend
    async function handleRegister(formData: RegisterForm) {
        try {
            const {data} = await api.post(`/auth/register`, formData)
            console.log(data);
//Cuando alguien se registre queremos llamandar llamar toast
            toast.success(data)
            reset()
            navigate('/auth/login')
        } catch (error) {
// Verifica que el error proviene de Axios y obtiene el mensaje de error enviado por el backend mensajes como que el usuario ya esta registrado.
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error)

            }

        }

    }

    return (
<>


    {/* Imagen */}
    <div className="order-2 md:order-1 flex justify-center items-center flex-col mt-8 md:mt-0 bg-slate-950 h-full">

       <div className="max-w-lg space-y-4 p-6">
            <h2 className="lg:text-6xl text-2xl font-bold text-blue-500 leading-tight">
                Tu presencia digital en un solo lugar
            </h2>

            <p className="lg:text-xl text-xl text-white leading-relaxed ">
             Organiza tus redes sociales y enlaces favoritos en un perfil
             único y profesional.
             </p>
    </div>

      <img
        src="/socialm2.png"
        alt="Registro"
        className="h-52 lg:h-96"

      />
    </div>
    {/* Contenido */}
    <div className="order-1 md:order-2">
        <div className="flex justify-center">
            <Logo/>
        </div>

      {/* Encabezado opcional para darle contexto al diseño bonito */}
      <div className="space-y-1 p-5 text-center">
        <h2 className="text-2xl font-semibold text-slate-800">
          Crea tu cuenta
        </h2>
        <p className="text-xs text-slate-400">
          Introduce tus datos para empezar
        </p>
      </div>

      <form onSubmit={handleSubmit(handleRegister)}
        className="mx-auto max-w-md space-y-7 rounded-2xl bg-white p-8 shadow-sm border border-slate-100"
      >
        {/* Nombre */}
        <div className="group relative border-b border-slate-400 focus-within:border-blue-400 transition-colors duration-300">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-500 group-focus-within:text-blue-500 transition-colors duration-300"
          >
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Daniel Mena"
            className="w-full bg-transparent py-2 text-sm text-slate-800 placeholder-slate-300 outline-none"
            {...register('name', {
              required: "El nombre es obligatorio"
            })}
          />
        </div>
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

        {/* Correo */}
        <div className="group relative border-b border-slate-400 focus-within:border-blue-400 transition-colors duration-300">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-500 group-focus-within:text-blue-500 transition-colors duration-300"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            className="w-full bg-transparent py-2 text-sm text-slate-800 placeholder-slate-300 outline-none"
            {...register('email', {
              required: "El email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
        </div>
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        {/* Handle */}
        <div className="group relative border-b border-slate-400 focus-within:border-blue-400 transition-colors duration-300">
          <label
            htmlFor="handle"
            className="block text-sm font-medium text-slate-500 group-focus-within:text-blue-500 transition-colors duration-300"
          >
            Handle
          </label>
          <input
            id="handle"
            type="text"
            placeholder="@daniel_mena"
            className="w-full bg-transparent py-2 text-sm text-slate-800 placeholder-slate-300 outline-none"
            {...register('handle', {
              required: "El handle es obligatorio"
            })}
          />
        </div>
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

        {/* Contraseña */}
        <div className="group relative border-b border-slate-400 focus-within:border-blue-400 transition-colors duration-300">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-500 group-focus-within:text-blue-500 transition-colors duration-300"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full bg-transparent py-2 text-sm text-slate-800 placeholder-slate-300 outline-none"
            {...register('password', {
              required: "Crea una contraseña",
              minLength: {
                value: 8,
                message: "Tu contraseña debe incluir minimo 8 caracteres"
              }
            })}
          />
        </div>
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

        {/* Confirmar Contraseña */}
        <div className="group relative border-b border-slate-400 focus-within:border-blue-400 transition-colors duration-300">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-slate-500 group-focus-within:text-blue-500 transition-colors duration-300"
          >
            Confirma la contraseña
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            className="w-full bg-transparent py-2 text-sm text-slate-800 placeholder-slate-300 outline-none"
            {...register('confirmPassword', {
              required: "Confirma la contraseña",
              validate: (value) =>
                value === password || 'Las contraseñas no coinciden'
            })}
          />
        </div>
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
        )}

        {/* Botón */}
        <button
          type="submit"
          className="w-full rounded-xl bg-slate-900 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]"
        >
          Crear cuenta
        </button>

        <nav className="mt-10">
          <Link
            to="/auth/login"
            className="text-center block text-xs text-blue-500"
          >
            ¿Ya tienes cuenta? Inicia Sesión
          </Link>
        </nav>
      </form>

    </div>


</>
)
}
