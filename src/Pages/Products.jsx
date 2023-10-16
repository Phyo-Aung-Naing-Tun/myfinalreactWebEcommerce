import { useDispatch, useSelector } from "react-redux";
// import ProductCards from "../Components/ProductCards";
import CatagoryBar from "../Components/CatagoryBar";
import {
  getCurrentCategory,
  getFilterProducts,
} from "../Redux/Services/productSlice";
import ProductsContainer from "../Components/ProductsContainer";
import { useRef, useState } from "react";

const Products = () => {
  const { products, currentCategory, categories } = useSelector(
    (state) => state.productSlice
  );
  const inputRef = useRef();
  const [toggle, setToggle] = useState(true);

  const dispatch = useDispatch();

  const handleInput = (e) => {
    dispatch(getCurrentCategory("All"));
    dispatch(
      getFilterProducts(
        products?.filter((pd) =>
          pd.title.toLowerCase().includes(e.target.value.toLocaleLowerCase())
        )
      )
    );
    toggle && document.querySelector("#All").click(); //to change the category to All as soon as the search input is clicked
    setToggle(false); //to ban changing to the category after the search input is change
  };

  const handleCatagories = (e) => {
    inputRef.current.value = ""; //to clear the value inside the search input after clicking the cataegories' btn
    if (e.target.innerText == "All") {
      //for product runder in product page in big screen
      dispatch(getFilterProducts(products));
    } else {
      const filterData = products?.filter((pd) =>
        pd.category.toLowerCase().includes(e.target.innerText.toLowerCase())
      );
      dispatch(getFilterProducts(filterData));
    }

    dispatch(getCurrentCategory(e.target.innerText)); //for the badge that shows which catagory u selected
    //for product runder in product page in small screen
    if (e.target.classList.contains("tab")) {
      document.querySelector(".tab-active").classList.remove("tab-active");
      e.target.classList.add(
        "tab-active"
      ); /* for changing ui after click the cat bar in small device */
    }
    /* to change the same cata btn and products ui when chaging between big screen and small screen */
    if (e.target.classList.contains("cat-bar") && e.target.innerText == "All") {
      document.querySelector(`#All`).click();
    } else if (
      e.target.classList.contains("cat-bar") &&
      e.target.innerText == "Smartphones"
    ) {
      document.querySelector(`#smartphones`).click();
    } else if (
      e.target.classList.contains("cat-bar") &&
      e.target.innerText == "Laptops"
    ) {
      document.querySelector(`#laptops`).click();
    } else if (
      e.target.classList.contains("cat-bar") &&
      e.target.innerText == "Fragrances"
    ) {
      document.querySelector(`#fragrances`).click();
    } else if (
      e.target.classList.contains("cat-bar") &&
      e.target.innerText == "Skincare"
    ) {
      document.querySelector(`#skincare`).click();
    } else if (
      e.target.classList.contains("cat-bar") &&
      e.target.innerText == "Groceries"
    ) {
      document.querySelector(`#groceries`).click();
    } else if (
      e.target.classList.contains("cat-bar") &&
      e.target.innerText == "Home-Decoration"
    ) {
      document.querySelector(`#home-decoration`).click();
    }
    setToggle(true); //to change the category to All as soon as the search input is clicked
  };
  document.addEventListener("scroll", () => {
    console.dir(scrollY);
  });
  return (
    <div className=" w-full flex  ">
      <div
        id="sideBar"
        className=" relative hidden md:flex border-e border-info w-[200px]  min-h-screen"
      >
        <CatagoryBar handleCatagories={handleCatagories} />
      </div>

      <div id="productContainer" className=" flex flex-col    z-10 flex-1   ">
        <div className="  py-2 bg-base-100 z-30 flex justify-between items-center md:mx-20 mt-3">
          <div className=" hidden md:block text-[18px]  text-primary capitalize tracking-wider  font-bold">
            {currentCategory}
          </div>
          {/* search input form product page */}
          <input
            onChange={handleInput}
            ref={inputRef}
            type="text"
            placeholder="Find product"
            className="input input-bordered ms-5 md:ms-0  input-primary input-sm w-[180px] max-w-xs"
          />
        </div>
        <div className="tabs md:hidden tabs-boxed w-full mt-3 ">
          <a
            id="All"
            onClick={handleCatagories}
            key={"All"}
            className="tab text-primary capitalize tab-active tab-sm"
          >
            All
          </a>

          {categories?.map((cat) => (
            <a
              id={cat}
              onClick={handleCatagories}
              key={cat}
              className="tab text-primary capitalize  tab-sm"
            >
              {cat}
            </a>
          ))}
        </div>
        <ProductsContainer />
      </div>
    </div>
  );
};

export default Products;

// note click လုပ်ရင် button  ui မပြောင်းတာ products ကို runder လုပ်တိုင်း page က refresh ဖြစ်သွားလို့
// product container ကို component ခွဲလိုက်ရင် အဆင်ပြေသွားသည်။
