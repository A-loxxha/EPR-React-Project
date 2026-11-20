import { useState, useEffect } from "react";
import { useFinance} from "../contexts/FinanceContexts"

export default function Tax() {

  const{totalIncome, totalExpenses} = useFinance()
  const [filings, setFilings] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [period, setPeriod] = useState("")
  const taxRate = 0.16
  const incomeTaxRate = 0.3

  useEffect(() => {
    fetch("/EPR-React-Project/db.json/taxes")
      .then((response) => response.json())
      .then((data) => setFilings(data))
  }, [])

  const profit = totalIncome - totalExpenses
  const vatPayable = profit * taxRate
  const incomeTax = profit * incomeTaxRate
  const totalTax = vatPayable + incomeTax

  function handleFile(event) {
    event.preventDefault();

    if (filings.some((file) => file.period === period)) {
      alert("You've already filed for this period.");
      return;
    }
    const filing = {
    period,
    totalIncome,
    totalExpenses,
    vatPayable,
    incomeTax,
    totalTax,
    status: "Filed",
    dateFiled: new Date().toISOString().split("T")[0],
}

    fetch("/EPR-React-Project/db.json/taxes",{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filing),
    })
      .then((response) => response.json())
      .then((saved) => {
        setFilings([...filings, saved])
        setPeriod("")
        setShowModal(false)
      })
  }

  function markPaid(id) {
    fetch(`/EPR-React-Project/db.json/taxes/${id}`,{
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Paid" }),
    })
      .then((response) => response.json())
      .then((saved) =>
        setFilings(filings.map((filing) => (filing.id === saved.id ? saved : filing)))
      );
  }

  function deleteFiling(id) {
    fetch(`/EPR-React-Project/db.json/taxes/${id}`, 
        { method: "DELETE" }).then(() =>
      setFilings(filings.filter((filing) => filing.id !== id))
    )
  }

  return (
    <section className="mt-5">
      <div className="d-flex mb-3">
        <h2 className="h4 mb-0">Tax</h2>
        <button
          className="btn btn-dark px-4" onClick={() => setShowModal(true)}>
          <i className="bi bi-file-earmark-text me-1"></i>File Tax</button>
      </div>
      <div className="finance-table">
        <table>
          <thead>
            <tr>
              <th>Period</th>
              <th>Total_Tax</th>
              <th>Status</th>
              <th>Date_Filed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filings.map((filing) => (
              <tr key={filing.id}>
                    <td>{filing.period}</td>
                    <td>Ksh {filing.totalTax.toLocaleString()}</td>
                    <td>{filing.status}</td>
                    <td>{filing.dateFiled}</td>
                    <td>
                    {filing.status !== "Paid" && (
                      <button className="btn btn-sm btn-outline-dark" onClick={() => markPaid(filing.id)}>Mark Paid</button>)}
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteFiling(filing.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-wrapper">
            <form className="modal-content" onSubmit={handleFile}>
              <div className="modal-header">
                <h5 className="modal-title">File Tax</h5>
                <button type="button" className="btn btn-danger" onClick={() => setShowModal(false)}><i className="bi bi-x-lg"></i></button>
              </div>
              <div className="modal-body d-flex flex-column gap-3">
                <div>
                  <label className="form-label">Filing period</label>
                  <input className="form-control" type="month" value={period} onChange={(event) => setPeriod(event.target.value)} required />
                </div>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total income</span>
                    <span>Ksh {totalIncome.toLocaleString()}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total expenses</span>
                    <span>Ksh {totalExpenses.toLocaleString()}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>VAT ({taxRate * 100}%)</span>
                    <span>Ksh {vatPayable.toLocaleString()}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Income tax ({incomeTaxRate * 100}%)</span>
                    <span>Ksh {incomeTax.toLocaleString()}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between fw-bold">
                    <span>Total tax due</span>
                    <span>Ksh {totalTax.toLocaleString()}</span>
                  </li>
                </ul>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-secondary">File Tax</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}