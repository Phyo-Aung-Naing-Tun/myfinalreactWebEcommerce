import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Nav from "../Components/Nav";
import Products from "../Pages/Products";
import ProductDetail from "../Pages/ProductDetail";
import CartProduct from "../Pages/CartProduct";

const Paths = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/detail" element={<ProductDetail />} />
        <Route path="/cart" element={<CartProduct />} />
      </Routes>
    </div>
  );
};

export default Paths;
