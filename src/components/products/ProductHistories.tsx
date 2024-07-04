"use client";

import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Loader from "../common/Loader";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import SimpleTableHeader from "../common/SimpleTableHeader";
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import { cn } from "~/lib/utils";
import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from "lucide-react";

const ProductHistories = () => {
  const { id } = useParams<{ id: string }>();
  const histories = api.history.productHistories.useQuery(+id);

  if (histories.isLoading) {
    return <Loader />;
  }

  if (histories.data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Stock Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <SimpleTableHeader heads={["Date", "Quantity", "Type"]} />
            <TableBody>
              {histories.data.map((h) => (
                <TableRow key={h.id}>
                  <TableCell>{format(h.createdAt, "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {h.action === "SALE" ? (
                        <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
                      ) : (
                        <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                      )}
                      <span>{h.quantity}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        `${h.action === "ADDED" ? "bg-green-700" : h.action === "SALE" ? "bg-blue-500" : "bg-orange-600"}`,
                      )}
                    >
                      {h.action}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
};

export default ProductHistories;
