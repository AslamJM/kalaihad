"use client";

import { api } from "~/trpc/react";
import SimpleTableHeader from "../common/SimpleTableHeader";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import Loader from "../common/Loader";

const CustomerList = () => {
  const customers = api.customer.all.useQuery();

  if (customers.isLoading) {
    return <Loader />;
  }

  if (customers.data) {
    return (
      <Table>
        <SimpleTableHeader heads={["Name", "Sales"]} />
        <TableBody>
          {customers.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row._count.Sales}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
};

export default CustomerList;
