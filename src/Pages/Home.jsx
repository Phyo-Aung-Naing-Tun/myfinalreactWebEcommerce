import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getCategories,
  getCurrentCategory,
  getFilterProducts,
  getProducts,
} from "../Redux/Services/productSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetching();
  }, []);

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
    <div className=" w-full h-full bg-blue-100    dark:bg-white text-center text-4xl font-bold">
      <button className="btn btn-primary">home</button>
    </div>
  );
};

export default Home;
