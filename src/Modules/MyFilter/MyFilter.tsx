import MyFilterManufatuceRow from "./MyFilterManufatuceRow";

const MyFilter = () => {
  return (
    <div className=" min-h-36  rounded-2xl  ">
      <form action="">
        <div className="flex flex-col gap-2 text-left ">
          <label className=" font-bold" htmlFor="manufacture">
            Производитель
          </label>
          <MyFilterManufatuceRow />
        </div>
        {/* 
        <MyFilterMileage />
        <MyFilterPrice />
        <MyFilterYear />
        <SearchByCarNumber /> */}
      </form>
    </div>
  );
};

export default MyFilter;
