import axios from "axios";
import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import { observer } from "mobx-react-lite";
import { filterStore } from "@/Store/store";
import { Pagination } from "antd";
import { Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
const CardsRow = observer(() => {
  const { query, minMileage, maxMileage, minPrice, maxPrice } = filterStore;
  // const [data, setData] = useState([]);

  const [currentPage, setCurentPage] = useState<number>(0);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "cars",
      query,
      currentPage,
      minMileage,
      maxMileage,
      minPrice,
      maxPrice,
    ],
    queryFn: () =>
      fetchCars({
        query,
        currentPage,
        minMileage,
        maxMileage,
        minPrice,
        maxPrice,
      }),
    staleTime: 1000 * 60 * 5, // кэш на 5 минут
  });
  useEffect(() => {
    if (currentPage !== 0) {
      setCurentPage(0);
    }
  }, [query]);
  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 4 }} />;
  }
  if (data.length === 0) return <Skeleton active paragraph={{ rows: 4 }} />;
  console.log("fetchCars rerender");

  return (
    <div className=" flex flex-col min-h-screen  ">
      <div className="grid  grid-cols-1 lg:grid-cols-2 items-start gap-4 min-h-[80vh] ">
        {data && data.SearchResults.map((i) => <CarCard key={i.Id} item={i} />)}
      </div>
      <div className="mt-5">
        {" "}
        <Pagination
          defaultCurrent={currentPage}
          total={data.Count}
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

const fetchCars = async ({
  query,
  currentPage,
  minMileage,
  maxMileage,
  minPrice,
  maxPrice,
}: {
  query: string;
  currentPage: number;
  minMileage: number;
  maxMileage: number;
  minPrice: number;
  maxPrice: number;
}) => {
  const offset = currentPage === 0 ? "" : currentPage * 20;
  const paramsQuery = generateFilterQuery({
    minMileage,
    maxMileage,
    minPrice,
    maxPrice,
  });

  const newString =
    query.slice(0, query.length - 1) +
    paramsQuery +
    query.slice(query.length - 1);
  console.log(query, "cardsrow query");
  try {
    const res = await fetch(
      `https://api.encar.com/search/car/list/premium?count=true&q=${newString}&sr=%7CModifiedDate%7C${offset}%7C20`,
      {
        headers: {
          "user-agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch {
    const fallbackRes = await fetch(
      `https://encar-proxy-main.onrender.com/api/catalog?count=true&q=${newString}&sr=%7CModifiedDate%7C${offset}%7C20`
    );
    const fallbackData = await fallbackRes.json();
    return fallbackData;
  }
};
