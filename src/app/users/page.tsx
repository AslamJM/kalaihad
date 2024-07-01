import UserCreateForm from "~/components/forms/UserCreateForm";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import UsersList from "~/components/users/UsersList";

const UsersPage = () => {
  return (
    <div className="flex flex-col-reverse  md:flex-row md:space-x-4">
      <div className="md-w/2 w-full p-2">
        <UsersList />
      </div>
      <div className="md-w/2 w-full p-2">
        <Card>
          <CardHeader>
            <CardTitle>Create User</CardTitle>
          </CardHeader>
          <CardContent>
            <UserCreateForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsersPage;
