import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../UI/ShancdAccordion";
import { fetchCatalog } from "@/service";
import SubCategory from "./MyFilterSubCategoryRow";
import { filterStore } from "@/Store/store";
import { observer } from "mobx-react-lite";
import { Tabs, TabsList, TabsTrigger } from "@/UI/ShadcnTabs";

interface ICatalogItem {
  Action: string;
  Count: number;
  Metadata: {
    EngName: string;
  };
}

const MyFilterManufatuceRow = observer(() => {
  const [mode, setMode] = useState<
    "(And.Hidden.N._.CarType.Y.)" | "(And.Hidden.N._.CarType.N.)"
  >("(And.Hidden.N._.CarType.Y.)");

  const { setQuery } = filterStore;
  const [manufactureData, setManufactureData] = useState<ICatalogItem[] | null>(
    null
  );
  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCatalog(mode).then((res) => {
      setManufactureData(res);
      setQuery(mode);
      setLoading(false);
    });
  }, [mode]);

  const handleClick = (action: string) => {
    setValue(action);
    setQuery(action);
  };
  return (
    <div className=" max-h-400 overflow-scroll">
      <div className="flex gap-x-2 justify-center  ">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="account"
              onClick={() => setMode("(And.Hidden.N._.CarType.Y.)")}
            >
              Domestic Car
            </TabsTrigger>
            <TabsTrigger
              value="password"
              onClick={() => setMode("(And.Hidden.N._.CarType.N.)")}
            >
              Forein Car
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <ul className=" relative">
        <div className="  lg:max-h-150 overflow-y-scroll flex flex-col gap-1 lg:gap-2 ">
          <Accordion
            type="single"
            collapsible
            className="w-full "
            value={value}
            onValueChange={(e) => {
              handleClick(e);
            }}
          >
            {manufactureData?.map((item) => (
              <AccordionItem value={item.Action} key={item.Action}>
                <AccordionTrigger>
                  <div className="flex justify-between w-full pr-2">
                    <span>{item.Metadata.EngName}</span>{" "}
                    <span>{item.Count}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {" "}
                  <SubCategory action={value} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ul>
    </div>
  );
});

export default MyFilterManufatuceRow;
