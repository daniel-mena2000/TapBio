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

//Mutacion para actualizar los links, en este caso no le daremos nombre como a las de ProfileView, ya que aqui es solo una mutacion y no hay confucion a la hora de mutar, y podemos extraer directamente "mutate" y esta mutacion se va mandar llamar cuando demos en el boton de "guardar" ejem: onClick={() => mutate(user), en este caso mutationFn estan mandando llamar los datos que espera updateProfile que seria la instancia de usuario, para actualizarlos, y esos datos ya estan en "user" de queryClient donde ya estan cachados
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
//updateData: Nos va a permitir ver el link actual y sus datos e irlos seteando para que se actualice nuestra interfaz
    useEffect(() => {
         if (!user?.links) return
//Hacemos el JSON parse desde aqui ya que si lo metemos en el map, y tenemos 10 redes sociales este se ejcutara 10 veces
//Ahora JSON.parse() se ejecuta solo una vez.
const parsedLinks = JSON.parse(user.links)

        const updateData = tapBioLinks.map(item => {
//Usamos JSON.parse por que tenemos esto en STRING : user.links = '[{"name":"github","url":"https://github.com/daniel"},{"name":"linkedin","url":"https://linkedin.com/in/daniel"}]', lo convertimos a un array para poder acceder a sus propiedades. Si find encuentra github en el state entonces userLink sera el array con esa info de github
            const userLink = parsedLinks.find((link: SocialNetwork) => link.name === item.name)
//Si se encontro un userLink modificamos esa info, sin tocar la demas
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
//Va recibir el name de la red social, esto para saber que red es la que estamos habilitando o deshabilitando
//Si el name coincide y la url es valida, entonces  habilita el boton de switch
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

        setTapBioLinks(updatedLinks) //Enlaces en el state
//Estamos buscando el link que se habilito o deshabilito para poderlo mandar a la mutacion y actualizarlo en el backend
//Cuando se active le agregaremos un ID
        const selectSocialNetwork = updatedLinks.find(item => item.name === socialNetwork)
//selectSocialNetwork es practicamente lo mismo que tenemos en el state: enabled:true name:"facebook" url:"https://www.facebook.com" aqui cuando habilitemos agregaremos o quitaremos el id
        if(selectSocialNetwork && selectSocialNetwork.enabled){
            console.log("habilitado", selectSocialNetwork);
            const addID = {...selectSocialNetwork, id: 1}
            console.log(addID);
            

        }else{
            console.log('deshabilitado');

        }


//Pasando los enlaces del state al ['user'] de queryClient, recordar que ['user] ya tiene otros campos es por eso que hacemos copia de: ...prevData sus datos ya cachados para ahora si agregar links
//Recordar que los links en el state son un array todavia, y el modelo espera un string es por eso que los links a actualizar los convertimos con JSON.stringify
        queryClient.setQueryData(['user'], (prevData : UserDataT) => {
            return {
                ...prevData,
                links: JSON.stringify(updatedLinks)
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
