import React, { useRef } from "react";
import { useSelector } from "react-redux";

const CatagoryBar = ({ handleCatagories }) => {
  const { categories } = useSelector((state) => state.productSlice);

  return (
    <div className=" fixed top-[55px] p-5 w-full">
      <div className="  py-2">
        <h1 className="text-[18px] font-bold text-primary tracking-wider">
          Categories
        </h1>
      </div>
      <div className="  ps-3 gap-1 text-sm tracking-wider capitalize flex flex-col">
        <div
          onClick={handleCatagories}
          className="hover:text-primary tracking-wider cat-bar hover:font-bold transition w-[150px]"
        >
          All
        </div>
        {[...categories]?.map((cata) => (
          <div
            onClick={handleCatagories}
            className="hover:text-primary cat-bar hover:font-bold text-[15px]  tracking-wider transition w-[150px]"
            key={Math.random()}
          >
            {cata}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatagoryBar;
