import { useNavigate } from "react-router"

export default function SideBar() {
  const navigate = useNavigate()

  return (
    <div className="side-bar">
      <nav>
        <label class="form-control form-adorn">
          <div class="form-adorn-icon" aria-hidden="true">
            <svg class="bi" width="16" height="16"><use href="#search" /></svg>
          </div>
          <input type="search" className="form-ghost" placeholder="Search..." />
        </label>
        <div>
            <button className="btn btn-sm" onClick={() => navigate("/dashboard")}><i className="bi bi-square-half"> </i>Dashboard</button>
            <button className="btn btn-sm" onClick={() => navigate("/salesManagement")}><i className="bi bi-graph-up-arrow"></i> Sales</button>
            <button className="btn btn-sm" onClick={() => navigate("/finance")}><i className="bi bi-activity"></i> Finance</button>
            <button className="btn btn-sm" onClick={() => navigate("/customers")}><i className="bi bi-person-lines-fill"></i> CRM</button>
            <button className="btn btn-sm" onClick={() => navigate("/inventory")}><i className="bi bi-boxes"></i> Inventory</button>
        </div>
      </nav>
    </div>
  )
}