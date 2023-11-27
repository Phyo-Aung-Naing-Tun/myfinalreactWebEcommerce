import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import UserInformation from "../Components/UserInformation";
import OrderHistoryTable from "../Components/OrderHistoryTable";

const Profile = () => {
  const isLogin = Cookies.get("userInfo");

  if (isLogin) {
    return (
      <div className=" w-full overflow-hidden ">
        <div>
          <UserInformation />
        </div>
        <div>
          <h1 className=" text-primary font-bold tracking-wider text-lg text-center lg:text-2xl">
            Order History
          </h1>
          <OrderHistoryTable />
        </div>
      </div>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default Profile;
