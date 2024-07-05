import { useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CustomerSelect = () => {
  const [customerId, setCustomerId] = useState("");
  return (
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
  );
};

export default CustomerSelect;
