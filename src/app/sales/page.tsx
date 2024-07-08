import { Pencil } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import SalesDataWrapper from "./_components/SalesDataWrapper";

const SalesPage = async () => {
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
          <SalesDataWrapper />
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesPage;
