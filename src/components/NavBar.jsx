import { Link } from "react-router"
import logo from "../assets/Mipato_logo.png"
export default function NavBar(){

    return(
        <nav className="navbar fg-black">
            <img src={logo} alt="logo" />
            <div className="links">
                <Link className="link btn" to="/">Home</Link>
            </div>
        </nav>
    )
}
