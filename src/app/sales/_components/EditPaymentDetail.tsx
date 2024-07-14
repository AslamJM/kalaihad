"use client";

import {
  type Payment,
  type PaymentMethod,
  type PaymentStatus,
} from "@prisma/client";
import { Edit2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, type FC } from "react";
import DatePickerWithLabel from "~/components/common/DatePickerWithLabel";
import { Button } from "~/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type CreatePaymentSchema } from "~/schema/sale";
import { api } from "~/trpc/react";

interface EditPaymentDetailProps {
  details: Payment;
}

const EditPaymentDetail: FC<EditPaymentDetailProps> = ({ details }) => {
  const [open, setOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(
    details.payment_status,
  );
  const [dAmount, setdAmount] = useState(details.discount);
  const [dueDate, setDueDate] = useState(details.due_date);
  const [method, setMethod] = useState(details.payment_method);

  const params = useParams<{ id: string }>();

  const utils = api.useUtils();

  const editPayment = api.payment.editPayment.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        utils.payment.one.setData(+params.id, (old) => {
          if (!old) return;
          return { ...old, ...data.data };
        });
        setOpen(false);
      }
    },
  });

  const update = () => {
    const input: Partial<CreatePaymentSchema> = {};

    if (dueDate !== details.due_date) {
      input.due_date = dueDate;
    }
    if (dAmount < details.discount) {
      input.discount = dAmount;
      const diff = details.discount - dAmount;
      input.paid = details.paid - diff;
      input.outstanding = details.outstanding + diff;
    }

    if (dAmount > details.discount) {
      input.discount = dAmount;
      const diff = dAmount - details.discount;
      input.paid = details.paid + diff;
      input.outstanding = details.outstanding - diff;
    }

    if (method !== details.payment_method) {
      input.payment_method = method;
    }
    if (paymentStatus !== details.payment_status) {
      input.payment_status = paymentStatus;
    }

    editPayment.mutate({ id: +params.id, update: input });
  };

  return (
    <Dialog open={open}>
      <DialogTrigger>
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Payment History</DialogTitle>
        <DialogClose />
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Discount</Label>
              <Input
                value={dAmount}
                onChange={(e) => setdAmount(+e.target.value)}
              />
            </div>
            <div>
              <Label>Payment Status</Label>
              <Select
                value={paymentStatus}
                onValueChange={(e) => setPaymentStatus(e as PaymentStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <DatePickerWithLabel
                date={dueDate}
                setDate={setDueDate}
                label="Due Date"
              />
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
          <div className="flex items-center justify-end gap-x-2">
            <Button
              onClick={() => setOpen(false)}
              variant="destructive"
              size="sm"
            >
              Cancel
            </Button>
            <Button onClick={update} disabled={editPayment.isPending} size="sm">
              Update
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPaymentDetail;
