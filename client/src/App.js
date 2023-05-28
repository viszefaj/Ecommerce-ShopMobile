import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//pages
import { Home, Contact, Login, Register, Reset } from "./pages/";
//components
import { Header, Footer } from "./components/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Data from "./components/FlashDeals/Data";
import Admin from "./pages/admin/Admin";

function App() {
  const [setFirst] = useState("Dionis");

  const { productItems } = Data;

  const [cartItem, setCardItem] = useState([]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
