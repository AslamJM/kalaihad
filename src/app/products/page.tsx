import React from "react";
import CreateProductForm from "~/components/forms/CreateProductForm";
import ProductList from "~/components/products/ProductList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const ProductsPage = () => {
  return (
    <div className="flex flex-col-reverse  md:flex-row md:space-x-4">
      <div className="md-w/2 w-full p-2">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>list of all products</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductList />
          </CardContent>
        </Card>
      </div>
      <div className="md-w/2 w-full p-2">
        <Card>
          <CardHeader>
            <CardTitle>Create Product</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateProductForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductsPage;
