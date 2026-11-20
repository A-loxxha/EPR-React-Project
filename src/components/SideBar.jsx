import { Link, useNavigate } from "react-router"

export default function SideBar() {
  const navigate = useNavigate()

  return (
    <div className="side-bar">
      <nav>
        {/* <label class="form-control form-adorn">
          <input type="search" className="form-ghost" placeholder="Search..." />
        </label> */}
        <div className="sideBarButtons">
            <button className="btn btn-sm btn-secondary"><i className="bi bi-house"></i><Link to="/" className="link"> Home</Link></button>
            <button className="btn btn-sm btn-secondary" onClick={() => navigate("/dashboard")}><i className="bi bi-square-half"> </i>Dashboard</button>
            <button className="btn btn-sm btn-secondary" onClick={() => navigate("/salesManagement")}><i className="bi bi-graph-up-arrow"></i> Sales</button>
            <button className="btn btn-sm btn-secondary" onClick={() => navigate("/finance")}><i className="bi bi-activity"></i> Finance</button>
            <button className="btn btn-sm btn-secondary" onClick={() => navigate("/customers")}><i className="bi bi-person-lines-fill"></i> CRM</button>
            <button className="btn btn-sm btn-secondary" onClick={() => navigate("/inventory")}><i className="bi bi-boxes"></i> Inventory</button>
        </div>
      </nav>
    </div>
  )
}