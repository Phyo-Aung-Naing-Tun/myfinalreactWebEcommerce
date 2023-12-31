import { BsShop } from "react-icons/bs";
import { TiShoppingCart } from "react-icons/ti";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { VscThreeBars } from "react-icons/vsc";
import ThemeChange from "./ThemeChange";
import { useSelector } from "react-redux";

const Nav = () => {
  const { cartProducts } = useSelector((state) => state.productSlice);
  const nav = useNavigate();

  return (
    <div
      id="navbar"
      className="  sticky bg-base-100 top-0 z-20 transition shadow-md border-b border-info flex items-center"
    >
      <div className="navbar  bg-base-100">
        <div className="flex-1">
          <a
            onClick={() => {
              nav("/");
            }}
            className="btn text-primary btn-ghost normal-case text-xl"
          >
            <BsShop />
            Shop
          </a>
        </div>
      </div>
      <div className=" bg-base-100  me-[30px]  gap-4 flex items-center">
        <ul className=" hidden md:flex w-[350px] flex-wrap gap-2 items-center justify-between  ">
          <li>
            <NavLink
              id="home"
              to={"/"}
              className={` hover:text-[16px] transition font-semibold text-[15px] tracking-wider text-primary
              }`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              id="products"
              to={"/products"}
              className={` hover:text-[16px] transition font-semibold text-[15px] tracking-wider text-primary
              }`}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              id="profile"
              to={"/profile"}
              className=" hover:text-[16px] transition font-semibold text-[15px] text-primary tracking-wider"
            >
              Profile
            </NavLink>
          </li>
          <li>
            <ThemeChange />
          </li>
        </ul>
        <Link to={"/cart"} className=" relative">
          <span className="btn  btn-primary btn-sm btm-square" href="#">
            <TiShoppingCart />
          </span>
          <button className=" flex justify-center items-center rounded-lg absolute top-[-10px] right-[-10px] text-sm font-semibold bg-red-500 text-white w-[20px] h-[20px]">
            {cartProducts.length}
          </button>
        </Link>
        <div className="dropdown dropdown-end block md:hidden">
          <label tabIndex={0} className="btn btn-sm ">
            <VscThreeBars className="text-[15px] md:text-[2em]" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content w-[150px] gap-2 me-4 z-[1] menu p-2 shadow bg-base-100 rounded-box "
          >
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/products"}>Products</NavLink>
            </li>
            <li>
              <NavLink to={"/profile"}>Profile</NavLink>
            </li>
            <hr className="mt-2" />
            <h2 className=" text-primary text-[15px] font-semibold">Themes</h2>
            <div className=" my-2 flex justify-evenly">
              <div
                onClick={() => {
                  document.body.setAttribute("data-theme", "lemonade");
                }}
                className=" cursor-pointer border border-gray-500 rounded-[100%] hover:scale-[1.2] transition p-3 bg-white"
              ></div>
              <div
                onClick={() => {
                  document.body.setAttribute("data-theme", "dracula");
                }}
                className=" cursor-pointer border border-gray-500 rounded-[100%] hover:scale-[1.2] transition p-3 bg-pink-400"
              ></div>
              <div
                onClick={() => {
                  document.body.setAttribute("data-theme", "luxury");
                }}
                className=" cursor-pointer border border-gray-500 rounded-[100%] hover:scale-[1.2] transition p-3 bg-[#c99836]"
              ></div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
