import {
  type PaymentStatus,
  type Payment,
  type PaymentHistory,
} from "@prisma/client";
import { type FC } from "react";
import SimpleTableHeader from "~/components/common/SimpleTableHeader";
import { Badge } from "~/components/ui/badge";
import { Label } from "~/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { formatDate } from "~/lib/utils";
import PaymentHistories from "./PaymentHistories";
import MakePayment from "./MakePayment";
import { formatSLR } from "sl-currency-formatter";
import EditPaymentDetail from "./EditPaymentDetail";

interface PaymentDetailsProps {
  details: Payment & {
    payment_histories: PaymentHistory[];
  };
}

const PaymentDetails: FC<PaymentDetailsProps> = ({ details }) => {
  const {
    total,
    outstanding,
    discount,
    due_date,
    paid,
    payment_status,
    payment_histories,
    sale_id,
    payment_method,
  } = details;
  return (
    <div className="space-y-6">
      <Table>
        <SimpleTableHeader heads={["total", "discount", "paid", "status"]} />
        <TableBody>
          <TableRow>
            <TableCell>{total}</TableCell>
            <TableCell>{discount}</TableCell>
            <TableCell>{paid}</TableCell>
            <TableCell>
              <PaymentStatusBage status={payment_status} />
            </TableCell>
            <TableCell>
              <EditPaymentDetail details={details} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {payment_status === "PENDING" && (
        <>
          <div className="grid grid-cols-3">
            <div>
              <Label>Outstanding</Label>
              <p className="text-muted-foreground">{formatSLR(outstanding)}</p>
            </div>
            <div>
              <Label>Due date</Label>
              <p className="text-muted-foreground">{formatDate(due_date)}</p>
            </div>
            <div>
              <Label>Payment Method</Label>
              <p className="text-muted-foreground">
                {payment_method.toLowerCase()}
              </p>
            </div>
          </div>
          <h3>Make Payment</h3>
          <MakePayment id={sale_id} outstanding={outstanding} />
        </>
      )}
      <PaymentHistories ph={payment_histories} />
    </div>
  );
};

export default PaymentDetails;

const PaymentStatusBage = ({ status }: { status: PaymentStatus }) => {
  if (status === "PENDING")
    return <Badge className="bg-blue-500">Pending</Badge>;

  return <Badge className="bg-green-500">Paid</Badge>;
};
