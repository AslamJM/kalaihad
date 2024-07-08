import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export type TableSale = {
  id: number;
  sale_date: Date;
  customer: string;
  items: number;
  total: number;
  outstanding: number;
};

export const saleCoumns: ColumnDef<TableSale>[] = [
  {
    accessorKey: "sale_date",
    header: "Date",
    cell: ({ cell }) => {
      return format(cell.getValue() as Date, "dd/MM/yyyy");
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "items",
    header: "Items",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "outstanding",
    header: "Outstanding",
  },
  {
    header: "Invoice",
    cell: ({ row }) => {
      return (
        <Link href={`/sales/${row.original.id}`}>
          <Button variant="link">
            <span>{`#${row.original.id.toString().padStart(5, "0")}`}</span>
            <ChevronRight className="ml-2 h-4 w-4 text-orange-600" />
          </Button>
        </Link>
      );
    },
  },
];
