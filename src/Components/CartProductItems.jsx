import React, { useEffect, useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  deleCartProduct,
  minusTotalCost,
  plusTotalCost,
} from "../Redux/Services/productSlice";
import Cookies from "js-cookie";
const CartProductItems = (props) => {
  const { title, thumbnail, category, price, id } = props;
  const { cartProducts } = useSelector((state) => state.productSlice);
  const dispatch = useDispatch();

  const product = JSON.parse(Cookies.get(title));
  const [count, setCount] = useState(product?.count);
  const [totalPrice, setTotalPrice] = useState(price);

  //to delete cart item
  const handleDelet = () => {
    const filterCartProducts = cartProducts?.filter(
      (product) => product.id != id
    );
    dispatch(deleCartProduct(filterCartProducts));
    dispatch(minusTotalCost(product?.total));
    Cookies.remove(title);
  };

  const decrease = () => {
    if (product?.count > 1) {
      setCount(product?.count - 1);
      setTotalPrice(price * product?.count);
      dispatch(minusTotalCost(price));
      Cookies.set(
        title,
        JSON.stringify({
          total: price * (product?.count - 1),
          count: count - 1,
        })
      );
    }
  };
  const increase = () => {
    setCount(product?.count + 1);
    setTotalPrice(price * product?.count);
    dispatch(plusTotalCost(price));
    Cookies.set(
      title,
      JSON.stringify({ total: price * (product?.count + 1), count: count + 1 })
    );
  };
  console.log(product);
  return (
    <div className=" shadow-md py-3 px-3   flex flex-wrap md:justify-evenly items-center">
      <div className="flex w-full md:w-[250px]  truncate me-3  items-center gap-4">
        <div className=" w-[45px] lg:w-[80px] rounded-md overflow-hidden items-center h-[45px] lg:h-[80px]">
          <img
            className=" w-full h-full  object-cover"
            src={thumbnail}
            alt="img"
          />
        </div>
        <div className="flex md:block md:gap-0  w-full justify-between md:w-auto gap-3">
          <h1 className=" text-primary  text-[13px] lg:text-[15px] font-bold tracking-wider mb-1">
            {title.substring(0, 15)} ...
          </h1>
          <h2 className="hidden md:block text-[11px]  lg:text-[13px] font-semibold capitalize tracking-wider mb-2">
            {category}
          </h2>
          <button
            onClick={handleDelet}
            className=" text-white text-[10px]   btn btn-xs bg-red-500"
          >
            <BsTrash3 />
          </button>
        </div>
      </div>

      <div className="flex items-center mt-2 lg:mt-0 w-full md:w-[400px] lg:w-[350px]  justify-between">
        <div
          id="btn-container"
          className="   flex md:justify-center gap-2 md:gap-4 items-center"
        >
          <button
            onClick={decrease}
            className="lg:btn-sm btn-xs btn-outline btn btn-primary  font-bold text-[15px] lg:text-[18px]"
          >
            <FiMinus />
          </button>
          <div className=" text-[14px]  lg:text-[16px] font-bold text-primary w-[20px] select-none pointer-events-none text-center">
            {product?.count}
          </div>
          <button
            onClick={increase}
            className="lg:btn-sm btn-xs btn-outline btn btn-primary  font-bold text-[15px] lg:text-[18px]"
          >
            <FiPlus />
          </button>
        </div>
        <div className="  md:w-[60px] text-[14px]  text-center select-none pointer-events-none font-semibold">
          ${price}
        </div>
        <div
          id="total-price"
          value={totalPrice}
          className="  md:w-[60px] text-[14px] text-center select-none pointer-events-none  font-bold text-primary"
        >
          ${product?.total}
        </div>
      </div>
    </div>
  );
};

export default CartProductItems;
