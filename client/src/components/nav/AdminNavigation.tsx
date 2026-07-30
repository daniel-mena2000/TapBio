import { useQueryClient } from "@tanstack/react-query";

export default function AdminNavigation() {
    const queryClient = useQueryClient()

//Para cerrar sesion tenemos primero eliminar el AUTH_TOKEN y luego invalidar los Queries
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({queryKey: ['user']})

    }
    return(
        <>
                <button
              className="
                rounded-xl
                px-4
                py-2
                text-sm
                font-medium
                text-slate-600
                hover:bg-slate-100
                hover:text-blue-500
                transition
                cursor-pointer
              "
              onClick={logout}
            >
              Cerrar sesión
            </button>
        </>
    )
}
