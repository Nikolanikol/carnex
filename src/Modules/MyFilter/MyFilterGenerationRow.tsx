import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/UI/ShancdAccordion";

import { fetchGeneration } from "@/service";

import { useEffect, useState } from "react";
import SubGeneration from "./MyFilterSubGeneration";
import { filterStore } from "@/Store/store";

/////////////////////
const MyFilterGenerationRow = ({ value }) => {
  const { query, setQuery } = filterStore;

  const [generationData, setGenerationData] = useState<GenerationData[] | null>(
    null
  );
  const [action, setAction] = useState<string | null>(null);

  const handleClick = (value: string) => {
    if (action != value) {
      setAction(value);
      setQuery(value);
    }
  };
  useEffect(() => {
    fetchGeneration(value).then((res) => {
      setGenerationData(res);
    });
  }, []);
  return (
    <div className="">
      {generationData &&
        generationData.map((item) => (
          <Accordion
            type="single"
            collapsible
            key={item.DisplayValue}
            // value={action}
            // onValueChange={(e) => handleClick(e)}
          >
            <AccordionItem value={item.Action}>
              <AccordionTrigger onClick={() => handleClick(item.Action)}>
                <div className="w-full pl-2">
                  <span className="w-40"></span>
                  <span> {item.DisplayValue} </span>
                  <span>{item.Count}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {" "}
                <SubGeneration action={action} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>
  );
};

export default MyFilterGenerationRow;

interface GenerationData {
  IsSelected: boolean;
  Value: string;
  DisplayValue: string;
  Action: string;
  Count: number;
  Expression: string;
  Metadata: {
    Code: string[];
    EngName: string[];
    Ordering: number[];
    Price: {
      Min: number;
      Max: number;
    }[];
    ModelStartDate: string[];
    ModelEndDate: string[];
  };
}
