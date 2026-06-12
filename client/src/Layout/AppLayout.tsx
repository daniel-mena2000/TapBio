import { Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/TapBioApi";
import { TapBio } from "../components/TapBio";

export default function AppLayout() {
//**Queries:** Se utilizan para obetener datos de un servidor o una API(GET)
//**Mutations:** Se utilizan para crear / actualizar / eliminar datos en el servidor (POST, PUT, PATCH, DELETE)
//[TanStack Query (React Query)] sirve para manejar y sincronizar datos del servidor en aplicaciones React de forma mucho más simple y eficiente.
//queryFN: Es la función que obtiene los datos. O sea: > la petición a la API.
//queryKey: Es la forma en la que reactQuery va a identificar el query de getUser
const {data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ['user'],
    retry: 1,
    refetchOnWindowFocus: false
})


//El codigo que ayuda a proteger la rutas es mejor colocarlo en el padre si proteges las hijas
if (isLoading) return 'Cargando...'
//Si hay un error, es decir que alguien intenta iniciar sin un token asigado, lo llevamos al login
//Esto va de la mano con nuestro auth.ts del backend ya que ahi mandamos los errores si no hay un berer o un token
if (isError) {
    return <Navigate to={'/auth/login'}/>
}

//console.log(data);


//Si la api ya nos devolvio datos entonces cargamos el componente
  if (data) return <TapBio data={data}/>
}
