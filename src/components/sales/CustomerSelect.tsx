"use client";

import { format } from "date-fns";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { useSaleCreateStore } from "~/stores/saleCreateStore";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { CalendarIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CustomerSelect = () => {
  const customers = api.customer.selectAll.useQuery();

  const { customerId, setCustomerId, date, setDate } = useSaleCreateStore();

  return (
    <div className="flex items-center space-x-4">
      <div className="w-1/2">
        <Label className="mb-1 block">Customer</Label>
        <Select value={customerId} onValueChange={(e) => setCustomerId(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Customer" />
          </SelectTrigger>
          <SelectContent>
            {customers.data?.map((c) => (
              <SelectItem key={c.id} value={c.id.toString()}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-1/2">
        <Label className="mb-1 block">Sale Date</Label>
        <Popover>
          <PopoverTrigger>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => setDate(d!)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default CustomerSelect;
