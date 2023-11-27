import Cookies from "js-cookie";
import React from "react";

const CheckOrderItems = ({ title, price }) => {
  const product = JSON.parse(Cookies.get(title));

  return (
    <div
      id="orderItems"
      className="flex justify-between text-[10px] lg:text-[15px]"
    >
      <h2 className="text-primary w-[80px] lg:w-[120px]  mb-2">
        {title.substring(0, 13)} ...
      </h2>
      <h2 className=" text-[8px] lg:text-[14px]">{`$${price} x ${product?.count} `}</h2>
      <h2 className=" text-[8px] lg:text-[14px]">${product?.total}</h2>
    </div>
  );
};

export default CheckOrderItems;
