"use client";

import { api } from "~/trpc/react";
import SalesDataTable from "./SalesDataTable";

const SalesDataWrapper = () => {
  const { data } = api.sales.salesTable.useQuery();

  if (data) return <SalesDataTable sales={data} />;
};

export default SalesDataWrapper;
