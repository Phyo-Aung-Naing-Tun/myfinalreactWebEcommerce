import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProductItems from "../Components/CartProductItems";
import CheckOrderItems from "../Components/CheckOrderItems";
import { useNavigate } from "react-router-dom";
import {
  deleCartProduct,
  deleteTotalCost,
  setOrderHistories,
} from "../Redux/Services/productSlice";
import { BsShop } from "react-icons/bs";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const CartProduct = () => {
  const { cartProducts, totalCost, orderHistory } = useSelector(
    (state) => state.productSlice
  );
  const dispatch = useDispatch();
  const tableRef = useRef();
  const nav = useNavigate();
  let allOfCustomerOrder = []; //for getting all cx orders and to add in vouncherinfo obj;

  const userInfo = Cookies.get("userInfo"); //to check the user login
  //getting cx order infos
  const getOrderInfos = () => {
    [...document.querySelectorAll("#orderItems")].map((items) => {
      //cutting the string
      const mixString = items.innerText;
      const parts = mixString.split("$");
      const model = parts[0];
      const pricePerUnit = parts[1];
      const totalPrice = parts[2];
      const detailObj = {
        model,
        pricePerUnit,
        totalPrice,
      };
      allOfCustomerOrder.push(detailObj);
    });
  };
  //vouccherInfoss
  const vouncherInfos = {
    id: "",
    date: `${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}}`,
    time: `${new Date().toLocaleTimeString()}`,
    totalCost,
    orders: allOfCustomerOrder,
  };
  if (cartProducts.length) {
    return (
      <div className=" flex flex-wrap  w-full  relative">
        <div className=" lg:w-[70%] w-full  min-h-screen flex flex-col gap-5 border-e border-info  p-5 ">
          {cartProducts?.map((cp) => (
            <CartProductItems key={cp.id} {...cp} />
          ))}
        </div>
        <div className=" lg:h-full w-full bg-base-100 left-0 right-0   sticky bottom-0   md:top-[60px]  lg:w-[30%] flex flex-col gap-4  p-5">
          <div
            id="total-cost"
            className=" text-primary font-bold tracking-wider rounded border-primary p-2 lg:p-3 border-2 flex justify-between w-full"
          >
            <h1>Total Cost : </h1>
            <h1>${totalCost}</h1>
          </div>
          <div className="hidden lg:block p-2 w-full shadow-lg  overflow-y-auto h-[405px]">
            {cartProducts?.map((cp) => (
              <CheckOrderItems {...cp} key={cp.id} />
            ))}
          </div>
          <button
            onClick={() => {
              //checking whether the user is login or not
              if (userInfo == undefined) {
                nav("/login");
              } else {
                getOrderInfos();

                // creating an obj to display the cx order history in profile
                vouncherInfos.id = Date.now();
                vouncherInfos.date = `${new Date().getDate()}/${
                  new Date().getMonth() + 1
                }/${new Date().getFullYear()}`;
                vouncherInfos.time = `${new Date().toLocaleTimeString()}`;
                vouncherInfos.orders = allOfCustomerOrder;
                //open modal
                document.getElementById("my_modal_1").showModal();
                //putting table body
                allOfCustomerOrder.map((order, index) => {
                  tableRef.current.innerHTML += `
                <tr key={${order.model}}>
                      <td>${index + 1}</td>
                      <td>${order.model}</td>
                      <td>$ ${order.pricePerUnit}</td>
                      <td>$ ${order.totalPrice}</td>
                    </tr>

                `;
                });
              }
            }}
            className="btn tracking-wider font-bold btn-primary btn-sm md:btn-md w-full  left-[100px] right-[100px]"
          >
            Confirm Order
          </button>
          {/*  vouncher to show after clicking confirm order btn */}
          <dialog id="my_modal_1" className="modal select-none">
            <div className="modal-box">
              <h3 className="font-bold flex justify-center items-center gap-3 text-lg text-center text-primary">
                <BsShop /> Shop
              </h3>
              <h3 className=" text-sm mt-2 font-semibold text-center">
                A One-Stop Shop for All of Your Needs!
              </h3>
              <h4 className=" text-xs  mt-3">Time : {vouncherInfos.time}</h4>
              <h4 className=" text-xs  ">
                Date : {`${vouncherInfos.date.replace("}", "")}`}
              </h4>
              <h1>{vouncherInfos.orders}</h1>
              <div className="overflow-x-auto mt-3">
                <table className="table table-xs">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Item</th>
                      <th>Price & Qty</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody ref={tableRef}></tbody>
                </table>
                <h3 className=" text-xs font-bold mt-5">
                  Total Cost : <span className=" ">$ {totalCost}</span>{" "}
                </h3>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button
                    onClick={() => {
                      dispatch(setOrderHistories(vouncherInfos));
                      tableRef.current.innerHTML = "";
                      dispatch(deleCartProduct([]));
                      dispatch(deleteTotalCost());
                      allOfCustomerOrder = [];
                      nav("/products");

                      Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Order Successful.",
                        showConfirmButton: false,
                        timer: 1500,
                      });

                      if (orderHistory.length > 0) {
                        Cookies.set(
                          "orderHistories",
                          JSON.stringify([...orderHistory, vouncherInfos])
                        );
                      } else {
                        const cookiesHistory = JSON.parse(
                          Cookies.get("orderHistories")
                        );
                        Cookies.set(
                          "orderHistories",
                          JSON.stringify([...cookiesHistory, vouncherInfos])
                        );
                      }
                    }}
                    className=" btn btn-xs btn-primary me-2 tracking-wider"
                  >
                    Order Now
                  </button>
                  <button
                    onClick={() => {
                      tableRef.current.innerHTML = "";
                      allOfCustomerOrder = [];
                    }}
                    className="btn btn-error tracking-wider btn-xs"
                  >
                    Cancle
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    );
  } else {
    //to show if there is no product in cart
    return (
      <div className="  tracking-wider font-bold md:font-semibold flex gap-4 flex-col items-center h-screen justify-center">
        <div className="text-[4vw]">&#128549; Sorry! Your cart is empty.</div>
        <div>
          <button
            onClick={() => nav("/products")}
            className=" btn btn-sm btn-primary"
          >
            Shop NOw
          </button>
        </div>
      </div>
    );
  }
};

export default CartProduct;
