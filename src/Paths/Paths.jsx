import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Nav from "../Components/Nav";
import Products from "../Pages/Products";
import ProductDetail from "../Pages/ProductDetail";
import CartProduct from "../Pages/CartProduct";
import FooterSection from "../Components/FooterSection";
import Auth from "../Pages/Auth";

const Paths = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/detail" element={<ProductDetail />} />
        <Route path="/cart" element={<CartProduct />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
      <FooterSection />
    </div>
  );
};

export default Paths;
