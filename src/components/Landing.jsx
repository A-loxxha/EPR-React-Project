import { Link } from "react-router";
import logo from "../assets/Mipato_logo.png"

export default function Landing(){

    return(

        <div className="overview-landing fg-black">
            <nav className="navbar bg-1 fg-2">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="Logo" width="200" className="d-inline-block align-text-top"/>
                    </a>
                </div>
            </nav>
            <h1>Welcome to Mapato</h1>
            <div className="pt-12">
                <Link to="/dashboard" className="btn p-4">
                    View Dashboard <i className="bi bi-arrow-right ms-2"></i>
                </Link>
                <h3 className="pt-10">Make your Business Easy to manage</h3>
                <p className="pt-10">We provide customers with a wide range of services including sales management, customer management and inventory management among others</p>
            </div>
        </div>
    )
}