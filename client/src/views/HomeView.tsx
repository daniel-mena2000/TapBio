import { Link } from "react-router";

export function HomeView() {
    return(
        <div>


            <Link to="/auth/login">
                Iniciar sesión
            </Link>

            <Link to="/auth/register">
                Crear cuenta
            </Link>
    </div>

    )
}
