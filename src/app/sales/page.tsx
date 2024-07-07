import { Pencil } from "lucide-react";
import Link from "next/link";
import SalesTable from "~/components/tables/SalesTable";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const SalesPage = () => {
  return (
    <div className="space-y-4">
      <Link href="/sales/create">
        <Button variant="outline">
          <Pencil className="mr-2" /> Create Sale
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>All Sales</CardTitle>
          <CardDescription>sales info table</CardDescription>
        </CardHeader>
        <CardContent>
          <SalesTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesPage;
