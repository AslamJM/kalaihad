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

interface ProductTableProps {
  products: Product[];
}

const ProductTable: FC<ProductTableProps> = ({ products }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Available</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((pr) => (
          <TableRow key={pr.id}>
            <TableCell>
              <Link href={`/products/${pr.id}`}>{pr.name}</Link>
            </TableCell>
            <TableCell>{pr.quantity}</TableCell>
            <TableCell>{pr.selling_price}</TableCell>
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
