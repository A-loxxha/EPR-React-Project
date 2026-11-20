import { Link } from "react-router"
import logo from "../assets/Mipato_logo.png"
export default function NavBar(){

    return(
        <nav className="navbar pt-5">
            <div>
                <a className="navbar-brand mt-2">
                    <img src={logo} alt="Logo" width="200" className="d-felex"/>
                </a>
            </div>
        </nav>
    )
}
