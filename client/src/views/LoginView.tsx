import { Link, useNavigate } from "react-router"//useNavigate a diferencia de navigate, te permite renderizar una vista, en este caso redireccionar al perfil una vez se inicie sesión, este solo te pide la URL de donde quieres mandar al usuario
import { ErrorMessage } from "../components/ErrorMessage"
import {useForm } from "react-hook-form"
import type { UserDataLogin } from "../types"
import { toast } from "sonner" //Mandamos llamar el componente de toast
import {isAxiosError} from "axios"
import api from "../config/axios"
import Logo from "../components/Logo"
import { Navigate } from "react-router";

export function LoginView() {

//Si la sesión esta activa, es decir tenemos un JWTOKEN de usuario activo, queremos que si damos en iniciar sesion en el home, este no nos lleve al panel de iniciar sesion si no al perfil ya que esta la sesion activa y nos redidija al "admin"
        const token = localStorage.getItem("AUTH_TOKEN");
        if (token) {
            return <Navigate to="/admin" replace />;
        }


    const navigate = useNavigate()

        const initialValues: UserDataLogin = {
                email: '',  password: ''
            }
        const {register,reset, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

        async function handleLogin(formDataLogin: UserDataLogin) {
            try {
//Aqui están ocurriendo dos cosas al mismo tiempo:1. Envías datos al backend (formDataLogin), 2. Recibes una respuesta del backend {data}, la info destrucutrada solo del thoken que es lo que nos interesa, para despues guardarlo en localstorage
            const {data} = await api.post(`/auth/login`, formDataLogin)
//Recibe 2 parametros (nombre para identificar, datos)
            localStorage.setItem('AUTH_TOKEN', data)
            navigate('/admin')
            //console.log('se inicio sesion');


        reset()
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error)
            }
        }
        }
    return(
        <>



 <div className="order-2 md:order-1 flex justify-center items-center flex-col mt-8 md:mt-0 bg-slate-950 h-full">

       <div className="max-w-lg space-y-4 p-6">
            <h2 className="lg:text-6xl text-2xl font-bold text-blue-500 leading-tight">
                Bienvenido de nuevo
            </h2>

            <p className="lg:text-xl text-xl text-white leading-relaxed ">
             Accede a tu cuenta y comparte todo lo que importa desde un único enlace.
             </p>
    </div>

      <img
        src="/login.png"
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
          Iniciar Sesión
        </h2>
        <p className="text-xs text-slate-400">
          Introduce tus datos correctamente
        </p>
      </div>


                <form
              onSubmit={handleSubmit(handleLogin)}
              className="mx-auto max-w-md space-y-7 rounded-2xl bg-white p-8 shadow-sm border border-slate-100"
            >

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
                        required: "Ingresa tu email",
                        pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "E-mail no válido",
                        },
                    })}
                />
              </div>
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

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
                    required: "Ingresa tu contraseña",
                    minLength: {
                        value: 8,
                        message: "Tu contraseña debe incluir minimo 8 caracteres"
                    }
                })}
                />
              </div>
                      {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

             <button type="submit" className="w-full rounded-xl bg-slate-900 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]" >
                Iniciar Sesión
            </button>

             <nav className="mt-10">
                <Link to="/auth/register" className="text-center text-xs block text-blue-500">
                    ¿No tienes cuenta? Crea una aquí
                </Link>
            </nav>
            </form>

            </div>

        </>
    )
}
