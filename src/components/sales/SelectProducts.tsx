"use client";

import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import Loader from "../common/Loader";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { api } from "~/trpc/react";
import { useState } from "react";
import { useSaleCreateStore } from "~/stores/saleCreateStore";

const SelectProducts = () => {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");

  const items = api.product.all.useQuery();
  const { add } = useSaleCreateStore();

  const clearFields = () => {
    setItem("");
    setQuantity("");
  };

  const addToList = () => {
    const prId = +item;
    if (!items.data) return;
    const product = items.data.find((it) => it.id === prId);
    if (!product) return;

    add({
      product,
      quantity: +quantity,
    });
    clearFields();
  };

  return (
    <div className="flex items-end space-x-4">
      <div className="w-1/2">
        <Label>Item</Label>
        <Select value={item} onValueChange={(e) => setItem(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Item" />
          </SelectTrigger>
          <SelectContent>
            {items.isLoading && <Loader />}
            {items.data?.map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Quantity</Label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <Button
          variant="ghost"
          className="rounded-full"
          onClick={() => addToList()}
        >
          <Check className="h-4 w-4 text-green-500" />
        </Button>
        <Button
          variant="ghost"
          className=" rounded-full"
          onClick={() => clearFields()}
        >
          <X className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default SelectProducts;
