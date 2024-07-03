import { type Store } from "@prisma/client";
import { type FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface StoreTableProps {
  stores: Store[];
}

const StoreTable: FC<StoreTableProps> = ({ stores }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stores.map((s) => (
          <TableRow key={s.id}>
            <TableCell>{s.name}</TableCell>
            <TableCell>{s.address}</TableCell>
            <TableCell>{s.email}</TableCell>
            <TableCell>{s.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StoreTable;
