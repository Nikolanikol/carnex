import { Button } from "antd";
import clsx from "clsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MyFilter from "../MyFilter/MyFilter";

const Header = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="h-20 border-teal-600 border-2  bg-teal-700 min-h-30 flex items-center px-3  z-50 rounded-b-2xl sticky top-0">
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

      <div className="flex justify-between w-full items-center">
        <Link to={"/"} className="text-black text-4xl font-bold">
          CarNex
        </Link>
        <div>
          <button
            className="px-4 py-2 border-2 rounded-2xl  cursor-pointer"
            onClick={() => setIsShow(!isShow)}
          >
            <IconLucideFilter height={20} strokeWidth={2} focusable={true} />
          </button>
        </div>
        <div>user</div>
      </div>
    </div>
  );
};

export default Header;

export const IconLucideFilter = ({
  height = "1em",
  strokeWidth = "2",
  fill = "none",
  focusable = "false",
  ...props
}: Omit<React.SVGProps<SVGSVGElement>, "children">) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={height}
    focusable={focusable}
    {...props}
  >
    <path
      fill={fill}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M22 3H2l8 9.46V19l4 2v-8.54z"
    />
  </svg>
);
