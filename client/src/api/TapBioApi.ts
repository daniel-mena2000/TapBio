import { isAxiosError } from "axios";
import api from "../config/axios";
import type { ProfileForm, UserDataT } from "../types";

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

export async function updateProfile(formData: ProfileForm) {
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
