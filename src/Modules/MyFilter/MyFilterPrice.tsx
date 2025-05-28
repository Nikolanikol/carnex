import { useState } from "react";
import { convertNumber } from "@/utils/splitNumber";
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
import { filterStore } from "@/Store/store";
const priceOptions = generateNumbersArray(0, 10000, 100);
const MyFilterPrice = () => {
  const { setMinPriceStore, setMaxPriceStore } = filterStore;
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
    setMinPriceStore(string);
    if (newminPrice > maxPrice) {
      setMaxPrice(newminPrice);
    }
  };
  const handlemaxPriceChange = (number: string) => {
    const newmaxPrice = Number(number);
    setMaxPrice(newmaxPrice);
    setMaxPriceStore(number);
    if (newmaxPrice < minPrice) {
      setMinPrice(newmaxPrice);
    }
  };

  return (
    <>
      <h2 className="text-left my-3 font-bold">Цена</h2>
      {/* <div className="w-full h-10 border-2 flex justify-between px-3">
        <div>{convertNumber(minPrice)} 원</div>
        <div>{convertNumber(maxPrice)} 원</div>
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
            <SelectGroup defaultValue={"a"}>
              <SelectLabel>{convertNumber(minPrice)} вон</SelectLabel>
              <ScrollArea>
                {" "}
                <div className="max-h-80 overflow-y-scroll">
                  {filteredFromOptions.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {convertNumber(option)} вон
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
              <SelectLabel>{convertNumber(maxPrice)} вон</SelectLabel>
              <ScrollArea>
                {" "}
                <div className="max-h-80 overflow-y-scroll">
                  {filteredToOptions.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {convertNumber(option)} вон
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

export default MyFilterPrice;
