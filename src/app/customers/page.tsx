import CreateCustomerForm from "~/components/customers/CreateCustomerForm";
import CustomerList from "~/components/customers/CustomerList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const CustomersPage = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Create Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateCustomerForm />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Customers List</CardTitle>
          <CardDescription>List of all customers</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerList />
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage;
