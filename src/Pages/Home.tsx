import CardsRow from "@/Modules/CardsRow/CardsRow";
import MyFilter from "@/Modules/MyFilter/MyFilter";
import clsx from "clsx";
import React from "react";

const Home = () => {
  const [isShow, setIsShow] = React.useState(false);
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-12 gap-4 p-2 h-full m-0 mx-auto ">
      <div className="min-h-4 border-red border-2 block lg:hidden">
        <button
          className="cursor-pointer w-full relative z-50"
          onClick={() => setIsShow(!isShow)}
        >
          show
        </button>
      </div>
      <div
        className={clsx(
          "col-span-1 lg:col-span-4 h-ful px-1 py-2   sticky top-0  border-2 border-black",
          isShow ? "block  z-100" : "hidden lg:block"
        )}
      >
        <MyFilter />
      </div>
      <div className="col-span-1 lg:col-span-8  h-full">
        <CardsRow />
      </div>
    </div>
  );
};

export default Home;
