"use client";

import { useSaleCreateStore } from "~/stores/saleCreateStore";
import SimpleTableHeader from "../common/SimpleTableHeader";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

const SaleItemList = () => {
  const { items } = useSaleCreateStore();
  const total = items.reduce(
    (acc, item) => acc + item.product.selling_price * item.quantity,
    0,
  );
  return (
    <Table>
      <SimpleTableHeader heads={["Item", "Quantity", "Total Amount"]} />
      <TableBody>
        {items.length === 0 && <p className="">No items selected.</p>}
        {items.map((item) => (
          <TableRow key={item.product.id}>
            <TableCell>{item.product.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.quantity * item.product.selling_price}</TableCell>
          </TableRow>
        ))}
        <TableRow className="bg-slate-200">
          <TableCell>Total</TableCell>
          <TableCell></TableCell>
          <TableCell>{total}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default SaleItemList;
