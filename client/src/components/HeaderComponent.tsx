import Logo from "./Logo";
import AdminNavigation from "./nav/AdminNavigation";
import { useLocation } from "react-router";

export default function HeaderComponent() {

    const location = useLocation()

    return(
         <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 h-20 flex items-center justify-between">
            <Logo/>
            {location.pathname.startsWith('/admin') && <AdminNavigation/>}

          </div>
        </header>
    )
}
