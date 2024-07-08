import {
  type Customer,
  type Product,
  type Sale,
  type SaleDetails,
} from "@prisma/client";
import { type FC } from "react";
import CardWrapper from "~/components/common/CardWrapper";
import SimpleTableHeader from "~/components/common/SimpleTableHeader";
import { Label } from "~/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { formatDate, padNumber } from "~/lib/utils";

type SaleDetailsWithProduct = SaleDetails & { product: Product };

export type SaleQuerySingle = Sale & {
  customer: Customer;
} & {
  sale_details: SaleDetailsWithProduct[];
};

export interface SingleSaleDetailsProps {
  sale: SaleQuerySingle;
}

const SingleSaleDetails: FC<SingleSaleDetailsProps> = ({ sale }) => {
  return (
    <CardWrapper
      title={`# ${padNumber(sale.id)}`}
      description={formatDate(sale.sale_date)}
    >
      <div className="space-y-4">
        <div>
          <Label>Customer</Label>
          <p className="text-muted-foreground">{sale.customer.name}</p>
        </div>
        <Table>
          <SimpleTableHeader heads={["Item", "Quantity"]} />
          <TableBody>
            {sale.sale_details.map((item) => (
              <TableRow key={item.product_id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardWrapper>
  );
};

export default SingleSaleDetails;
