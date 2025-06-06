import axios from "axios";
import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import { observer } from "mobx-react-lite";
import { filterStore } from "@/Store/store";
import { Pagination } from "antd";

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

    const newString =
      query.slice(0, query.length - 1) +
      paramsQuery +
      query.slice(query.length - 1);
    fetch(
      `https://api.encar.com/search/car/list/premium?count=true&q=${newString}&sr=%7CModifiedDate%7C${offset}%7C20`,
      {
        headers: {
          "user-agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.SearchResults);
        setTotal(data.Count);
      })
      .catch((error) => {
        fetch(
          `https://encar-proxy-main.onrender.com/api/catalog?count=true&q=${newString}&sr=%7CModifiedDate%7C${offset}%7C20`
        )
          .then((res) => res.json())
          .then((data) => {
            setData(data.SearchResults);
            setTotal(data.Count);
          });
      })
      .finally(() => setLoading(false));
  }, [query, currentPage, minMileage, maxMileage, minPrice, maxPrice]);
  useEffect(() => {
    setCurentPage(0);
  }, [query]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (data.length === 0) return <div>net dannih</div>;
  console.log(data);
  return (
    <div className="pb-10 flex flex-col min-h-screen">
      <div className="grid  grid-cols-1 lg:grid-cols-2 items-start gap-4 min-h-[80vh] ">
        {data && data.map((i) => <CarCard key={i.Id} item={i} />)}
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
