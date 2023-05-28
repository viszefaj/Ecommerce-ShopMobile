import React, { useState, useEffect } from "react";
import { get, post, del, update } from "../../utils/axiosUtil";
// import styles from "./Admin.module.scss";

const initialItems = [
  {
    id: 1,
    name: "Item 1",
    price: 10,
    quantity: 5,
  },
  {
    id: 2,
    name: "Item 2",
    price: 15,
    quantity: 3,
  },
  {
    id: 3,
    name: "Item 3",
    price: 20,
    quantity: 8,
  },
];

const Admin = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    quantity: "",
  });
  const [editItemId, setEditItemId] = useState(null);

  //   useEffect(() => {
  // const fetchItems = async () => {
  //   try {
  //     const response = await get("/items");
  //     setItems(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // fetchItems();
  //   }, []);

  useEffect(() => {
    setItems(initialItems);
  }, []);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await post("/items", formData);
      const newItem = response.data;
      setItems((prevItems) => [...prevItems, newItem]);
      setFormData({
        id: "",
        name: "",
        price: "",
        quantity: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await del(`/items/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    const selectedItem = items.find((item) => item.id === id);
    setEditItemId(id);
    setFormData(selectedItem);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await update(`/items/${formData.id}`, formData);
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === formData.id ? formData : item))
      );
      setFormData({
        id: "",
        name: "",
        price: "",
        quantity: "",
      });
      setEditItemId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      id: "",
      name: "",
      price: "",
      quantity: "",
    });
    setEditItemId(null);
  };

  const renderTableRows = () => {
    return items.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>${item.price}</td>
        <td>{item.quantity}</td>
        <td>
          <button
            className="btn btn-danger btn-sm ml-2"
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </button>
          <button
            className="btn btn-primary btn-sm ml-2"
            onClick={() => handleEdit(item.id)}
          >
            Edit
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="container">
      <h2 className="mt-5 d-flex justify-content-center">Add/Edit Item</h2>
      <div className="d-flex justify-content-center">
        <div className="w-50">
          <form onSubmit={editItemId ? handleUpdate : handleAdd}>
            <div className="mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="form-control"
                min="0"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editItemId ? "Update Item" : "Add Item"}
            </button>
            {editItemId && (
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
      <h2 className="mt-5">Items</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
};

export default Admin;
