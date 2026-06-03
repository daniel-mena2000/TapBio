
import { Outlet } from "react-router"

export default function Root() {
    return(
        <>
	    <header className="bg-blue-50 min-h-screen">
            <div className="max-w-lg mx-auto  px-5">
                <img src="/logoTapBio.png" alt="Logotipo TapBio" />
            </div>

            <div className="">

            </div>
        </header>


        <main>
            <Outlet/>
        </main>

        </>

    )
}
