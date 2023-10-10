import React from "react";
import { useSelector } from "react-redux";
import ProductCards from "../Components/ProductCards";

const Products = () => {
  const { products } = useSelector((state) => state.productSlice);
  console.log(products);
  return (
    <div className=" w-full flex">
      <div
        id="sideBar"
        className=" hidden md:flex border-e border-info w-[200px] min-h-screen"
      ></div>
      <div
        id="productContainer"
        className="  flex-grow min-h-screen p-[20px] flex flex-1 justify-center flex-wrap gap-[20px]  "
      >
        {products?.map((product) => (
          <ProductCards key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
