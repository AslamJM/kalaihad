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
        {products.length === 0 ? (
          <TableRow>No products to display</TableRow>
        ) : (
          products.map((pr) => (
            <TableRow key={pr.id}>
              <TableCell>{pr.name}</TableCell>
              <TableCell>{pr.quantity}</TableCell>
              <TableCell>{pr.selling_price}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
