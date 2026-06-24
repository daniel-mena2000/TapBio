import { isAxiosError } from "axios";
import api from "../config/axios";
import type { UserDataT } from "../types";

export async function getUser() {
//Recordar que la ruta "/user" pide un bearer y un token en el backend para poder acceder
//Bearer como tal es solo un texto
//Ya teniendo un token en localstorage lo obtenemos para pasarlo a axios, en su configuracion de los headers
//Recordar que el token se va al localstogare cuando iniciamos sesion
//Con esto el console.log(data); ya deberia de imprimir la info del usuario del token
//Ejemplo sin interceptor, pasamos el token directo en la configuracion de este archivo
/*('/user', {
                headers: {
                    Authorization: `Bearer, ${token}`
                }
            })*/

      try {
//Mandamos llamar api del archivo de configuracion de axios, le podemos colocar "get" o no ya que get viene por defecto
//Data sera de tipo UserDataT
            const {data} = await api.get<UserDataT>('/user')
                //console.log('DATA:', data)

            return data

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
            throw error
        }
}
//Este a pesar de que deberia de actualizar solo el perfil, le pasaremos la info completa para que acepte tambien los links y no repetir codigo para cada actualización, entonces acepta todos los campos de "UserDataT"
export async function updateProfile(formData: UserDataT) {
//formData son los datos que vamos a enviar
     try {
            const {data} = await api.patch<string>('/user', formData)
            return data

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
            throw error
        }
}
//TypeScript ya nos da un tipo para los archivos, que se llama "File"
export async function uploadImage(file: File) {
//Para enviar la imagen al backend necesitamos algo llamado formData(), recibe 2 parametros en este caso el primer parametro es el nombre que le dimos al llamado en el backend, y el segundo pues la info, muy parecido a lo que enviabamos por postman
        let formData = new FormData()
        formData.append('avatar', file)

    try {
//enviamos formData a la peticion hacia la url
        const {data} = await api.post('/user/image', formData)
//lo retornamos hacia el onSucces del useMutation
        return data

    } catch (error) {
         if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
            throw error
    }

}
