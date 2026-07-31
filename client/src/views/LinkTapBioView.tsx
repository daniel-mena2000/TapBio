import { useEffect, useState } from "react"
import { social } from "../data/social"
import { TapBioLinks } from "../components/TapBioInputs";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../api/TapBioApi";
import { useQueryClient } from "@tanstack/react-query";
import type { SocialNetwork, UserDataT } from "../types";



export function LinkTapBioView() {

    const [tapBioLinks, setTapBioLinks] = useState(social)

   const queryClient = useQueryClient()
    const user : UserDataT = queryClient.getQueryData(['user'])!

    const {mutate} = useMutation({
        mutationFn: updateProfile,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess() {
            toast.success('Actualizado Correctamente')
        },
    })
    useEffect(() => {
         if (!user?.links) return

        const parsedLinks = JSON.parse(user.links)
        const updateData = tapBioLinks.map(item => {
        const userLink = parsedLinks.find((link: SocialNetwork) => link.name === item.name)

            if (userLink) {
                return {...item, url: userLink.url, enabled: userLink.enabled}
            }
            return item
        })

        setTapBioLinks(updateData)
    },[])

//Funcion para asignar la URL a su respectivo input
   const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const updatedLinks = tapBioLinks.map(item => item.name === e.target.name ? {...item, url: e.target.value}: item)

    setTapBioLinks(updatedLinks)


   }

   const links : SocialNetwork[] = JSON.parse(user.links)

    const handleEnableLink = (socialNetwork: string) => {
        const updatedLinks = tapBioLinks.map(item => {
          if (item.name === socialNetwork) {
            //validando que sea una url valida
                if (isValidUrl(item.url)) {
                    return {...item, enabled: !item.enabled}
                }else{
                    toast.error('URL no válida')
                }
          }
          return item
        })

        setTapBioLinks(updatedLinks)


        let updatedItems: SocialNetwork[] = []
        const selectSocialNetwork = updatedLinks.find(item => item.name === socialNetwork)

        if(selectSocialNetwork && selectSocialNetwork.enabled){
        const id = links.filter(link => link.id).length + 1

            if (links.some(item => item.name === socialNetwork)) {
                updatedItems = links.map(item => {
                    if (item.name === socialNetwork) {
                        return {
                            ...item,
                            enabled: true,
                            id: id
                        }
                    }else{
                        return item
                    }
                })
            }else{
                 const newItemAddID = {
                ...selectSocialNetwork,
                 id: id
                }
//updateItems sera lo que guardemos en el cache
            updatedItems = [...links, newItemAddID]
            }


        }else{

            const indexUpdated = links.findIndex(item => item.name === socialNetwork)
            updatedItems = links.map(item => {
                if (item.name === socialNetwork) {
                    return {
                        ...item,
                        id: 0,
                        enabled: false
                    }

                }else if(item.id > indexUpdated){
                    return{
                        ...item,
                        id: item.id - 1
                    }
                }
                else{
                    return item
                }
            })


        }

        queryClient.setQueryData(['user'], (prevData : UserDataT) => {
            return {
                ...prevData,
                links: JSON.stringify(updatedItems)
            }
        })
   }


    return(
        <>
           <div className="space-y-5">
            {tapBioLinks.map(item => (
                <TapBioLinks key={item.name} item={item} handleUrlChange={handleUrlChange}
                handleEnableLink={handleEnableLink}
                />
            ))}

          <button
    className="w-full rounded-2xl bg-blue-500 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-xl active:translate-y-0 cursor-pointer"
    onClick={() => mutate(user)}
>
    Guardar cambios
</button>
           </div>
        </>
    )
}
