import React, { useRef, useState } from "react";
import { BsEnvelopeAt } from "react-icons/bs";
import { PiLockKeyFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { useGetSignInMutation } from "../Redux/Api/Authapi";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Registor = () => {
  const formRef = useRef();
  const nav = useNavigate();
  const [getSignIn, { isLoading }] = useGetSignInMutation();
  const signinAlert = (type, message) => {
    Swal.fire({
      position: "center",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleform = async (e) => {
    e.preventDefault();
    const registrationData = {
      name: formRef.current[0].value,
      email: formRef.current[1].value,
      password: formRef.current[2].value,
      password_confirmation: formRef.current[3].value,
    };
    try {
      const { data } = await getSignIn(registrationData);

      if (data?.success) {
        signinAlert("success", data?.message);
        nav("/login");
      } else {
        signinAlert("error", "Sign in Fail. Please try again");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" relative flex justify-center items-center w-full h-[600px]">
      <div
        className=" w-[300px]  px-4
       py-10  flex justify-center items-center"
      >
        <div>
          <div className=" flex justify-center mb-3">
            <CgProfile className=" text-[70px] text-primary" />
          </div>
          <h1 className="font-bold uppercase text-xl tracking-wider mb-3 text-center text-primary">
            Welcome
          </h1>
          <form
            onSubmit={handleform}
            ref={formRef}
            className=" flex  flex-wrap "
            action="#"
          >
            <div id="username" className="w-full relative">
              <FaUser className=" absolute top-[30%] text-lg" />
              <input
                type="text"
                placeholder="your name"
                className=" w-full tracking-wider font-semibold decoration outline-none px-7 border-t-0 border-r-0 border-l-0 border-b-2 py-2 border border-b-primary bg-transparent "
              />
            </div>
            <div id="email" className="w-full mt-3 relative">
              <BsEnvelopeAt className=" absolute top-[30%] text-lg" />
              <input
                type="text"
                placeholder="your email"
                className=" w-full tracking-wider font-semibold decoration outline-none px-7 border-t-0 border-r-0 border-l-0 border-b-2 py-2 border border-b-primary bg-transparent "
              />
            </div>
            <div id="password" className=" mt-3 w-full relative">
              <PiLockKeyFill className=" absolute top-[30%] text-xl" />

              <input
                type="text"
                placeholder="your password"
                className=" w-full bg-transparent tracking-wider font-semibold decoration outline-none px-7 border-t-0 border-r-0 border-l-0 border-b-2 py-2 border border-b-primary select-none overflow-auto "
              />
            </div>
            <div id="confirm-password" className=" mt-3 w-full relative">
              <PiLockKeyFill className=" absolute top-[30%] text-xl" />

              <input
                type="text"
                placeholder="confirm password"
                className=" w-full bg-transparent tracking-wider font-semibold decoration outline-none px-7 border-t-0 border-r-0 border-l-0 border-b-2 py-2 border border-b-primary select-none overflow-auto "
              />
            </div>
            <div className=" text-[13px] font-semibold tracking-wider mt-3">
              <span>Already have an account?</span>
              <Link className=" font-bold ms-2" to={"/login"}>
                Login?
              </Link>
            </div>

            <button
              type="submit"
              className=" w-full btn  btn-primary btn-sm mt-7"
            >
              {isLoading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                " Sign up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registor;
