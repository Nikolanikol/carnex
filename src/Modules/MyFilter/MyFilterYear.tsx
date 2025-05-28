import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/UI/ShadcnSelect";
import { generateNumbersArray } from "@/utils/generateNumbersArray";
import { ScrollArea } from "@/UI/ShadcnScrollArea";
const priceOptions = generateNumbersArray(1980, 2025, 1);
const MyFilterYear = () => {
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

    if (newminPrice > maxPrice) {
      setMaxPrice(newminPrice);
    }
  };
  const handlemaxPriceChange = (number: string) => {
    const newmaxPrice = Number(number);
    setMaxPrice(newmaxPrice);

    if (newmaxPrice < minPrice) {
      setMinPrice(newmaxPrice);
    }
    console.log(maxPrice);
  };

  return (
    <>
      <h2 className="text-left my-3 font-bold">Год</h2>

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
              <SelectLabel>{minPrice}</SelectLabel>
              <ScrollArea>
                {" "}
                <div className="max-h-80 overflow-y-scroll">
                  {filteredFromOptions.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {option}
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
              <SelectLabel>{maxPrice}</SelectLabel>
              <ScrollArea>
                {" "}
                <div className="max-h-80 overflow-y-scroll">
                  {filteredToOptions.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {option}
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

export default MyFilterYear;
