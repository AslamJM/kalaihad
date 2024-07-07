"use client";

import { useSaleCreateStore } from "~/stores/saleCreateStore";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { cn } from "~/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { type PaymentMethod } from "@prisma/client";
import { api } from "~/trpc/react";
import { type z } from "zod";
import { type saleInput } from "~/schema/sale";

type SaleInput = z.infer<typeof saleInput>;

const PaymentForm = () => {
  const [discount, setDiscount] = useState(0);
  const [paid, setPaid] = useState(0);
  const [method, setMethod] = useState<PaymentMethod>("CASH");
  const [dueDate, setDueDate] = useState<Date>();

  const { items, clear, customerId, date } = useSaleCreateStore();

  const total = items.reduce(
    (acc, item) => acc + item.product.selling_price * item.quantity,
    0,
  );

  const due = useMemo(() => {
    return total - discount - paid;
  }, [paid, total, discount]);

  const clearFields = () => {
    setDiscount(0), setPaid(0), setMethod("CASH"), setDueDate(undefined);
  };

  const createSale = api.sales.create.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        clearFields();
        clear();
      }
    },
  });

  const submit = () => {
    const input: SaleInput = {
      sale: {
        customer_id: Number(customerId),
        sale_date: date,
        sale_details: {
          create: items.map((i) => ({
            product_id: i.product.id,
            quantity: i.quantity,
          })),
        },
      },
      payment: {
        discount,
        paid,
        due_date: dueDate!,
        payment_method: method,
        outstanding: due,
        total,
      },
    };
    createSale.mutate(input);
  };

  if (items.length === 0) {
    return <p>No items were selected.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Total</Label>
          <p>{total}</p>
        </div>
        <div>
          <Label>Discount</Label>
          <Input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(+e.target.value)}
          />
        </div>
        <div>
          <Label>First Payment</Label>
          <Input
            type="number"
            value={paid}
            onChange={(e) => setPaid(+e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div>
          <Label>Due</Label>
          <p>{due}</p>
        </div>
        <div>
          <Label>Due Date</Label>
          <Popover>
            <PopoverTrigger>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !dueDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, "PPP") : "select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>Payment Method</Label>
          <Select
            value={method}
            onValueChange={(e) => setMethod(e as PaymentMethod)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CASH">Cash</SelectItem>
              <SelectItem value="CHEQUE">Cheque</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Button onClick={() => submit()}>
          {createSale.isPending && <Loader2 className="mr-2 animate-spin" />}
          {createSale.isPending ? "Creating..." : "Create Sale"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentForm;
