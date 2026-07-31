import { isAxiosError } from "axios";
import api from "../config/axios";
import type { UserDataT, UserHandle } from "../types";

export async function getUser() {

      try {

            const {data} = await api.get<UserDataT>('/user')
            return data

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
            throw error
        }
}

export async function updateProfile(formData: UserDataT) {
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

export async function uploadImage(file: File) {

        let formData = new FormData()
        formData.append('avatar', file)

    try {
        const {data} = await api.post('/user/image', formData)
        return data

    } catch (error) {
         if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
            throw error
    }

}


export async function getUserByhandle(handle: string) {
     try {
            const url = `/${handle}`
            const {data} = await api.get<UserHandle>(url)
            return data

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
            throw error
        }
}

export async function searchByHandle(handle: string) {
     try {

            const {data} = await api.post<string>('/search', {handle})
            return data

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
            throw error
        }
}
