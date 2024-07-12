"use client";

import { type Product } from "@prisma/client";
import { type FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { formatSLR } from "sl-currency-formatter";

interface ProductTableProps {
  products: Product[];
}

const ProductTable: FC<ProductTableProps> = ({ products }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Available</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((pr) => (
          <TableRow key={pr.id}>
            <TableCell>
              <Link href={`/products/${pr.id}`}>{pr.name}</Link>
            </TableCell>
            <TableCell className="text-right">{pr.quantity}</TableCell>
            <TableCell className="text-right">
              {formatSLR(pr.selling_price)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {products.length === 0 && (
        <div className=" py-4">No products to display</div>
      )}
    </Table>
  );
};

export default ProductTable;
