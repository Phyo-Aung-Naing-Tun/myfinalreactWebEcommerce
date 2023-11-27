import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FragrancesAndSkincareSection = () => {
  const [scrollValue, setScrollValue] = useState(0);
  const { products, categories } = useSelector((state) => state.productSlice);
  const scrollRef = useRef();

  const phoneFliterProducts = products.filter(
    (pd) => pd.category == categories[2]
  );
  const nav = useNavigate();
  const fliterProducts = [
    ...phoneFliterProducts,
    ...products.filter((pd) => pd.category == categories[3]),
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
  // top-[-20px] absolute bg-base-100 px-2 right-[calc(100/ 2)]
  return (
    <div className=" relative">
      <hr className=" mt-10 mb-16 w-full  h-[2px] bg-primary top-[-13px] absolute   px-2 right-0" />

      <h3 className=" text-primary uppercase text-[14px] bg-base-100 mb-10 inline-block relative px-4 z-10  md:text-[20px]  tracking-wider">
        {`${categories[2]} and ${categories[3]}`}{" "}
      </h3>
      <div
        ref={scrollRef}
        className=" mt-10 whitespace-nowrap overflow-y-auto "
      >
        {fliterProducts.map((fp) => (
          <div
            id="overlay-container"
            className=" border rounded-md border-info shadow-md text-sm overflow-hidden inline-block w-[150px] h-[200px] mx-[10px] md:w-[200px] md:h-[250px]"
            key={fp.id}
          >
            <div
              className=" flex justify-center items-center   flex-col "
              id="overlay"
            >
              <h1 className=" tracking-wider font-bold text-lg mb-3  text-primary ">
                {fp.title.substring(0, 16)} ...
              </h1>
              <h1 className=" mb-3 tracking-wider font-semibold text-white">
                Price : ${fp.price}
              </h1>
              <button
                onClick={() => {
                  nav("/detail", { state: fp });
                }}
                className=" btn btn-xs btn-primary tracking-wider  "
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
          className=" btn btn-primary pb-1 btn-sm font-bold mt-10  mb-10  text-[24px]"
        >
          &#9205;
        </button>
      </div>
    </div>
  );
};

export default FragrancesAndSkincareSection;
