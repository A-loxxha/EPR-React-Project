import { useState, useEffect } from "react";


export default function SalesManagement() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [id, setid] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetch("http://localhost:4000/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);

  function openAddModal() {
    setid([]);
    setForm({});
    setShowModal(true);
  }

  function openEditModal(order) {
    setid(order.id);
    setForm(order);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const payload = { ...form, total: Number(form.total) };
    const isEditing = id !== null;

    fetch(
      isEditing? `http://localhost:4000/orders/${id}`: "http://localhost:4000/orders",
      {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => response.json())
      .then((saved) => {
        if (isEditing) {
          setOrders(orders.map((order) => (order.id === saved.id ? saved : order)));
        } else {
          setOrders([...orders, saved]);
        }
        closeModal();
      });
  }

  function deleteOrder(id) {
    if (!window.confirm("Delete this order?")) return;

    fetch(`http://localhost:4000/orders/${id}`, { method: "DELETE" }).then(() =>
      setOrders(orders.filter((order) => order.id !== id))
    );
  }

  return (
    <div className="sales-content fg-black">
      <div className="d-flex justify-content-between mb-3">
        <h1 className="h2 mb-0">Sales Management</h1>
        <button className="btn btn-secondary btn-sm rounded-pill px-2" onClick={openAddModal}>
          <i className="bi bi-plus-lg me-1"></i> Add Order</button>
      </div>

      <div className="sales-table">
        <table>
          <thead>
            <tr>
              <th>Order_No</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Payment_Method</th>
              <th>Payment_Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNo}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>Ksh {order.total.toLocaleString()}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.paymentStatus}</td>
                <td>
                  <button className="btn btn-sm btn-outline-dark me-2" onClick={() => openEditModal(order)}>Update </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => deleteOrder(order.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-wrapper">
            <form className="modal-content" onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {id !== null ? "Update Order" : "Add Order"}
                </h5>
                <button type="button" className="btn btn-danger" onClick={closeModal}><i class="bi bi-x"></i></button>
              </div>
              <div className="modal-body d-flex flex-column p-4">
                <input className="form-control" name="orderNo" placeholder="Order No" value={form.orderNo} onChange={handleChange} required/>
                <input className="form-control" name="customer" placeholder="Customer" value={form.customer} onChange={handleChange}required/>
                <input className="form-control" type="date" name="date" value={form.date} onChange={handleChange} required/>
                <input className="form-control" type="number" name="total" placeholder="Total (Ksh)"  value={form.total} onChange={handleChange} required/>
                <select className="form-control" name="paymentMethod" value={form.paymentMethod} onChange={handleChange} required >
                  <option value="">Payment method</option>
                  <option>M-Pesa</option>
                  <option>Cash</option>
                  <option>Card</option>
                  <option>Bank Transfer</option>
                </select>
                <select
                  className="form-control" name="paymentStatus" value={form.paymentStatus} onChange={handleChange}>
                  <option>Pening</option>
                  <option>Paid</option>
                  <option>Overview</option>
                </select>
              </div>
              <div className="p-4">
                <button type="button" className="btn btn-danger" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-secondary">
                  {id !== null ? "Save Changes" : "Add Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}