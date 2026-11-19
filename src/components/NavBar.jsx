import { Link } from "react-router"
import logo from "../assets/Mipato_logo.png"
export default function NavBar(){

    return(
        <nav className="navbar fg-2">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={logo} alt="Logo" width="200" className="d-inline-block align-text-top"/>
                </a>
                <div className="links">
                <Link className="link btn" to="/">Home</Link>
            </div>
            </div>
        </nav>
    )
}
