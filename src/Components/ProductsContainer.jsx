import React from "react";
import { useSelector } from "react-redux";
import ProductCards from "../Components/ProductCards";

const ProductsContainer = () => {
  const { filterProducts } = useSelector((state) => state.productSlice);
  return (
    <div
      id="productContainer"
      className="  flex-grow min-h-screen  p-[20px] flex flex-1 justify-center items-start flex-wrap gap-[20px]  "
    >
      {filterProducts?.map((product) => (
        <ProductCards key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductsContainer;
