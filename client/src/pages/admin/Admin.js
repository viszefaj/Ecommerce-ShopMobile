import React, { useState, useEffect } from "react";
import { get, post, del, update } from "../../utils/axiosUtil";
import MessageTable from "./MessagesTable";
import OrderLogs from "./OrdersLogs";
import UserManagement from "./UserManagement";
import ProductsLogs from "./ProductsLogs";
import { useSelector } from "react-redux";

const initialProducts = [
  {
    id: 1,
    name: "Item 1",
    description: "Item 1 Description",
    price: 10,
    quantity: 5,
  },
  {
    id: 2,
    name: "Item 2",
    description: "Item 2 Description",
    price: 15,
    quantity: 3,
  },
  {
    id: 3,
    name: "Item 3",
    description: "Item 3 Description",
    price: 20,
    quantity: 8,
  },
];

const messages = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2022-01-01",
  },
];

const orders = [
  {
    orderId: "123456",
    customer: "John Doe",
    amount: 250.99,
    status: "Pending",
  },
];

const usersData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "user" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "admin" },
];

const Admin = () => {
  const [users, setUsers] = useState(usersData);

  const handleRoleChange = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, role: newRole };
        }
        return user;
      })
    );
  };
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
  });
  const [editProductId, setProductItemId] = useState(null);

  const selectedTab = useSelector((state) => state.admin.selectedTab);

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
    setProducts(initialProducts);
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
      const response = await post("/products", formData);
      const newProduct = response.data;
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setFormData({
        id: "",
        name: "",
        description: "",
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
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    const selectedProduct = products.find((product) => product.id === id);
    setProductItemId(id);
    setFormData(selectedProduct);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await update(`/products/${formData.id}`, formData);
      setProducts((prevProducts) =>
        prevProducts.map((item) => (item.id === formData.id ? formData : item))
      );
      setFormData({
        id: "",
        name: "",
        price: "",
        quantity: "",
      });
      setProductItemId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      id: "",
      name: "",
      description: "",
      price: "",
      quantity: "",
    });
    setProductItemId(null);
  };

  return (
    <div className="container" style={{ flex: 1 }}>
      {selectedTab === "products" && (
        <div>
          <ProductsLogs
            products={products}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            editProductId={editProductId}
            handleUpdate={handleUpdate}
            handleAdd={handleAdd}
            formData={formData}
            handleChange={handleChange}
            handleCancelEdit={handleCancelEdit}
          />
        </div>
      )}
      {selectedTab === "messages" && (
        <div>
          <MessageTable messages={messages} />
        </div>
      )}
      {selectedTab === "orders" && (
        <div>
          <OrderLogs orders={orders} />
        </div>
      )}
      {selectedTab === "users" && (
        <div>
          <UserManagement users={users} onRoleChange={handleRoleChange} />
        </div>
      )}
    </div>
  );
};

export default Admin;
