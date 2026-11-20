import { useState, useEffect } from "react";

const emptyForm = {
  invoiceNo: "",
  customer: "",
  dateIssued: "",
  dueDate: "",
  amount: "",
  status: "Unpaid",
}
export default function Invoice() {
  const [invoices, setInvoices] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    fetch("/EPR-React-Project/db.json/invoices")
      .then((response) => response.json())
      .then((data) => setInvoices(data))
  }, [])

  function openModal(invoice = emptyForm) {
    setForm(invoice)
    setShowModal(true)
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleSave(event) {
    event.preventDefault()

    const isEditing = form.id !== undefined;
    const invoice = { ...form, amount: Number(form.amount) }

    fetch(
      isEditing
        ? `/EPR-React-Project/db.json/invoices/${form.id}`:"/EPR-React-Project/db.json/invoices",
      {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoice),
      }
    )
      .then((response) => response.json())
      .then((saved) => {
        setInvoices(
          isEditing
            ? invoices.map((invoice) => (invoice.id === saved.id ? saved : invoice))
            : [...invoices, saved]
        );
        setShowModal(false)
      })
  }

  function deleteInvoice(id) {
    fetch(`/EPR-React-Project/db.json/invoices/${id}`,
        { method: "DELETE" })
    .then(() => setInvoices(invoices.filter((invoice) => invoice.id !== id))
    )
  }

  return (
    <section className="mt-5">
      <div className="d-flex align-items-center mb-3">
        <h3 className="mb-0">Invoices</h3>
        <button className="btn btn-dark rounded-pill px-4" onClick={() => openModal()}>
          <i className="bi bi-plus-lg me-1"></i> Add Invoice
        </button>
      </div>

      <div className="finance-table">
        <table>
          <thead>
            <tr>
              <th>Invoice_No</th>
              <th>Customer</th>
              <th>Date_Issued</th>
              <th>Due_Date</th>
              <th>Amount(Ksh)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.invoiceNo}</td>
                <td>{invoice.customer}</td>
                <td>{invoice.dateIssued}</td>
                <td>{invoice.dueDate}</td>
                <td>{invoice.amount.toLocaleString()}</td>
                <td>{invoice.status}</td>
                <td>
                  <button className="btn btn-sm btn-outline-dark me-2" onClick={() => openModal(invoice)}>Update</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => deleteInvoice(invoice.id)}>Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-wrapper">
            <form className="modal-content" onSubmit={handleSave}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {form.id !== undefined ? "Update Invoice" : "Add Invoice"}
                </h5>
                <button type="button" className="btn btn-danger" onClick={() => setShowModal(false)}><i class="bi bi-x"></i></button>
              </div>
              <div className="modal-body d-flex flex-column gap-3">
                <input className="form-control" name="invoiceNo" placeholder="Invoice No" value={form.invoiceNo} onChange={handleChange} required/>
                <input className="form-control" name="customer" placeholder="Customer" value={form.customer} onChange={handleChange} required/>
                <div>
                  <label className="form-label">Date issued</label>
                  <input className="form-control" type="date" name="dateIssued" value={form.dateIssued} onChange={handleChange} required/>
                </div>
                <div>
                  <label className="form-label">Due date</label>
                  <input className="form-control" type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required/>
                </div>
                <input className="form-control" type="number" name="amount" placeholder="Amount (Ksh)" min="0" value={form.amount} onChange={handleChange} required/>
                <select className="form-select" name="status" value={form.status} onChange={handleChange}>
                  <option>Unpaid</option>
                  <option>Paid</option>
                  <option>Overdue</option>
                </select>
              </div>
              <div className="p-3">
                <button type="button" className="btn btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-secondary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}