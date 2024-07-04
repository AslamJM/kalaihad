"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { createCustomerSchema } from "~/schema/sale";
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
import { Loader2 } from "lucide-react";

type FormSchema = z.infer<typeof createCustomerSchema>;

const CreateCustomerForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      name: "",
    },
  });

  const utils = api.useUtils();

  const createCustomer = api.customer.create.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        form.reset();
        await utils.customer.all.invalidate();
      }
    },
  });

  const onSubmit = (values: FormSchema) => {
    createCustomer.mutate(values);
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
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {createCustomer.isPending && (
            <Loader2 className="mr-2 animate-spin" />
          )}
          {createCustomer.isPending ? "Creating" : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateCustomerForm;
