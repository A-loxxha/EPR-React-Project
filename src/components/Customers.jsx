import { useState, useEffect } from "react";

const emptyForm = { customerName: "", customerNumber: "", customerEmail: "" };

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetch("/EPR-React-Project/db.json/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  function openModal(customer = emptyForm) {
    setForm(customer);
    setShowModal(true);
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSave(event) {
    event.preventDefault();

    const isEditing = form.id !== undefined;

    const newCustomer = {
      ...form, customerId: form.customerId ?? Date.now(),createdAt: form.createdAt ?? new Date(),
    };

    fetch(
      isEditing
        ? `/EPR-React-Project/db.json/customers/${form.id}`
        : "/EPR-React-Project/db.json/customers",
      {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      }
    )
      .then((response) => response.json())
      .then((saved) => {
        setCustomers(
          isEditing
            ? customers.map((customer) => (customer.id === saved.id ? saved : customer))
            : [...customers, saved]
        );
        setShowModal(false);
      });
  }

  function deleteCustomer(id) {
    fetch(`/EPR-React-Project/db.json/customers/${id}`, { method: "DELETE" }).then(
      () => setCustomers(customers.filter((customer) => customer.id !== id))
    );
  }

  return (
    <div className="crm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h2 mb-0">Customers</h1>
        <button className="btn btn-dark rounded-pill px-4" onClick={() => openModal()}>
          <i className="bi bi-plus-lg me-1"></i> Add Customer
        </button>
      </div>

      <div className="customers-card">
        <p>Total Customers</p>
        <h3>{customers.length}</h3>
      </div>

      <div className="customer-table">
        <table>
          <thead>
            <tr>
              <th>Customer_Id</th>
              <th>Customer_Name</th>
              <th>Customer_Number</th>
              <th>Customer_Email</th>
              <th>Created_at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.customerId}</td>
                <td>{customer.customerName}</td>
                <td>{customer.customerNumber}</td>
                <td>{customer.customerEmail}</td>
                <td>{customer.createdAt}</td>
                <td>
                  <button className="btn btn-sm btn-outline-dark me-2" onClick={() => openModal(customer)}>Update</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => deleteCustomer(customer.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{showModal && (
        <div className="modal">
          <div className="modal-wrapper">
            <form className="modal-content" onSubmit={handleSave}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {form.id !== undefined ? "Update Customer" : "Add Customer"}
                </h5>
                <button type="button" className="btn btn-danger" onClick={() => setShowModal(false)}><i class="bi bi-x"></i></button>
              </div>
              <div className="modal-body d-flex flex-column gap-3"><input className="form-control" name="customerName" placeholder="Name" value={form.customerName} onChange={handleChange} required/>
                <input className="form-control" name="customerNumber" placeholder="Phone number" value={form.customerNumber} onChange={handleChange} required/>
                <input className="form-control" type="email" name="customerEmail" placeholder="Email" value={form.customerEmail} onChange={handleChange} required/>
              </div>
              <div className="p-3">
                <button type="button" className="btn btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-secondary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}