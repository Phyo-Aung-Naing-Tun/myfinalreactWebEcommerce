import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  getCategories,
  getCurrentCategory,
  getFilterProducts,
  getProducts,
} from "../Redux/Services/productSlice";
import SectionForProducts from "../Components/SectionForProducts";
import { useNavigate } from "react-router-dom";
import FragrancesAndSkincareSection from "../Components/FragrancesAndSkincareSection";
import GroceriesSection from "../Components/GroceriesSection";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetching();
  }, []);
  const nav = useNavigate();

  const fetching = async () => {
    const api = await fetch("https://dummyjson.com/products");
    const { products } = await api.json();
    const duplicatedCategories = products?.map((p) => p.category);
    const categories = new Set(duplicatedCategories);
    dispatch(getProducts(products));
    dispatch(getFilterProducts(products));
    dispatch(getCategories([...categories]));
    dispatch(getCurrentCategory("All"));
    dispatch(getFilterProducts(products));
  };
  return (
    <div className="  h-full bg-base-100 text-center text-4xl font-bold">
      <div id="hero">
        <div
          style={{
            backgroundImage:
              "url(https://st4.depositphotos.com/13193658/30137/i/450/depositphotos_301375510-stock-illustration-young-woman-holding-credit-card.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "darken",
          }}
          className="  h-screen flex flex-col justify-center items-start"
        >
          <div className=" ms-4 md:ms-10 tracking-wider flex flex-col items-start lg:text-[3vw] text-base-100 md:gap-10  gap-4 text-[7vw]">
            <h1 className="  lg:text-[3vw]  font-bold text-[8vw]">
              All Your Favorites
            </h1>{" "}
            <h1>in one place. &#128525;</h1>
            <button
              onClick={() => nav("/products")}
              className=" btn btn-sm mt-4 md:mt-0 btn-primary "
            >
              Shop now
            </button>
          </div>
        </div>
        <div>
          <SectionForProducts />
          <FragrancesAndSkincareSection />
          <GroceriesSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
