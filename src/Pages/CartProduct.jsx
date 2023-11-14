import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartProductItems from "../Components/CartProductItems";
import CheckOrderItems from "../Components/CheckOrderItems";
import { useNavigate } from "react-router-dom";

const CartProduct = () => {
  const { cartProducts, totalCost } = useSelector(
    (state) => state.productSlice
  );
  const nav = useNavigate();

  if (cartProducts.length) {
    return (
      <div className=" flex flex-wrap  w-full  relative">
        <div className=" lg:w-[70%] w-full  min-h-screen flex flex-col gap-5 border-e border-info  p-5 ">
          {cartProducts?.map((cp) => (
            <CartProductItems key={cp.id} {...cp} />
          ))}
        </div>
        <div className=" lg:h-full w-full bg-base-100 left-0 right-0   sticky bottom-0   md:top-[60px]  lg:w-[30%] flex flex-col gap-4  p-5">
          <div
            id="total-cost"
            className=" text-primary font-bold tracking-wider rounded border-primary p-2 lg:p-3 border-2 flex justify-between w-full"
          >
            <h1>Total Cost : </h1>
            <h1>${totalCost}</h1>
          </div>
          <div className="hidden lg:block p-2 w-full shadow-lg  overflow-y-auto h-[405px]">
            {cartProducts?.map((cp) => (
              <CheckOrderItems {...cp} key={cp.id} />
            ))}
          </div>
          <button className="btn tracking-wider font-bold btn-primary btn-sm md:btn-md w-full  left-[100px] right-[100px]">
            Confirm Order
          </button>
        </div>
      </div>
    );
  } else {
    //to show if there is no products in cart
    return (
      <div className="  tracking-wider font-bold md:font-semibold flex gap-4 flex-col items-center h-screen justify-center">
        <div className="text-[4vw]">&#128549; Sorry! Your cart is empty.</div>
        <div>
          <button
            onClick={() => nav("/products")}
            className=" btn btn-sm btn-primary"
          >
            Shop NOw
          </button>
        </div>
      </div>
    );
  }
};

export default CartProduct;
