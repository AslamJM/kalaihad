"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import SimpleTableHeader from "../common/SimpleTableHeader";
import { api } from "~/trpc/react";
import Loader from "../common/Loader";
import { type Product } from "@prisma/client";
import { useParams } from "next/navigation";
import { formatSLR } from "sl-currency-formatter";

const SingleProductDetail = ({ product }: { product: Product }) => {
  const { id } = useParams<{ id: string }>();
  const utils = api.useUtils();
  utils.product.one.setData(+id, product);
  const { data, isLoading } = api.product.one.useQuery(product.id);

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Loader />
        </CardContent>
      </Card>
    );
  }

  if (data) {
    const { name, quantity, buying_price, selling_price } = data;
    return (
      <Card>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>In Stock: {quantity} pcs</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <SimpleTableHeader
              heads={["Stock", "Buying Price", "Sale Price"]}
            />
            <TableBody>
              <TableRow>
                <TableCell>{quantity}</TableCell>
                <TableCell>{formatSLR(buying_price)}</TableCell>
                <TableCell>{formatSLR(selling_price)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
};

export default SingleProductDetail;
