import { Link } from "react-router"

export default function Logo() {
    return(
        <Link to={'/'}>
              <img
              src="/logoTapBioA.png"
              alt="TapBio"
              className="h-12"
            />
        </Link>
    )
}
