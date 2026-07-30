import { Outlet } from "react-router"
import { Toaster } from "sonner" //Registra Toaster en nuestro proyecto

export default function AuthLayout() {
  return (
   <div className="mx-auto bg-gray-100 lg:max-w-full md:max-w-4xl">


        <Toaster position="top-center" theme="dark" visibleToasts={2}/>


        <main className="md:min-h-screen md:grid md:grid-cols-2 md:gap-12 md:items-center
        lg:w-full
        sm:w-full" >


            <Outlet />
        </main>
</div>
  );
}
