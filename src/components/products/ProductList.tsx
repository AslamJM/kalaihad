"use client";
import { api } from "~/trpc/react";
import Loader from "../common/Loader";
import ProductTable from "../tables/ProductTable";

const ProductList = () => {
  const products = api.product.all.useQuery();

  if (products.isLoading) {
    return <Loader />;
  }

  if (products.data) {
    return <ProductTable products={products.data} />;
  }
};

export default ProductList;
