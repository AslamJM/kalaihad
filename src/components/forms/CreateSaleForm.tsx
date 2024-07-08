"use client";

import CustomerSelect from "../sales/CustomerSelect";
import SaleItemList from "../sales/SaleItemList";
import SelectProducts from "../sales/SelectProducts";

const CreateSaleForm = () => {
  return (
    <div className="space-y-4">
      <CustomerSelect />
      <SelectProducts />
      <SaleItemList />
    </div>
  );
};

export default CreateSaleForm;
