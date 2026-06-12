import axios from "axios";

//Creamos una instnacia de axios, una base que cada que la utilicemos se va a registrar en automatico
//baseURL para asignar el valor que tenemos como variable de entorno
const api = axios.create({
    baseURL:import.meta.env.VITE_API_BACKEND
})

//Los interceptors de Axios son funciones que se ejecutan antes de enviar una petición o después de recibir una respuesta.Piensa en ellos como un "punto de control" por donde pasan todas las peticiones.
//Sin interceptor: Tendrías que enviar el token manualmente en cada petición:

//Aquí le dices a Axios: "Antes de enviar una petición, dame acceso a su configuración (config) para modificarla." entonces - antes de salir al servidor, pasa por el interceptor.
api.interceptors.request.use((config) => {
//Obtiene el JWT que guardaste cuando el usuario inició sesión:
        const token = localStorage.getItem('AUTH_TOKEN')

//Tenemos que tener un if por que puede ser que laguien quiera iniciar sin un token, y asi si alguien no tiene un token axios sigue su funcionalidad
        if (token) {
            config.headers.Authorization =  `Bearer ${token}`
        }
//Si no existe un token, simplemente continúa. asi no se rompe la app
        return config
})

export default api
