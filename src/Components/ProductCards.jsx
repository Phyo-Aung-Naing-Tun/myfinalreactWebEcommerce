import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import { BiSolidCartAdd } from "react-icons/bi";
import { plusTotalCost, setCartProduct } from "../Redux/Services/productSlice";
import Cookies from "js-cookie";

const ProductCards = (props) => {
  const { title, price, thumbnail, rating } = props;
  const starCount = "stars";
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleAddToCart = () => {
    dispatch(setCartProduct(props));
    dispatch(plusTotalCost(price));
    Cookies.set(title, JSON.stringify({ total: price, count: 1 }));
  };
  return (
    <div className="card inline-block w-[165px] md:w-[230px]  border border-info bg-base-100 shadow-xl">
      <figure>
        <img
          className="mt-4 w-full  h-[100px] md:h-[150px] object-contain"
          src={thumbnail}
          alt="Shoes"
        />
      </figure>
      <div className="card-body p-[10px]  md:p-[20px]">
        <h2 className="card-title   truncate tracking-wide text-[14px] capitalize  ">
          {title?.substring(0, 15)} ...
        </h2>
        <div className="text-[13px] md:flex   flex-wrap justify-between items-center tracking-wider font-semibold">
          <div className=" md:mb-0 mb-2">
            <span>Price : </span>
            <span className="text-primary font-semibold">{price} $</span>
          </div>
          <div className="flex">
            {[...starCount].map((n, index) => {
              return index < parseInt(rating) ? (
                <AiFillStar key={index} className=" text-orange-400" />
              ) : (
                <AiOutlineStar key={index} className="text-orange-400" />
              );
            })}
          </div>
        </div>

        <div className="card-actions mt-2 md:mt-3 justify-between">
          <button
            onClick={() => {
              nav("/detail", { state: props });
            }}
            className="btn text-[12px] font-bold btn-xs  btn-outline btn-primary"
          >
            Details
          </button>
          <button
            id={title}
            onClick={handleAddToCart}
            className={`btn text-[17px] disabled font-bold btn-xs   btn-primary `}
          >
            <BiSolidCartAdd />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
