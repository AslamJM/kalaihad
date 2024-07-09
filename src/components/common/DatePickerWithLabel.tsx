import { type FC } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { cn, formatDate } from "~/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

interface DatePickerWithLabelProps {
  label: string;
  date: Date;
  setDate: (date: Date) => void;
}

const DatePickerWithLabel: FC<DatePickerWithLabelProps> = ({
  date,
  setDate,
  label,
}) => {
  return (
    <div>
      <Label className="mb-1">{label}</Label>
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
            {date ? formatDate(date) : <span>Pick a date</span>}
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
  );
};

export default DatePickerWithLabel;
