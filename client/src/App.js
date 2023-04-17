import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//pages
import {Home,Contact, Login, Register, Reset} from "./pages/"
//components
import {Header, Footer} from "./components/index";



function App() {

  const [first, setFirst] = useState("Dionis");
  
  return (
    <>
    <BrowserRouter> 
    <Header/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/Contact" element={ <Contact/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/reset" element={ <Reset/> } />

      
      </Routes>

    <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
