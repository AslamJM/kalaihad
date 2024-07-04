"use client";

import { CalendarIcon, Loader2, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "~/lib/utils";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { addToStockSchema } from "~/schema";
import { useParams } from "next/navigation";
import { api } from "~/trpc/react";

const ProductActions = () => {
  const [date, setDate] = useState<Date>();
  const [quantity, setQuantity] = useState("");

  const utils = api.useUtils();

  const { id } = useParams<{ id: string }>();
  const addStock = api.product.addToStock.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        await utils.history.productHistories.invalidate(+id);
        await utils.product.one.invalidate();
        setDate(undefined);
        setQuantity("");
      }
    },
  });

  const onSubmit = () => {
    try {
      const input = addToStockSchema.parse({
        id: +id,
        quantity: +quantity,
        date,
      });
      addStock.mutate(input);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
        <CardDescription>actions for update this item</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex items-end gap-4">
            <div>
              <Label className="mb-1">Quantity</Label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-1 block">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button
              onClick={() => onSubmit()}
              disabled={quantity.length === 0 || date === undefined}
            >
              {addStock.isPending ? (
                <Loader2 className="mr-2 animate-spin" />
              ) : (
                <Plus className="mr-2" />
              )}
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductActions;
