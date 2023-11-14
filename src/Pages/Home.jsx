import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getCategories,
  getCurrentCategory,
  getFilterProducts,
  getProducts,
} from "../Redux/Services/productSlice";
import SectionForProducts from "../Components/SectionForProducts";
// import SectionForProductsInSmScreen from "../Components/SectionForProductsInSmScreen";
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
              "url(https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?w=1380&t=st=1699023049~exp=1699023649~hmac=d0ee742a0cd7c0805d9437e4e35f866e1a0939d31413ac80085ab62a5690dd77)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="  h-screen flex flex-col justify-center items-start"
        >
          <div className=" ms-4 md:ms-10 tracking-wider flex flex-col items-start lg:text-[3vw] text-base-100 gap-10  sm:gap-6 text-[7vw]">
            <h1 className=" lg:text-[3vw]  font-bold text-[8vw]">
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
