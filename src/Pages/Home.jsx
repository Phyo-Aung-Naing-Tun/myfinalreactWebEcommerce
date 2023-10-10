import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../Redux/Services/productSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetching();
  }, []);

  const fetching = async () => {
    const api = await fetch("https://fakestoreapi.com/products");
    const data = await api.json();
    dispatch(getProducts(data));
  };
  return (
    <div className=" w-full h-full bg-blue-100    dark:bg-white text-center text-4xl font-bold">
      <button className="btn btn-primary">home</button>
    </div>
  );
};

export default Home;
