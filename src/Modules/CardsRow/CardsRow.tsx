import axios from "axios";
import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import { observer } from "mobx-react-lite";
import { filterStore } from "@/Store/store";
import { Pagination } from "antd";

const DEV = "http://localhost:9000";
const PROD = "https://carnexproxy.vercel.app";
const BASE_URL = PROD;
const CardsRow = observer(() => {
  const { query, minMileage, maxMileage, minPrice, maxPrice } = filterStore;
  const [data, setData] = useState([]);
  const [total, setTotal] = useState<number | null>(null);
  const [currentPage, setCurentPage] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const offset = currentPage === 0 ? "" : currentPage * 20;

    const paramsQuery = generateFilterQuery({
      minMileage,
      maxMileage,
      minPrice,
      maxPrice,
    });
    console.log(paramsQuery);

    const newString =
      query.slice(0, query.length - 1) +
      paramsQuery +
      query.slice(query.length - 1);
    axios
      .get(BASE_URL + "/getcars", {
        params: {
          q: newString,
          offset,
        },
      })
      .then((res) => {
        setData(res.data.SearchResults);
        setTotal(res.data.Count);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, [query, currentPage, minMileage, maxMileage, minPrice, maxPrice]);
  useEffect(() => {
    setCurentPage(0);
  }, [query]);
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  return (
    <div className="pb-10 flex flex-col min-h-screen">
      <div className="grid grid-cols-8 items-start gap-4 min-h-[80vh] ">
        {data.map((i) => (
          <CarCard key={i.Id} item={i} />
        ))}
      </div>
      <div className="mt-5">
        {" "}
        <Pagination
          defaultCurrent={currentPage}
          total={total}
          showSizeChanger
          onChange={(e) => setCurentPage(e - 1)}
          pageSize={20}
        />
      </div>
    </div>
  );
});

export default CardsRow;

const generateFilterQuery = ({
  minPrice = "",
  maxPrice = "",
  minMileage = "",
  maxMileage = "",
  minYear = "",
  maxYear = "",
}: {
  minPrice?: number | string;
  maxPrice?: number | string;
  minMileage?: number | string;
  maxMileage?: number | string;
  minYear?: number | string;
  maxYear?: number | string;
}) => {
  let price = "";
  if (!maxPrice && !minPrice) price = "";
  else price = `_.Price.range(${minPrice}..${maxPrice}).`;

  let mileage = "";
  if (!maxMileage && !minMileage) mileage = "";
  else mileage = `_.Mileage.range(${minMileage}..${maxMileage}).`;

  let year = "";
  if (!minYear && !maxYear) year = "";
  else year = `_.Year.range(${minYear + "00"}..${maxYear + "00"}).`;

  return mileage + price + year + "";
};
