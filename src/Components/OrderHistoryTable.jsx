import Cookies from "js-cookie";
import { BsShop } from "react-icons/bs";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resetOrderHistories } from "../Redux/Services/productSlice";
import { useState } from "react";

const OrderHistoryTable = () => {
  const [orderDetail, setOrderDetail] = useState({}); //getting  data to show order detail
  const orderHistorySting = Cookies.get("orderHistories");
  const nav = useNavigate();
  const dispatch = useDispatch();
  const orderHistories =
    orderHistorySting != undefined ? JSON.parse(orderHistorySting) : [];
  const handleShowDetail = (e) => {
    document.getElementById("my_modal_1").showModal();
    const [filterOrder] = orderHistories.filter(
      (order) => order.id == e.target.id
    );
    setOrderDetail(filterOrder);
  };

  const handleDelete = (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your history has been deleted.",
          icon: "success",
        });
        const filtering = orderHistories?.filter(
          (order) => order.id != e.target.id
        );
        dispatch(resetOrderHistories(filtering));
        Cookies.remove("orderHistories");
        Cookies.set("orderHistories", JSON.stringify(filtering));
        nav("/profile");
      }
    });
  };
  return (
    <div className=" my-10 lg:my-20 overflow-scroll shadow-lg lg:mx-10 ">
      <table className="table table-xs md:table table-zebra ">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Date</th>
            <th>Time</th>
            <th>Item Quentity</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderHistories?.map((order, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{order.date}</td>
              <td>{order.time}</td>
              <td>{order.orders.length}</td>
              <td>$ {order.totalCost}</td>
              <td className=" flex items-center justify-start gap-3">
                <button
                  id={order.id}
                  onClick={handleShowDetail}
                  className="btn-xs text-md cursor-pointer btn-primary btn"
                >
                  &#128270;
                </button>
                <button
                  className="bg-red-500 text-white  cursor-pointer btn-xs btn"
                  onClick={handleDelete}
                  id={order.id}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*Modal box to show detail */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold flex justify-center items-center gap-3 text-lg text-center text-primary">
            <BsShop /> Shop
          </h3>
          <h3 className=" text-sm mt-2 font-semibold text-center">
            A One-Stop Shop for All of Your Needs!
          </h3>
          <h4 className=" text-xs  mt-3">Time : {orderDetail?.time}</h4>
          <h4 className=" text-xs  ">Date : {orderDetail?.date}</h4>

          <div className=" overflow-x-auto mt-3">
            <table className="table overflow-scroll table-xs">
              <thead>
                <tr>
                  <th></th>
                  <th>Item</th>
                  <th>Price & Qty</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail?.orders?.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.model}</td>
                    <td>${order.pricePerUnit}</td>
                    <td>${order.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className=" text-xs font-bold mt-5">
              Total Cost : <span className=" "> ${orderDetail?.totalCost}</span>{" "}
            </h3>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* l close the modal */}

              <button className="btn btn-outline btn-primary tracking-wider btn-xs">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default OrderHistoryTable;
