import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { IoCameraReverseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserInformation = () => {
  const inputRef = useRef();
  const imageRef = useRef();
  const nav = useNavigate();
  useEffect(() => {
    settingImg();
  }, []);
  const handleAddImg = () => {
    inputRef.current.click();
  };
  //setting profile img
  const settingImg = () => {
    const imgString = Cookies.get("profileImg");
    const userImg = imgString != undefined ? JSON.parse(imgString) : [];
    imageRef.current.src = userImg;
  };
  //showing userInformation
  const userInfoString = Cookies.get("userInfo");
  const userInfos =
    userInfoString != undefined ? JSON.parse(userInfoString) : [];

  return (
    <div className=" flex flex-wrap  items-end gap-8 lg:gap-[40px] w-[80%] rounded-lg my-10 shadow-lg p-[40px]  mx-auto">
      <div className="relative">
        <div
          style={{
            backgroundImage: `url(
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            )`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
          className="  w-[150px] h-[150px] overflow-hidden rounded-[150px] shadow-md"
        >
          <img ref={imageRef} className=" w-full h-full object-cover " />
        </div>
        <div className="absolute w-8 h-8 border-primary bg-gray-200 flex justify-center items-center rounded-2xl border  text-black text-xl font-bold z-10 bottom-0 right-4 hover:scale-[1.2] transition">
          <IoCameraReverseOutline
            onClick={handleAddImg}
            className="w-full h-full text-primary p-1"
          />
        </div>
      </div>
      <div className=" flex justify-between flex-wrap flex-1 items-end">
        <div>
          <h1 className=" text-primary font-bold tracking-wider text-lg">
            {userInfos?.user.name}
          </h1>
          <h3 className="mb-3 tracking-wider text-sm ">
            {userInfos?.user.email}
          </h3>
          <input
            onChange={(e) => {
              //getting img Url form file input
              const file = URL.createObjectURL(e.target.files[0]);
              imageRef.current.src = file;
              Cookies.set("profileImg", JSON.stringify(file));
            }}
            ref={inputRef}
            className="hidden"
            type="file"
            accept="image/* "
          />
        </div>
        <button
          onClick={() => {
            //this is from sweet alert
            Swal.fire({
              title: "Are you sure?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Log out!",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "Log out successful!",
                  icon: "success",
                });
                //this is for log out
                Cookies.remove("userInfo");
                nav("/");
              }
            });
          }}
          className=" btn btn-xs btn-error"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserInformation;
