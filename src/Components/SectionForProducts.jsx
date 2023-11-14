import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SectionForProducts = () => {
  const [scrollValue, setScrollValue] = useState(0);
  const { products, categories } = useSelector((state) => state.productSlice);
  const scrollRef = useRef();

  const phoneFliterProducts = products.filter(
    (pd) => pd.category == categories[0]
  );
  const nav = useNavigate();
  const fliterProducts = [
    ...phoneFliterProducts,
    ...products.filter((pd) => pd.category == categories[1]),
  ];
  const makeScrollY = (e) => {
    const breakScroll =
      scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    const cardWidth =
      document.querySelector("#overlay-container").offsetWidth + 10;

    if (e.target.id == "scrollLeft" && scrollValue <= breakScroll) {
      scrollRef.current.scrollLeft = scrollValue + cardWidth;

      setScrollValue((pv) => pv + cardWidth);
    } else {
      scrollRef.current.scrollLeft = 0;
      setScrollValue(0);
    }
  };

  return (
    <div>
      <h3 className=" my-10 text-primary uppercase text-[14px] md:text-[20px] tracking-wider">
        {`Most Popular ${categories[0]} and ${categories[1]}`}{" "}
      </h3>
      <div ref={scrollRef} className=" whitespace-nowrap overflow-y-auto ">
        {fliterProducts.map((fp) => (
          <div
            id="overlay-container"
            className=" border rounded-md border-info shadow-md text-sm overflow-hidden inline-block w-[150px] h-[200px] mx-[10px] md:w-[200px] md:h-[250px]"
            key={fp.id}
          >
            <div className=" flex justify-center items-center" id="overlay">
              <button
                onClick={() => {
                  nav("/detail", { state: fp });
                }}
                className=" btn btn-primary tracking-wider  btn-xs"
              >
                Details
              </button>
            </div>
            <img src={fp.thumbnail} className=" object-contain w-full h-full" />
          </div>
        ))}
      </div>
      <div>
        <button
          id="scrollLeft"
          onClick={makeScrollY}
          className=" btn btn-primary pb-1 btn-sm font-bold btn-outline  text-[20px]"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default SectionForProducts;
