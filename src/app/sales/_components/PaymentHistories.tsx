import { type PaymentHistory } from "@prisma/client";
import { Edit2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, type FC } from "react";
import SimpleTableHeader from "~/components/common/SimpleTableHeader";
import { Button } from "~/components/ui/button";
import { CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { formatDate } from "~/lib/utils";
import { type EditHistoryInput } from "~/schema/history";
import { api } from "~/trpc/react";

interface PaymentHistoriesProps {
  ph: PaymentHistory[];
}

const PaymentHistories: FC<PaymentHistoriesProps> = ({ ph }) => {
  return (
    <div>
      <CardTitle>Payment History</CardTitle>
      <Table>
        <SimpleTableHeader heads={["date", "amount"]} />
        <TableBody>
          {ph.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{formatDate(p.date)}</TableCell>
              <TableCell>{p.amount}</TableCell>
              <TableCell>
                <PaymentHistoryEditDialog ph={p} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentHistories;

const PaymentHistoryEditDialog = ({ ph }: { ph: PaymentHistory }) => {
  const [amount, setAmount] = useState(ph.amount);
  const [open, setOpen] = useState(false);
  const params = useParams<{ id: string }>();

  const utils = api.useUtils();
  const editHistory = api.history.editPaymentHistory.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        await utils.payment.one.invalidate(+params.id);
      }
      setOpen(false);
    },
  });

  const update = () => {
    const input: EditHistoryInput = {
      history_id: ph.id,
      amount: Math.abs(ph.amount - amount),
      type: ph.amount > amount ? "DEC" : "INC",
    };
    editHistory.mutate(input);
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
        <div className="flex items-end gap-x-4 py-2">
          <div>
            <Label>Amount</Label>
            <Input
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
            />
          </div>
          <Button onClick={() => setOpen(false)} variant="destructive">
            Cancel
          </Button>
          <Button onClick={update} disabled={editHistory.isPending}>
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
