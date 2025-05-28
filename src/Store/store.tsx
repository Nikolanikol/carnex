import { action, makeAutoObservable } from "mobx";

class FilterStore {
  query = "(And.Hidden.Y._.CarType.Y.)";
  test = "test";
  constructor() {
    makeAutoObservable(this);
  }

  setQuery = action((newQuery: string) => {
    this.query = newQuery;
  });
}

export const filterStore = new FilterStore();
