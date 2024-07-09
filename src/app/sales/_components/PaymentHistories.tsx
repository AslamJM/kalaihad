import { type PaymentHistory } from "@prisma/client";
import { type FC } from "react";
import SimpleTableHeader from "~/components/common/SimpleTableHeader";
import { CardTitle } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { formatDate } from "~/lib/utils";

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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentHistories;
