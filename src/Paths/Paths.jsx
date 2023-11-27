import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Nav from "../Components/Nav";
import Products from "../Pages/Products";
import ProductDetail from "../Pages/ProductDetail";
import CartProduct from "../Pages/CartProduct";
import FooterSection from "../Components/FooterSection";
import Auth from "../Pages/Auth";
import Registor from "../Pages/Registor";
import Profile from "../Pages/Profile";

const Paths = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/detail" element={<ProductDetail />} />
        <Route path="/cart" element={<CartProduct />} />
        <Route path="/login" element={<Auth />} />
        <Route path="signup" element={<Registor />} />
      </Routes>
      <FooterSection />
    </div>
  );
};

export default Paths;
