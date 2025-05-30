import { Button } from "antd";
import clsx from "clsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MyFilter from "../MyFilter/MyFilter";

const Header = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="h-20 border-teal-600 border-2  bg-teal-300 min-h-30 flex items-center px-3 relative ">
      <div
        className={clsx(
          "min-h-screen w-screen bg-[rgba(1,0,0,0.3)]    absolute top-0     z-10 -left-200 transition-all ease-in-out duration-300",
          isShow ? "block left-0" : "block "
        )}
        onClick={() => setIsShow(false)}
      >
        <div
          className="w-70 relative z-50 "
          onClick={(e) => e.stopPropagation()}
        >
          <MyFilter />{" "}
        </div>
      </div>

      <div className="flex justify-between w-full">
        <Link to={"/"} className="text-black text-4xl font-bold">
          CarNex
        </Link>
        <div>
          <button
            className="px-5 py-3 border-2 bg-white cursor-pointer"
            onClick={() => setIsShow(!isShow)}
          >
            Click
          </button>
        </div>
        <div>user</div>
      </div>
    </div>
  );
};

export default Header;
