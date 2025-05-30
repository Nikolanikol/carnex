import { addPost, deletePost, updatePost } from "@/firebase/firebase";

import { Button } from "@/UI/ShadcnButton";
import { Card } from "@/UI/ShadcnCard";
import { formatDate } from "@/utils/formatDate";
import { convertNumber } from "@/utils/splitNumber";
import { translateGenerationRow } from "@/utils/translateGenerationRow";
import clsx from "clsx";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { data, Link } from "react-router-dom";

const CarCard = ({ item, mode }) => {
  return (
    <Card
      key={item.Id}
      className=" border-1 border-black overflow-hidden col-span-1 lg:col-span-2 "
    >
      <div className="overflow-hidden h-50  flex justify-center items-center relative">
        <img src={"https://ci.encar.com" + item.Photos[0]?.location} alt="" />
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="text-2xs font-bold border-b-2 h-24  pt-2 px-2 text-center">
          {" "}
          <span>
            {translateGenerationRow(item.Manufacturer)}{" "}
            {translateGenerationRow(item.Model)}{" "}
            {translateGenerationRow(item.Badge)}{" "}
            {translateGenerationRow(item.Transmission)}
          </span>
        </div>
        <div className="flex justify-evenly">
          <span>Год:</span>
          <span>{formatDate(item.Year)} </span>
          <span>
            Пробег: {item.Mileage && item.Mileage.toLocaleString("ru-RU")} км
          </span>
        </div>

        <div className="flex justify-evenly">
          <span>Цена:</span>
          <span>{convertNumber(item.Price)} вон</span>
        </div>
        <div className="flex justify-evenly h-12">
          <span>Тип топлива:</span>

          <span>{translateGenerationRow(item.FuelType)}</span>
        </div>
        <div>
          <Button
            className="cursor-pointer self-stretch w-full mt-auto"
            variant={"outline"}
          >
            <Link to={`/car/${item.Id}`} className=" w-full">
              Подробнеe
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CarCard;
