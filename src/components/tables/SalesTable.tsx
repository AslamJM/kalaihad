"use client";

import { api } from "~/trpc/react";
import SimpleTableHeader from "../common/SimpleTableHeader";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import Loader from "../common/Loader";
import { format } from "date-fns";

const SalesTable = () => {
  const sales = api.sales.salesTable.useQuery();

  return (
    <Table>
      <SimpleTableHeader
        heads={["Date", "Customer", "Items", "Total", "Outstanding"]}
      />
      <TableBody>
        {sales.isLoading && <Loader />}
        {sales.data?.map((d) => (
          <TableRow key={d.id}>
            <TableCell>{format(d.sale_date, "dd/MM/yyyy")}</TableCell>
            <TableCell>{d.customer.name}</TableCell>
            <TableCell>{d._count.sale_details}</TableCell>
            <TableCell>{d.payment?.total}</TableCell>
            <TableCell>{d.payment?.outstanding}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SalesTable;
