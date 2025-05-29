import MyFilterManufatuceRow from "./MyFilterManufatuceRow";
import MyFilterMileage from "./MyFilterMileage";
import MyFilterPrice from "./MyFilterPrice";
import MyFilterYear from "./MyFilterYear";

const MyFilter = () => {
  return (
    <div className=" min-h-36   text-xl bg-white px-4 py-8 rounded-3xl shadow-2xl">
      <form action="">
        <div className="flex flex-col gap-2 text-left ">
          <label className=" font-bold" htmlFor="manufacture">
            Производитель
          </label>
          <MyFilterManufatuceRow />

          {/* <MyFilterMileage />
          <MyFilterPrice />
          <MyFilterYear /> */}
        </div>
        {/* 
        <MyFilterMileage />
        <SearchByCarNumber /> */}
      </form>
    </div>
  );
};

export default MyFilter;
