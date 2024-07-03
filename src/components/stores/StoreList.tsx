"use client";
import { api } from "~/trpc/react";
import Loader from "../common/Loader";
import StoreTable from "../tables/StoreTable";

const StoreList = () => {
  const stores = api.store.getLatest.useQuery();
  if (stores.isLoading) {
    return <Loader />;
  }

  if (stores.data) {
    if (stores.data.length === 0) {
      return <div>You have no stores created.</div>;
    }
    return <StoreTable stores={stores.data} />;
  }

  return <div>StoreList</div>;
};

export default StoreList;
