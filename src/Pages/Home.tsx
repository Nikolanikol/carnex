import CardsRow from "@/Modules/CardsRow/CardsRow";
import MyFilter from "@/Modules/MyFilter/MyFilter";
import React from "react";

const Home = () => {
  return (
    <div className=" grid grid-cols-12 gap-4 p-2 h-full">
      <div className="border-2 border-amber-500 col-span-3 h-ful px-1 py-2">
        <MyFilter />
      </div>
      <div className="border-2 border-amber-500 col-span-9 h-full">
        <CardsRow />
      </div>
    </div>
  );
};

export default Home;
