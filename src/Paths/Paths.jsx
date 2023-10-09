import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Nav from "../Components/Nav";
import Products from "../Pages/Products";

const Paths = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
};

export default Paths;
