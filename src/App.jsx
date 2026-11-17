import "./App.css";
import { Routes, Route} from "react-router";
import Dashboard from "./components/Dashboard";
import SalesManagement from "./components/SalesManagement";
import Finance from "./components/Finance";
import Customers from "./components/Customers";
import Inventory from "./components/Inventory";
import Landing from "./components/Landing";
import { ProductContext } from "./contexts/ProductContext";
import AppRoute from "./routes/AppRoute";

export default function App() {
  return (
    <ProductContext>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<AppRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/salesManagement" element={<SalesManagement />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/inventory" element={<Inventory />} />
        </Route>
      </Routes>
    </ProductContext>
  );
}