import CardsRow from "@/Modules/CardsRow/CardsRow";
import MyFilter from "@/Modules/MyFilter/MyFilter";
import React from "react";

const Home = () => {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-12 gap-4 p-2 h-full m-0 mx-auto">
      <div className="col-span-1 lg:col-span-4 h-ful px-1 py-2 hidden lg:block">
        <MyFilter />
      </div>
      <div className="col-span-1 lg:col-span-8  h-full">
        <CardsRow />
      </div>
    </div>
  );
};

export default Home;
