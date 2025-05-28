import { useEffect, useState } from "react";

import axios from "axios";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import { fetchCatalog } from "./service";
import CarPage from "./Pages/CarPage";

/////
// https://api.encar.com/search/car/list/general?count=true&q=(And.Hidden.N._.CarType.Y.)&inav=%7CMetadata%7CSort
// https://api.encar.com/search/car/list/general?count=true&q=(And.(And.Hidden.N._.CarType.Y.)_.AdType.A.)&sr=%7CModifiedDate%7C0%7C8    отдает items 8
// https://api.encar.com/search/car/list/premium?count=true&q=(And.(And.Hidden.N._.CarType.Y.)_.AdType.B.)&sr=%7CModifiedDate%7C0%7C8       отдает items    8
// https://api.encar.com/search/car/list/premium?count=true&q=(And.Hidden.N._.CarType.Y.)&sr=%7CModifiedDate%7C0%7C20                           отдает items    20
// https://api.encar.com/search/car/list/general?count=true&q=(And.(And.Hidden.N._.CarType.Y.)_.(Or.ServiceMark.EncarDiagnosisP0._.ServiceMark.EncarDiagnosisP1._.ServiceMark.EncarDiagnosisP2.))&sr=%7CExtendWarranty%7C0%7C5          отдает items    4

interface ICatalogItem {
  Action: string;
  Count: number;
  Metadata: {
    EngName: string;
  };
}
const fetchSubCategory = async (query: string) => {
  const res = await axios
    .get(
      `https://api.encar.com/search/car/list/general?count=true&q=${query}&inav=%7CMetadata%7CSort`
    )
    .then((res) => {
      const data = res.data.iNav.Nodes.find((i) => i.DisplayName === "국산여부")
        .Facets.find((i) => i.IsSelected === true)
        .Refinements.Nodes[0].Facets.find((i) => i.IsSelected === true)
        .Refinements.Nodes[0].Facets;
      console.log(data);
      return data;
    })
    .catch((e) => console.log("fetch catalog error", e.text));
  return res;
};

function App() {
  return (
    <div className="flex flex-col h-screen">
      <BrowserRouter>
        <div className="h-20 border-teal-600 border-2  bg-teal-300">Header</div>
        <main className="grow border-2 border-blue-500">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/car/:id" element={<CarPage />} />
          </Routes>
        </main>

        <div className="h-20 border-teal-600 border-2  bg-teal-300">footer</div>
      </BrowserRouter>
    </div>
  );
}

function Catalog() {
  const [data, setData] = useState<ICatalogItem[] | null>();

  const [modelData, setModelData] = useState<ICatalogItem | null>(null);
  const [query, setQuery] = useState<
    "(And.Hidden.Y._.CarType.Y.)" | "(And.Hidden.N._.CarType.N.)"
  >("(And.Hidden.Y._.CarType.Y.)");
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    try {
      fetchCatalog(query).then((res) => setData(res));
      axios
        .get(
          `
https://api.encar.com/search/car/list/general?count=true&q=(And.(And.Hidden.N._.(C.CarType.N._.(C.Manufacturer.BMW._.ModelGroup.1시리즈.)))_.(Or.ServiceMark.EncarDiagnosisP0._.ServiceMark.EncarDiagnosisP1._.ServiceMark.EncarDiagnosisP2.))&sr=%7CModifiedDate%7C0%7C5
`
        )
        .then((res) => console.log(res.data));
      setLoading(false);
    } catch (error) {
      console.log("ошибка получения каталога");
    }
  }, [query]);
  const handleClickManufacture = (value: string) => {
    console.log(value);
    fetchModels(value).then((res) => setModelData(res));
  };

  return (
    <>
      <div className="w-20 border-2 border-red-500">div</div>hello
      <div className="flex gap-x-2 justify-center ">
        <span
          className="border-2 "
          onClick={() => setQuery("(And.Hidden.Y._.CarType.Y.)")}
        >
          domestica
        </span>
        <span
          className="border-2 "
          onClick={() => setQuery("(And.Hidden.N._.CarType.N.)")}
        >
          foreign
        </span>
      </div>
      <div>
        {!isLoading &&
          data &&
          data.map((item, i) => {
            return (
              <div key={i} className="min-w-5 min-h-5 border-2 border-teal-600">
                {" "}
                <div
                  className="cursor-pointer"
                  onClick={() => handleClickManufacture(item.Action)}
                >
                  {item.Metadata.EngName} {item.Count}{" "}
                </div>
                <div>
                  {modelData &&
                    modelData.map((item) => {
                      return (
                        <div>
                          {item.Metadata.EngName} {item.Count}{" "}
                        </div>
                      );
                    })}{" "}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
