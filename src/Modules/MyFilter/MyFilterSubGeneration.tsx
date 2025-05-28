import { fetchSubGeneration, fetchSubRow } from "@/service";
import { filterStore } from "@/Store/store";
import { Label } from "@/UI/ShadcnLabel";
import { RadioGroup, RadioGroupItem } from "@/UI/ShadcnRadioGroup";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/UI/ShancdAccordion";
const SubGeneration = ({ action }) => {
  const { query, setQuery } = filterStore;

  const [subGeneration, setSubGeneration] = useState("");
  const [loading, setLoading] = useState(true);

  const [inputValue, setInputValue] = useState<string | null>(null);

  useEffect(() => {
    if (action) {
      fetchSubGeneration(action)
        .then((res) => setSubGeneration(res))
        .catch((e) => console.log("error"))
        .finally(() => setLoading(false));
    }
  }, []);
  const handleClick = (value: string) => {
    const encode = encodeURIComponent(value);
    console.log(encode);
    setInputValue(value);
    setQuery(encode);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  return (
    <div className="mt-4 ml-2">
      {subGeneration.map((item) => (
        <Accordion
          value={inputValue}
          onValueChange={(e) => handleClick(e)}
          type="single"
          collapsible
        >
          <AccordionItem
            value={item.Action}
            key={item.DisplayValue}
            className="   space-x-2  w-full   "
          >
            <AccordionTrigger className=" w-full ">
              <Label htmlFor={item.Value} className="w-full  ">
                <div className="flex justify-between  w-full self-stretch cursor-pointer ">
                  <span>{item.DisplayValue}</span>
                  <span>{item.Count}</span>
                </div>
              </Label>
            </AccordionTrigger>
            <AccordionContent>
              {" "}
              <SubRow action={inputValue} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default SubGeneration;

const SubRow = ({ action }) => {
  const { setQuery } = filterStore;
  const [state, setState] = useState();
  const [inputValue, setInputValue] = useState();
  useEffect(() => {
    if (action) {
      fetchSubRow(action)
        .then((res) => setState(res))

        .catch((e) => console.log("error"));
      // .finally(() => setLoading(false));
    }
  }, []);
  const handleClick = (value: string) => {
    setInputValue(value);
    setQuery(value);
  };
  return (
    <div>
      <RadioGroup value={inputValue} onValueChange={(e) => handleClick(e)}>
        {state &&
          state.map((item) => {
            return (
              <div className="flex items-center space-x-2  border-2 cursor-pointer w-full">
                {" "}
                <RadioGroupItem
                  value={item.Action}
                  id={item.Value}
                  className="cursor-pointer"
                />
                <Label htmlFor={item.Value} className="cursor-pointer">
                  {" "}
                  {item.Value} {item.Count}
                </Label>
              </div>
            );
          })}
      </RadioGroup>
    </div>
  );
};
