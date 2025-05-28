import { action, makeAutoObservable } from "mobx";

class FilterStore {
  query = "(And.Hidden.Y._.CarType.Y.)";
  minMileage: null | string = "";
  maxMileage: null | string = "";
  minPrice: null | string = "";
  maxPrice: null | string = "";
  constructor() {
    makeAutoObservable(this);
  }

  setQuery = action((newQuery: string) => {
    this.query = newQuery;
  });
  setMinMileage = action((newQuery: string) => {
    this.minMileage = newQuery;
  });
  setMaxMileage = action((newQuery: string) => {
    this.maxMileage = newQuery;
  });
  setMinPriceStore = action((newQuery: string) => {
    this.minPrice = newQuery;
  });
  setMaxPriceStore = action((newQuery: string) => {
    this.maxPrice = newQuery;
    console.log(this.maxPrice);
  });
}

export const filterStore = new FilterStore();
