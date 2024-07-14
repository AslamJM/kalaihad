"use client";

import { type FC, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Edit2 } from "lucide-react";
import { type SaleDetails } from "@prisma/client";
import { api } from "~/trpc/react";
import { useParams } from "next/navigation";
import { type UpdateSDInput } from "~/schema/sale";

interface EditSaleDetailsProps {
  details: SaleDetails;
  name: string;
}

const EditSaleDetails: FC<EditSaleDetailsProps> = ({ details, name }) => {
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(details.price);
  const [quantity, setQuantity] = useState(details.quantity);

  const params = useParams<{ id: string }>();

  const utils = api.useUtils();
  const updatesd = api.sales.updateSingleSaleDetail.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        await utils.sales.one.invalidate(+params.id);
        await utils.payment.one.invalidate(+params.id);
        setOpen(false);
      }
    },
  });

  const update = () => {
    const input: UpdateSDInput = {
      sale_id: +params.id,
      product_id: details.product_id,
    };
    if (price !== details.price) {
      input.price = price;
    }
    if (quantity !== details.quantity) {
      input.quantity = quantity;
    }
    updatesd.mutate(input);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger>
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Details</DialogTitle>
        <DialogClose />
        <div className=" space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Product</Label>
              <p>{name}</p>
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
              />
            </div>
            <div>
              <Label>Price</Label>
              <Input
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-2">
            <Button
              onClick={() => setOpen(false)}
              variant="destructive"
              size="sm"
            >
              Cancel
            </Button>
            <Button onClick={update} size="sm" disabled={updatesd.isPending}>
              Update
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditSaleDetails;
