import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";

export default function AppRoute() {
  return (
    <div>
      <NavBar />
      <section className="content">
        <SideBar />
        <main className="flex-grow-1">
          <Outlet />
        </main>
      </section>
      <Footer />
    </div>
  );
}