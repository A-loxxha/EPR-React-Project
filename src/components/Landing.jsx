import { Link } from "react-router";
import logo from "../assets/Mipato_logo.png"

export default function Landing(){

    return(

        <div className="overview-landing fg-black">
            <img src={logo} alt="logo" />
            <h1>Welcome to Mapato</h1>
            <div className="pt-12">
                <Link to="/dashboard" className="btn p-4">
                    View Dashboard <i className="bi bi-arrow-right ms-2"></i>
                </Link>
            </div>
        </div>
    )
}