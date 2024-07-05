import CreateSaleForm from "~/components/forms/CreateSaleForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const SalesPage = () => {
  return (
    <div className="flex flex-col md:flex-row md:space-x-4">
      <div className="md-w/2 w-full p-2">
        <Card>
          <CardHeader>
            <CardTitle>Create Sale</CardTitle>
            <CardDescription>create sale and payment.</CardDescription>
          </CardHeader>
          <CardContent>
            <CreateSaleForm />
          </CardContent>
        </Card>
      </div>
      <div className="md-w/2 w-full p-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales</CardTitle>
            <CardDescription>sales info.</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesPage;
