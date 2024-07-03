"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { storeCreateFormSchema } from "~/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";

type FormSchema = z.infer<typeof storeCreateFormSchema>;

const StoreCreateForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(storeCreateFormSchema),
  });

  const utils = api.useUtils();

  const createStore = api.store.create.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        form.reset({
          address: "",
          name: "",
          email: "",
          phone: "",
        });
        await utils.store.getLatest.invalidate();
      }
    },
  });

  const onSubmit = (values: FormSchema) => {
    createStore.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {createStore.isPending ? "Creating" : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default StoreCreateForm;
