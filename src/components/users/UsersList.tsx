import { api } from "~/trpc/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import UserTable from "../tables/UserTable";

export default async function UsersList() {
  const users = await api.user.getLatest();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>List of users of the app</CardDescription>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <p>No users for now</p>
        ) : (
          <UserTable users={users} />
        )}
      </CardContent>
    </Card>
  );
}
