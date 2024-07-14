"use client";

import { type SaleItem, useSaleCreateStore } from "~/stores/saleCreateStore";
import SimpleTableHeader from "../common/SimpleTableHeader";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Check, Edit2, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";

const SaleItemList = () => {
  const { items } = useSaleCreateStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  return (
    <Table>
      <SimpleTableHeader heads={["Item", "Quantity", "Total Amount", ""]} />
      <TableBody>
        {items.length === 0 && (
          <p className="my-1 text-muted-foreground">No items selected.</p>
        )}
        {items.map((item) => (
          <ItemTableRow key={item.product.id} item={item} />
        ))}
        {items.length > 0 && (
          <TableRow className="bg-slate-200">
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
            <TableCell>{total}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default SaleItemList;

const ItemTableRow = ({ item }: { item: SaleItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.price);
  const [editMode, setEditMode] = useState(false);
  const { remove, update } = useSaleCreateStore();

  const onUpdate = () => {
    const input: Partial<SaleItem> = {};

    if (quantity !== item.quantity) {
      input.quantity = quantity;
    }

    if (price !== item.price) {
      input.price = price;
    }

    update(item.product.id, input);
    setEditMode(false);
  };

  return (
    <TableRow>
      <TableCell>{item.product.name}</TableCell>
      <TableCell>
        {!editMode ? (
          <>{item.quantity}</>
        ) : (
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value)}
          />
        )}
      </TableCell>
      <TableCell>
        {!editMode ? (
          <div>
            <p className="text-sm text-muted-foreground">{`${item.quantity} x ${item.price}`}</p>
            <p className="text-sm">{item.quantity * item.price}</p>
          </div>
        ) : (
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          />
        )}
      </TableCell>
      <TableCell className="flex items-center justify-end">
        {editMode ? (
          <Button size="icon" variant="ghost" onClick={() => onUpdate()}>
            <Check className="h-4 w-4 text-green-500" />
          </Button>
        ) : (
          <Button size="icon" variant="ghost" onClick={() => setEditMode(true)}>
            <Edit2 className="h-4 w-4 text-blue-700" />
          </Button>
        )}
        <Button
          size="icon"
          variant="ghost"
          onClick={() => remove(item.product.id)}
        >
          <X className="h-4 w-4 text-red-500" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
