import { useState } from "react";
import { FinanceContext, useFinance } from "../contexts/FinanceContexts";

const emptyForm = {
  expenseNo: "",
  description: "",
  paidTo: "",
  dueDate: "",
  amount: "",
  status: "Pending",
}

export default function Expenses() {
  const {expenses, setExpenses} = useFinance()
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)

  function openModal(expense = emptyForm) {
    setForm(expense)
    setShowModal(true)
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleSave(event) {
    event.preventDefault()

    const isEditing = form.id !== undefined;
    const expense = { ...form, amount: Number(form.amount) }

    fetch(
      isEditing? `http://localhost:4000/expenses/${form.id}`:"http://localhost:4000/expenses",
      {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      }
    )
      .then((response) => response.json())
      .then((saved) => {
        setExpenses(
          isEditing
            ? expenses.map((expense) => (expense.id === saved.id ? saved : expense))
            : [...expenses, saved]
        );
        setShowModal(false)
      })
  }

  function deleteExpense(id) {
    fetch(`http://localhost:4000/expenses/${id}`,
        { method: "DELETE" }).then(
      () => setExpenses(expenses.filter((expense) => expense.id !== id))
    )
  }
  return (
    <section className="mt-5">
      <div className="d-flex align-items-center mb-3">
        <h3 className="mb-0">Expenses</h3>
        <button className="btn btn-dark rounded-pill px-4" onClick={() => openModal()}>
          <i className="bi bi-plus-lg me-1"></i> Add Expense
        </button>
      </div>

      <div className="finance-table">
        <table>
          <thead>
            <tr>
              <th>Expense_No</th>
              <th>Description</th>
              <th>Paid_To</th>
              <th>Due_Date</th>
              <th>Amount(Ksh)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.expenseNo}</td>
                <td>{expense.description}</td>
                <td>{expense.paidTo}</td>
                <td>{expense.dueDate}</td>
                <td>{expense.amount.toLocaleString()}</td>
                <td>{expense.status}</td>
                <td>
                  <button className="btn btn-sm btn-outline-dark me-2" onClick={() => openModal(expense)}>Update</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => deleteExpense(expense.id)}>Delete</button>
                </td>
              </tr>
            )
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-wrapper">
            <form className="modal-content" onSubmit={handleSave}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {form.id !== undefined ? "Update Expense" : "Add Expense"}
                </h5>
                <button type="button" className="btn btn-danger" onClick={() => setShowModal(false)}><i class="bi bi-x"></i></button>
              </div>

              <div className="modal-body d-flex flex-column gap-3">
                <input className="form-control" name="expenseNo" placeholder="Expense No" value={form.expenseNo} onChange={handleChange} required/>
                <input className="form-control" name="description" placeholder="Description" value={form.description} onChange={handleChange} required/>
                <input className="form-control" name="paidTo" placeholder="Paid to" value={form.paidTo} onChange={handleChange} required/>
                <label>DueDate</label><input className="form-control" type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required/>
                <input className="form-control" type="number" name="amount" placeholder="Amount (Ksh)" min="0" value={form.amount} onChange={handleChange} required/>
                <select className="form-select" name="status" value={form.status} onChange={handleChange}>
                  <option>Pending</option>
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
  )
}