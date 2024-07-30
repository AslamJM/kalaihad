"use client";

import { Label } from "../ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { api } from "~/trpc/react";
import { useMemo, useState } from "react";
import { useSaleCreateStore } from "~/stores/saleCreateStore";
import { type Product } from "@prisma/client";
import { cn } from "~/lib/utils";

const SelectProducts = () => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const items = api.product.all.useQuery();
  const { add } = useSaleCreateStore();

  const clearFields = () => {
    setItem(null);
    setQuantity("");
    setPrice("");
  };

  const values = useMemo(() => {
    if (items.isLoading) return [];

    if (items.data) {
      return items.data.map((p) => ({ value: p.name, label: p.name, item: p }));
    }
    return [];
  }, [items.isLoading, items.data]);

  const addToList = () => {
    add({
      product: item!,
      quantity: +quantity,
      price: +price,
    });
    clearFields();
  };

  return (
    <div className="flex items-end space-x-4">
      <div className="w-1/2">
        <Label className="mb-1 block">Item</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {item ? item.name : "Select Item..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Items..." />
              <CommandList>
                <CommandEmpty>No customers found.</CommandEmpty>
                <CommandGroup>
                  {values?.map((c) => (
                    <CommandItem
                      key={c.value}
                      value={c.value.toString()}
                      onSelect={() => {
                        setItem(c.item);
                        setPrice(c.item.selling_price.toString());
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          item && item.id === c.item.id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {c.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label>Quantity</Label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div>
        <Label>Price</Label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
