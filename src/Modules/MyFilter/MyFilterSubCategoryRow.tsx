import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/UI/ShancdAccordion";

import { fetchSubCategory } from "@/service";
import MyFilterGenerationRow from "./MyFilterGenerationRow";
import { filterStore } from "@/Store/store";
import { getSortedData } from "@/utils/getSortedData";
import clsx from "clsx";

interface StateProps {
  IsSelected: boolean;
  Value: string;
  DisplayValue: string;
  Action: string;
  Count: number;
  Expression: string;
  Metadata: ModelMetadata;
}

// Интерфейс для метаданных модели
interface ModelMetadata {
  Code: string[];
  EngName: string[];
  Ordering: number[];
  Price: PriceRange[];
}

// Интерфейс для диапазона цен
interface PriceRange {
  Min: number;
  Max: number;
}

const SubCategory = ({ action }) => {
  const { query, setQuery } = filterStore;

  const [subCategoryState, setSubCategoryState] = useState<null>(null);
  const [value, setValue] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  const handleClick = (action: string) => {
    if (value != action) {
      setValue(action);
      setQuery(action);
    }
  };
  useEffect(() => {
    if (action) {
      fetchSubCategory(action)
        .then((res) => {
          setSubCategoryState(res);
        })
        .catch((error) => {
          console.error("Error fetching subcategory data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);
  const sortedData = getSortedData(subCategoryState);
  return (
    <div className="pl-4">
      {sortedData?.map((item) => (
        <Accordion
          type="single"
          collapsible
          key={item.DisplayValue}
          //   value={value}
          //   onValueChange={(e) => {
          //     handleClick(e);
          //   }}
          //   value={subCategoryState}
        >
          <AccordionItem value={item.Action} key={item.Action}>
            <AccordionTrigger onClick={() => handleClick(item.Action)}>
              <div
                className={clsx(
                  "w-full flex justify-between pl-5 pr-2 py-2 rounded-xl",
                  item.Action === value ? "bg-teal-700" : ""
                )}
              >
                <span> {item.Metadata.EngName}</span>
                <span>{item.Count}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <MyFilterGenerationRow value={value} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default SubCategory;
