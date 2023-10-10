import React, { useState } from "react";
import { BsShop } from "react-icons/bs";
import { TiShoppingCart } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { VscThreeBars } from "react-icons/vsc";
import ThemeChange from "./ThemeChange";

const Nav = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <div className=" min-w-full border-b border-info flex items-center">
      <div className="navbar  bg-base-100">
        <div className="flex-1">
          <a className="btn text-primary btn-ghost normal-case text-xl">
            <BsShop />
            Shop
          </a>
        </div>
      </div>
      <div className=" me-[30px]  gap-4 flex items-center">
        <ul className=" hidden md:flex w-[350px] flex-wrap gap-2 items-center justify-between  ">
          <li>
            <NavLink
              onClick={() => setToggle((pv) => !pv)}
              to={"/"}
              className={` hover:text-blue-500 ${toggle && "text-primary"}`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setToggle((pv) => !pv)}
              to={"/products"}
              className={` hover:text-blue-500 ${!toggle && "text-primary"}`}
            >
              Products
            </NavLink>
          </li>
          <li>
            <ThemeChange />
          </li>
          <li>
            <a
              href="#"
              className=" btn-sm btn btn-outline btn-primary flex items-center gap-2"
            >
              Profile
              <IoIosArrowDown />
            </a>
          </li>
        </ul>
        <div className=" relative">
          <a className="btn  btn-primary btn-sm btm-square" href="#">
            <TiShoppingCart />
          </a>
          <button className=" flex justify-center items-center rounded-lg absolute top-[-10px] right-[-10px] text-sm font-semibold bg-red-500 text-white w-[20px] h-[20px]">
            0
          </button>
        </div>
        <div className="dropdown dropdown-end block md:hidden">
          <label tabIndex={0} className="btn btn-sm ">
            <VscThreeBars className="text-[2em]" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content w-[150px] gap-2 me-4 z-[1] menu p-2 shadow bg-base-100 rounded-box "
          >
            <li>
              <NavLink
                onClick={() => setToggle((pv) => !pv)}
                to={"/"}
                className={` hover:text-blue-500 ${toggle && "text-blue-500"}`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setToggle((pv) => !pv)}
                to={"/products"}
                className={` hover:text-blue-500 ${!toggle && "text-blue-500"}`}
              >
                Products
              </NavLink>
            </li>
            <li>
              <a
                href="#"
                className=" btn-sm btn btn-outline btn-primary flex items-center gap-2"
              >
                Profile
                <IoIosArrowDown />
              </a>
            </li>
            <hr className="mt-2" />
            <h2 className=" text-secondary font-semibold">Themes</h2>
            <div className=" my-2 flex justify-evenly">
              <div
                onClick={() => {
                  document.body.setAttribute("data-theme", "light");
                }}
                className=" cursor-pointer border border-info rounded-[100%] hover:scale-[1.2] transition p-3 bg-white"
              ></div>
              <div
                onClick={() => {
                  document.body.setAttribute("data-theme", "dark");
                }}
                className=" cursor-pointer border border-info rounded-[100%] hover:scale-[1.2] transition p-3 bg-black"
              ></div>
              <div
                onClick={() => {
                  document.body.setAttribute("data-theme", "cupcake");
                }}
                className=" cursor-pointer border border-info rounded-[100%] hover:scale-[1.2] transition p-3 bg-green-600"
              ></div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
