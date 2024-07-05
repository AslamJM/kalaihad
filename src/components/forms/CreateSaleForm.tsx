"use client";

import SaleItemList from "../sales/SaleItemList";
import SelectProducts from "../sales/SelectProducts";

const CreateSaleForm = () => {
  return (
    <div className="space-y-2">
      <SelectProducts />
      <SaleItemList />
    </div>
  );
};

export default CreateSaleForm;
