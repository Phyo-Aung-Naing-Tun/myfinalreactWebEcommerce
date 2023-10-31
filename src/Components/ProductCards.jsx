import { useDispatch, useSelector } from "react-redux";
import { Link, json, useNavigate } from "react-router-dom";
import {
  deleCartProduct,
  plusTotalCost,
  setCartProduct,
} from "../Redux/Services/productSlice";
import Cookies from "js-cookie";

const ProductCards = (props) => {
  const { title, price, description, thumbnail } = props;
  const { cartProducts } = useSelector((state) => state.productSlice);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleAddToCart = (e) => {
    dispatch(setCartProduct(props));
    e.target.classList.add("bg-red-500");
    dispatch(plusTotalCost(price));
    Cookies.set(title, JSON.stringify({ total: price, count: 1 }));
  };
  return (
    <div className="card w-[230px] sm:w-[250px] border border-info bg-base-100 shadow-xl">
      <figure>
        <img
          className="mt-4 w-full  h-[130px] md:h-[150px] object-contain"
          src={thumbnail}
          alt="Shoes"
        />
      </figure>
      <div className="card-body p-[20px]">
        <h2 className="card-title tracking-wide text-[18px] capitalize  ">
          {title?.substring(0, 12)} ...
        </h2>
        <div className="">
          <span>Price : </span>
          <span className="text-primary font-semibold">{price} $</span>
        </div>
        <p className=" text-[13px] tracking-wider">
          {description?.substring(0, 33)} ...
        </p>
        <div className="card-actions mt-3 justify-between">
          <button
            onClick={() => {
              nav("/detail", { state: props });
            }}
            className="btn text-[12px] font-bold btn-xs   md:btn-sm btn-outline btn-primary"
          >
            Details
          </button>
          <button
            id={title}
            onClick={handleAddToCart}
            className={`btn text-[12px] disabled font-bold btn-xs md:btn-sm btn-primary `}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
