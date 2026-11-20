import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";
import "../App.css"

export default function AppRoute() {
  return (
    <div>
      <NavBar />
      <section className="mainContent">
        <SideBar />
        <main className="">
          <Outlet />
        </main>
      </section>
      <Footer />
    </div>
  );
}