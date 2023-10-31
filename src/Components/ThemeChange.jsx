import { IoIosArrowDown } from "react-icons/io";

const ThemeChange = () => {
  return (
    <div className="dropdown dropdown-end ">
      <label tabIndex={0} className="btn btn-outline btn-primary btn-sm ">
        Themes
        <IoIosArrowDown />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content w-[150px] gap-2 me-4 z-[1] menu p-2 shadow bg-base-100 rounded-box "
      >
        <li>
          <button
            onClick={() => {
              document.body.setAttribute("data-theme", "lemonade");
            }}
            className=" btn text-black border-2  bg-white btn-sm"
          >
            Light-Green
          </button>
        </li>
        <li>
          {" "}
          <button
            onClick={() => {
              document.body.setAttribute("data-theme", "dracula");
            }}
            className=" text-white btn bg-pink-400  btn-sm"
          >
            Dark-Pink
          </button>
        </li>
        <li>
          {" "}
          <button
            onClick={() => {
              document.body.setAttribute("data-theme", "luxury");
            }}
            className=" text-white btn bg-[#c99836] btn-sm"
          >
            Luxury
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ThemeChange;
