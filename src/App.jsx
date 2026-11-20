import { Routes, Route} from "react-router";
import Dashboard from "./components/Dashboard";
import SalesManagement from "./components/SalesManagement";
import Finance from "./components/Finance";
import Customers from "./components/Customers";
import Inventory from "./components/Inventory";
import Landing from "./components/Landing";
import AppRoute from "./routes/AppRoute";
import { FinanceProvider } from "./contexts/FinanceContexts";
import "./App.css";

export default function App(){
  return (
    <FinanceProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<AppRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/salesManagement" element={<SalesManagement/>}/>
          <Route path="/finance" element={<Finance />}/>
          <Route path="/customers" element={<Customers />} />
          <Route path="/inventory" element={<Inventory />} />
        </Route>
      </Routes>
    </FinanceProvider>
  );
}