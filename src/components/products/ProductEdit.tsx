import { zodResolver } from "@hookform/resolvers/zod";
import { type Product } from "@prisma/client";
import { type Dispatch, type SetStateAction, type FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { productInputSchema } from "~/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "~/trpc/react";
import { CardTitle } from "../ui/card";

interface ProductEditProps {
  product: Product;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

const productUpdateSchema = z.object({
  name: z.string().min(1, "name cannot be empty"),
  buying_price: z.string(),
  selling_price: z.string(),
  quantity: z.string(),
});

type FormSchema = Omit<z.infer<typeof productUpdateSchema>, "store_id">;

const ProductEdit: FC<ProductEditProps> = ({ product, setEditMode }) => {
  const defaultValues: FormSchema = {
    name: product.name,
    buying_price: product.buying_price.toString(),
    selling_price: product.selling_price.toString(),
    quantity: product.quantity.toString(),
  };

  const utils = api.useUtils();

  const updateProduct = api.product.update.useMutation({
    onSuccess: async (data) => {
      if (data.success && data.data) {
        setEditMode(false);
        await utils.product.one.cancel(data.data.id);
        utils.product.one.setData(data.data.id, data.data);
      }
    },
    onSettled: async () => {
      await utils.product.one.invalidate(product.id);
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(productInputSchema.omit({ store_id: true })),
    defaultValues,
  });

  const onSubmit = (values: FormSchema) => {
    const changed: Array<keyof FormSchema> = [];

    Object.keys(values).forEach((k) => {
      type Key = keyof typeof values;
      if (values[k as Key] !== product[k as keyof typeof product]) {
        changed.push(k as Key);
      }
    });

    const input: Record<string, string | number> = {};

    for (const k of changed) {
      input[k] = values[k];
    }
    updateProduct.mutate({ id: product.id, update: input });
    form.reset({}, { keepValues: false });
  };

  return (
    <>
      <CardTitle className="mt-4">Edit Product</CardTitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="Quantity" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <FormField
              control={form.control}
              name="buying_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buying Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Buying Price"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="selling_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selling Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Selling Price"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            size="sm"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Update
          </Button>
          <Button
            size="sm"
            className="ml-4"
            variant="destructive"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductEdit;
