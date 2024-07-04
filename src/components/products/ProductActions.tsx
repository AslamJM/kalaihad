"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ProductActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
        <CardDescription>actions for update this item</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Add to stock</Label>
          <div className="flex items-center gap-4">
            <Input type="number" />
            <Button>
              <Plus />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductActions;
