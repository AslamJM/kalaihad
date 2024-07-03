import StoreCreateForm from "~/components/forms/StoreCreateForm";
import StoreList from "~/components/stores/StoreList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const StorePage = () => {
  return (
    <div className="flex flex-col-reverse  md:flex-row md:space-x-4">
      <div className="md-w/2 w-full p-2">
        <Card>
          <CardHeader>
            <CardTitle>Stores</CardTitle>
            <CardDescription>list of all stores</CardDescription>
          </CardHeader>
          <CardContent>
            <StoreList />
          </CardContent>
        </Card>
      </div>
      <div className="md-w/2 w-full p-2">
        <Card>
          <CardHeader>
            <CardTitle>Create User</CardTitle>
          </CardHeader>
          <CardContent>
            <StoreCreateForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StorePage;
