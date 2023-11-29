import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";

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
    <div className="">
      <h3 className=" my-10 text-primary  uppercase  text-[17px] md:text-[20px] tracking-wider">
        {`Most Popular ${categories[0]} and ${categories[1]}`}{" "}
      </h3>
      <div
        ref={scrollRef}
        className=" mt-10 whitespace-nowrap overflow-y-auto "
      >
        {fliterProducts.map((fp) => (
          <div
            id="overlay-container"
            className=" border  rounded-md border-info  shadow-md text-sm overflow-hidden inline-block w-[150px] h-[200px] mx-[10px] md:w-[200px] md:h-[250px]"
            key={fp.id}
          >
            <div
              className=" flex justify-center flex-col items-center"
              id="overlay"
            >
              <h1 className=" tracking-wider font-bold text-xs md:text-lg mb-3  text-primary ">
                {fp.title.substring(0, 14)} ...
              </h1>
              <h1 className="  mb-3 tracking-wider text-xs font-semibold text-white">
                Price : ${fp.price}
              </h1>
              <button
                onClick={() => {
                  nav("/detail", { state: fp });
                }}
                className=" btn btn-primary absolute bottom-10 tracking-wider  btn-xs"
              >
                Details
              </button>
            </div>

            <img src={fp.thumbnail} className=" object-contain w-full h-full" />
          </div>
        ))}
      </div>
      <div>
        <button className=" btn btn-primary   btn-outline btn-sm font-bold mt-10  mb-10  text-[24px]">
          <MdNavigateNext
            id="scrollLeft"
            onClick={makeScrollY}
            className=" w-full  h-full"
          />
        </button>
      </div>
    </div>
  );
};

export default SectionForProducts;
