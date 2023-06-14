import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Contact, Login, Register, Reset } from "./pages/";
import { Header, Footer } from "./components/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import ProductsLogs from "./pages/admin/ProductsLogs";
import MessageTable from "./pages/admin/MessagesTable";
import UserManagement from "./pages/admin/UserManagement";
import OrderLogs from "./pages/admin/OrdersLogs";
import MyOrders from "./pages/orders";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  return (
    <>
      <PayPalScriptProvider
        options={{
          "client-id": "AXqlaV9LY02thE5AohJznL6IFuEJzyRK6gSf0gSh112GsQ5KziprMaLUR3EpLynvivT8rKTWG4s2GCzv"
        }}
      >
        <BrowserRouter>
          <ToastContainer />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/items" element={<ProductsLogs />} />
            <Route path="/messages" element={<MessageTable />} />
            <Route path="/orders" element={<OrderLogs />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/users" element={<UserManagement />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </PayPalScriptProvider>
    </>
  );
}

export default App;
