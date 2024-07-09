import { type CheckedState } from "@radix-ui/react-checkbox";
import { Euro } from "lucide-react";
import { type FC, useState } from "react";
import { type z } from "zod";
import DatePickerWithLabel from "~/components/common/DatePickerWithLabel";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { type paymentHistorySchema } from "~/schema/payment";
import { api } from "~/trpc/react";

interface MakePaymentProps {
  outstanding: number;
  id: number;
}

const MakePayment: FC<MakePaymentProps> = ({ outstanding, id }) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());

  const onDateChange = (d: Date) => setDate(d);

  const fullPay = (e: CheckedState) => {
    if (e) {
      setAmount(outstanding.toString());
    } else {
      setAmount("");
    }
  };

  const utils = api.useUtils();

  const createPayment = api.payment.createHistory.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        const payment = utils.payment.one.getData(id);

        if (payment) {
          payment.outstanding -= +amount;
          payment.paid += +amount;

          if (payment.outstanding === 0) {
            payment.payment_status = "PAID";
          }
        }

        if (data.data) payment?.payment_histories.unshift(data.data);
        utils.payment.one.setData(id, payment);
        setAmount("");
        setDate(new Date());
      }
    },
    onSettled: async () => {
      await utils.payment.one.invalidate(id);
    },
  });

  const onSubmit = () => {
    let input: z.infer<typeof paymentHistorySchema> = {
      payment_id: id,
      amount: +amount,
      date,
    };

    if (outstanding === +amount) {
      input = { ...input, payment_status: "PAID" };
    }

    createPayment.mutate(input);
  };

  return (
    <div className="flex items-end gap-x-4">
      <div>
        <Label>Amount</Label>
        <div className="flex gap-x-2">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <Checkbox id="full" onCheckedChange={fullPay} />
            <label
              htmlFor="full"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Full
            </label>
          </div>
        </div>
      </div>

      <DatePickerWithLabel
        label="Payment Date"
        date={date}
        setDate={onDateChange}
      />
      <Button
        disabled={!amount || createPayment.isPending}
        onClick={() => onSubmit()}
      >
        <Euro className="mr-2 h-4 w-4" /> Pay
      </Button>
    </div>
  );
};

export default MakePayment;
