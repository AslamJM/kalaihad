import { Label } from "../ui/label";
import { api } from "~/trpc/react";
import { useSaleCreateStore } from "~/stores/saleCreateStore";
import { useCallback, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

const CustomerSelect = () => {
  const [open, setOpen] = useState(false);
  const customers = api.customer.all.useQuery();
  const { customerId, setCustomerId, date, setDate } = useSaleCreateStore();

  const values = useCallback(() => {
    if (!customers.data) {
      return [];
    }
    return customers.data.map((c) => ({
      value: c.name,
      label: c.name,
      id: c.id.toString(),
    }));
  }, [customers]);

  return (
    <div className="flex items-center">
      <div className="w-1/2">
        <Label className="mb-1 block">Customer</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {customerId
                ? values().find((c) => c.id === customerId)?.label
                : "Select Customer..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search customer..." />
              <CommandList>
                <CommandEmpty>No customers found.</CommandEmpty>
                <CommandGroup>
                  {values().map((c) => (
                    <CommandItem
                      key={c.value}
                      value={c.value.toString()}
                      onSelect={() => {
                        setCustomerId(c.id);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          customerId === c.id ? "opacity-100" : "opacity-0",
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
      <div className="w-1/2">
        <Label>Sale date</Label>
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
              onSelect={(d) => setDate(d ?? new Date())}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default CustomerSelect;
