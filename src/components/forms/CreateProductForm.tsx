"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Loader from "../common/Loader";

const formSchema = z.object({
  name: z.string().min(1, "name is required"),
  quantity: z.string(),
  selling_price: z.string(),
  buying_price: z.string(),
  store_id: z.string().nullable(),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues = {
  name: "",
  quantity: "",
  selling_price: "",
  buying_price: "",
  store_id: null,
};

const CreateProductForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const utils = api.useUtils();

  const createProduct = api.product.create.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        form.reset(defaultValues);
        await utils.product.all.invalidate();
      }
    },
  });

  const stores = api.store.getLatest.useQuery();

  const onSubmit = (values: FormSchema) => {
    const input = {
      name: values.name,
      quantity: +values.quantity,
      selling_price: +values.selling_price,
      buying_price: +values.buying_price,
      store_id: +values.store_id!,
    };
    createProduct.mutate(input);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
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
          <FormField
            control={form.control}
            name="store_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store</FormLabel>
                <Select
                  onValueChange={(v) => {
                    console.log(v);
                    form.setValue("store_id", v);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Store" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {stores.isLoading ? (
                      <Loader />
                    ) : stores.data ? (
                      <>
                        {stores.data.map((st) => (
                          <SelectItem key={st.id} value={st.id.toString()}>
                            {st.name}
                          </SelectItem>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </SelectContent>
                </Select>
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
                  <Input placeholder="Buying Price" {...field} type="number" />
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
                  <Input placeholder="Selling Price" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {createProduct.isPending ? "Creating" : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateProductForm;
