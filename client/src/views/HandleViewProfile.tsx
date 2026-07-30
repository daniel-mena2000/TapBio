import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUserByhandle } from "../api/TapBioApi";
import NotFoundView from "./NotFoundView";
import HandleDataProfile from "../components/HandleDataProfile";
export default function HandleViewProfile() {

    const params = useParams()
    const handle = params.handle!

    const {data, error, isLoading} = useQuery({
        queryFn: () => getUserByhandle(handle),
        queryKey: ['handle', handle],
        retry: 1
    })

if (isLoading) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-500"></div>

      <p className="text-lg font-medium text-slate-600">
        Cargando perfil...
      </p>
    </div>
  )
}
    if (error) return <NotFoundView/>

//Si existe el usuario retornamos su informacion
    if (data) return <HandleDataProfile data={data}/>

    //console.log(params);//{handle: '@mariana_react'}
    //console.log(handle);//'@mariana_react'


    return(
        <>

        </>
    )
}
