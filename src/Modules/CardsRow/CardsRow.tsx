import axios from "axios";
import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import { observer } from "mobx-react-lite";
import { filterStore } from "@/Store/store";
import { Pagination } from "antd";
import { off } from "process";
const CardsRow = observer(() => {
  const { query } = filterStore;
  const [data, setData] = useState([]);
  const [total, setTotal] = useState<number | null>(null);
  const [currentPage, setCurentPage] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const offset = currentPage === 0 ? "" : currentPage * 20;

    axios
      .get(
        `https://api.encar.com/search/car/list/premium?count=true&q=${query}&sr=%7CModifiedDate%7C${offset}%7C20`
      )
      .then((res) => {
        setData(res.data.SearchResults);
        setTotal(res.data.Count);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, [query, currentPage]);
  useEffect(() => {
    setCurentPage(0);
  }, [query]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="pb-10 ">
      <div className="flex flex-wrap gap-2 ">
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
