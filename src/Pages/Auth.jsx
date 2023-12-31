import React, { useRef, useState } from "react";
import { BsEnvelopeAt } from "react-icons/bs";
import { PiLockKeyFill } from "react-icons/pi";
import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useGetLoginMutation } from "../Redux/Api/Authapi";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Auth = () => {
  const [toggle, setToggle] = useState(true);
  const [getLogin, { isLoading }] = useGetLoginMutation();
  const formRef = useRef();
  const inputRef = useRef();
  const nav = useNavigate();
  const loginAlert = (type, message) => {
    Swal.fire({
      position: "center",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      email: formRef.current[0].value,
      password: formRef.current[1].value,
    };
    try {
      const { data } = await getLogin(loginData);
      if (data?.success) {
        Cookies.set(
          "userInfo",
          JSON.stringify({ token: data.token, user: data.user })
        );
        loginAlert(
          "success",
          `Login Successful! Welcome ${data.user.name} &#128525`
        );
        nav("/profile");
      } else {
        loginAlert("error", "Login Fail.Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" relative flex justify-center items-center w-full h-[600px]">
      <div className=" w-[300px]  px-4 py-10  flex justify-center items-center">
        <div>
          <div className=" flex justify-center mb-3">
            <CgProfile className=" text-[70px] text-primary" />
          </div>
          <h1 className="font-bold uppercase text-xl tracking-wider mb-3 text-center text-primary">
            Log in please.
          </h1>
          <form
            onSubmit={handleLogin}
            ref={formRef}
            className=" flex  flex-wrap "
            action="#"
          >
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
              <Link className=" font-bold ms-2" to={"/signup"}>
                Sign up?
              </Link>
            </div>

            <button
              type="submit"
              className=" w-full btn btn-primary btn-sm mt-7"
            >
              {isLoading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                " Sign in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
