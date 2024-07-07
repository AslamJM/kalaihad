import CreateSaleForm from "~/components/forms/CreateSaleForm";
import PaymentForm from "~/components/sales/PaymentForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const SalesCreatePage = () => {
  return (
    <div className="flex flex-col md:flex-row md:space-x-4">
      <div className="md-w/2 w-full p-2">
        <Card>
          <CardHeader>
            <CardTitle>Create Sale</CardTitle>
            <CardDescription>create sale details</CardDescription>
          </CardHeader>
          <CardContent>
            <CreateSaleForm />
          </CardContent>
        </Card>
      </div>
      <div className="md-w/2 w-full p-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
            <CardDescription>payment details</CardDescription>
          </CardHeader>
          <CardContent>
            <PaymentForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesCreatePage;
