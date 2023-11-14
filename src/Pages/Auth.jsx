import React, { useRef, useState } from "react";
import { BsEnvelopeAt } from "react-icons/bs";
import { PiLockKeyFill } from "react-icons/pi";
import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "@mantine/core";
import { Link } from "react-router-dom";

const Auth = () => {
  const [toggle, setToggle] = useState(true);

  const inputRef = useRef();

  return (
    <div className=" relative flex justify-center items-center w-full h-[600px]">
      <div className=" w-[300px]  px-4 py-10  flex justify-center items-center">
        <div>
          <div className=" flex justify-center mb-3">
            <CgProfile className=" text-[70px] text-primary" />
          </div>
          <h1 className="font-bold uppercase text-xl tracking-wider mb-3 text-center text-primary">
            Welcome
          </h1>
          <form className=" flex  flex-wrap " action="#">
            <div className="w-full relative">
              <BsEnvelopeAt className=" absolute top-[30%] text-lg" />
              <input
                type="text"
                placeholder="your email"
                className=" w-full tracking-wider font-semibold decoration outline-none px-7 border-t-0 border-r-0 border-l-0 border-b-2 py-2 border border-b-primary bg-transparent "
              />
            </div>
            <div className=" mt-3 w-full relative">
              <PiLockKeyFill className=" absolute top-[30%] text-xl" />
              <div
                onClick={() => {
                  setToggle(!toggle);
                  inputRef.current.type = "text";
                }}
                id="visible"
                className={` absolute top-[30%] right-0 cursor-pointer ${
                  !toggle && "hidden"
                }`}
              >
                {" "}
                <AiOutlineEye />
              </div>

              <div
                onClick={() => {
                  setToggle(!toggle);
                  inputRef.current.type = "password";
                }}
                id="invisible"
                className={` absolute top-[30%] right-0 cursor-pointer   ${
                  toggle && "hidden"
                }`}
              >
                <AiFillEyeInvisible />
              </div>
              <input
                ref={inputRef}
                type="password"
                placeholder="your password"
                className=" w-full bg-transparent tracking-wider font-semibold decoration outline-none px-7 border-t-0 border-r-0 border-l-0 border-b-2 py-2 border border-b-primary select-none overflow-auto "
              />
            </div>
            <div className=" text-[13px] font-semibold tracking-wider mt-3">
              <span>Forget Password.</span>
              <Link className=" font-bold ms-2" top={"/"}>
                Sign up?
              </Link>
            </div>

            <button className=" w-full btn btn-primary btn-sm mt-7">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
