import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { plusTotalCost, setCartProduct } from "../Redux/Services/productSlice";
import Cookies from "js-cookie";

const ProductDetail = () => {
  const product = useLocation().state;
  const [img, setImg] = useState(product?.images[0]);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const starCount = "stars"; //to create 5 stars
  const imgHandeller = (e) => {
    setImg(e.target.src);
  };

  return (
    <div className=" py-10 md:py-0   w-full md:h-screen flex gap-6  justify-center md:flex-row flex-col-reverse items-center">
      <div className=" md:w-[47%] flex justify-center items-center  ">
        <img
          className=" w-[80%]  md:h-[400px] object-contain shadow-lg"
          src={img}
        />
      </div>
      <div className=" md:w-[47%] px-10 md:px-0">
        <h1 className=" tracking-wider capitalize mb-5 text-[25px] md:text-[30px] font-bold text-primary">
          {product?.title}
        </h1>
        <div className=" badge badge-ghost uppercase font-bold tracking-wider mb-5">
          {product?.category}
        </div>
        <p className=" tracking-widest leading-7 mb-4">
          {product?.description}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <span className="  line-through  text-[16px]">
              ${product?.price}
            </span>
            <span className=" ms-3   text-red-500 font-bold text-[17px]">
              ${Math.floor(product?.price - product?.discountPercentage * 0.01)}
            </span>
          </div>
          <div id="star-container" className="flex ">
            {[...starCount].map((n, index) => {
              return index < parseInt(product?.rating) ? (
                <AiFillStar key={index} className=" text-orange-400" />
              ) : (
                <AiOutlineStar key={index} className="text-orange-400" />
              );
            })}
          </div>
        </div>
        <div
          className=" flex justify-between mt-5 items-center"
          id="btn-container"
        >
          <button
            onClick={() => nav(-1)}
            className=" btn btn-sm btn-outline  btn-primary"
          >
            Back
          </button>
          <button
            onClick={() => {
              dispatch(setCartProduct(product));
              dispatch(plusTotalCost(product?.price));
              Cookies.set(
                product?.title,
                JSON.stringify({ total: product?.price, count: 1 })
              );
            }}
            className=" btn btn-sm btn-primary"
          >
            Add to Cart
          </button>
        </div>
        <div
          id="img-container"
          className="flex my-5 md:my-10 flex-wrap  justify-start items-center gap-[20px]"
        >
          {product?.images.map((img, index) => (
            <div
              className=" w-[40px] h-[40px] md:w-[60px] shadow-sm border-2 rounded-md hover:scale-[1.3] transition border-primary overflow-hidden  md:h-[60px]"
              key={index}
            >
              <img
                onClick={imgHandeller}
                className=" w-[40px] h-[40px] md:w-[60px]  md:h-[60px] object-cover"
                src={img}
              />{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
