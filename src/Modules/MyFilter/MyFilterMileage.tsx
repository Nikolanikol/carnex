import { generateNumbersArray } from "@/utils/generateNumbersArray";
import { convertNumber, convertNumberKm } from "@/utils/splitNumber";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../UI/ShadcnSelect";
import { ScrollArea } from "@/UI/ShadcnScrollArea";
import { filterStore } from "@/Store/store";

const priceOptions = generateNumbersArray(0, 200000, 10000);

const MyFilterMileage = () => {
  const { setMaxMileage, setMinMileage } = filterStore;
  const [value, setValue] = useState([0, 200000]);

  //////////////
  const [minPrice, setMinPrice] = useState(priceOptions[0]);
  const [maxPrice, setMaxPrice] = useState(
    priceOptions[priceOptions.length - 1]
  );
  const filteredFromOptions = priceOptions.filter(
    (option) => option <= maxPrice
  );

  const filteredToOptions = priceOptions.filter((option) => option >= minPrice);
  const handleminPriceChange = (string: string) => {
    const newminPrice = Number(string);
    setMinPrice(newminPrice);
    setMinMileage(string);
    if (newminPrice > maxPrice) {
      setMaxPrice(newminPrice);
    }
  };
  const handlemaxPriceChange = (string: string) => {
    const newmaxPrice = Number(string);
    setMaxPrice(newmaxPrice);
    setMaxMileage(string);
    if (newmaxPrice < minPrice) {
      setMinPrice(newmaxPrice);
    }
  };
  return (
    <>
      <h2 className="text-left my-3 font-bold">Пробег</h2>
      {/* <div className="w-full h-10 border-2 flex justify-between px-3">
        <div>{convertNumberKm(minPrice)} км</div>
        <div>{convertNumberKm(maxPrice)} км</div>
      </div> */}
      <div className="flex justify-between">
        <Select
          onValueChange={handleminPriceChange}
          value={minPrice.toString()}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{convertNumberKm(minPrice)} км</SelectLabel>
              <ScrollArea>
                {" "}
                <div className="max-h-80 overflow-y-scroll">
                  {filteredFromOptions.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {convertNumberKm(option)} км
                    </SelectItem>
                  ))}
                </div>
              </ScrollArea>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={handlemaxPriceChange}
          value={maxPrice.toString()}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{convertNumberKm(maxPrice)} км</SelectLabel>
              <ScrollArea>
                {" "}
                <div className="max-h-80 overflow-y-scroll">
                  {filteredToOptions.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {convertNumberKm(option)} км
                    </SelectItem>
                  ))}
                </div>
              </ScrollArea>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full bg-gray-500 h-0.5 mt-7"></div>
    </>
  );
};

export default MyFilterMileage;
