import { useEffect, useState } from "react";

const emptyForm = { itemName: "", category: "", itemQuantity: "", itemPrice: "" };

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetch("http://localhost:4000/inventory")
      .then((response) => response.json())
      .then((data) => setInventory(data));
  }, []);

  function openModal(item = emptyForm) {
    setForm(item);
    setShowModal(true);
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value});
  }

  function handleSave(event) {
    event.preventDefault();

    const isEditing = form.id !== undefined;

    const item = {...form, itemQuantity: Number(form.itemQuantity), itemPrice: Number(form.itemPrice) };

    fetch(
      isEditing ? `http://localhost:4000/inventory/${form.id}`:"http://localhost:4000/inventory",
      {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      }
    )
      .then((response) => response.json())
      .then((saved) => {
        setInventory(
          isEditing
            ? inventory.map((item) => (item.id === saved.id ? saved : item))
            : [...inventory, saved]
        );
        setShowModal(false);
      });
  }

  function deleteItem(id) {
    fetch(`http://localhost:4000/inventory/${id}`,
        { method: "DELETE" })
        .then(() => setInventory(inventory.filter((item) => item.id !== id))
    );
  }

  return (
    <section className="inventory fg-black">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h2 mb-0">Inventory</h1>
        <button className="btn btn-dark rounded-pill px-4" onClick={() => openModal()}>
          <i className="bi bi-plus-lg me-1"></i> Add Item
        </button>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>Item_Id</th>
              <th>Item_Name</th>
              <th>Category</th>
              <th>Item_Quantity</th>
              <th>Item_Price(Ksh)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.itemName}</td>
                <td>{item.category}</td>
                <td>{item.itemQuantity}</td>
                <td>Ksh {item.itemPrice.toLocaleString()}</td>
                <td>
                  <button className="btn btn-sm" onClick={() => openModal(item)}>Update</button>
                  <button className="btn btn-sm" onClick={() => deleteItem(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {showModal && (
        <div className="modal d-block">
          <div className="modal-dialog modal-dialog-centered">
            <form className="modal-content" onSubmit={handleSave}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {form.id !== undefined ? "Update Item" : "Add Item"}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} ></button>
              </div>
              <div className="modal-body d-flex flex-column gap-3">
                <input className="form-control" name="itemName" placeholder="Item name" value={form.itemName} onChange={handleChange} required/>
                <input className="form-control" name="category" placeholder="Category" value={form.category} onChange={handleChange} required/>
                <input className="form-control" type="number" name="itemQuantity" placeholder="Quantity" min="0" value={form.itemQuantity} onChange={handleChange} required/>
                <input className="form-control" type="number" name="itemPrice" placeholder="Price (Ksh)" min="0" value={form.itemPrice} onChange={handleChange}required />
              </div>
              <div>
                <button type="button"className="btn btn-light" onClick={() => setShowModal(false)} >Cancel</button>
                <button type="submit" className="btn btn-dark">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}