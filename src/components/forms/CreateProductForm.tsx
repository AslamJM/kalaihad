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
import { cn } from "~/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "name is required"),
  quantity: z.string(),
  selling_price: z.string(),
  buying_price: z.string(),
  store_id: z.number().nullable(),
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
  const [open, setOpen] = useState(false);

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

  const values = useMemo(() => {
    if (stores.data) {
      return stores.data.map((d) => ({
        id: d.id,
        value: d.name,
        label: d.name,
      }));
    }
    return [];
  }, [stores]);

  const onSubmit = (values: FormSchema) => {
    const input = {
      name: values.name,
      quantity: +values.quantity,
      selling_price: +values.selling_price,
      buying_price: +values.buying_price,
      store_id: values.store_id!,
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
                <FormLabel className="block">Store</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {field.value
                        ? values.find((st) => st.id === field.value)?.label
                        : "Select Store..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search customer..." />
                      <CommandList>
                        <CommandEmpty>No customers found.</CommandEmpty>
                        <CommandGroup>
                          {values.map((c) => (
                            <CommandItem
                              key={c.value}
                              value={c.value.toString()}
                              onSelect={() => {
                                form.setValue("store_id", c.id);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === c.id
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {c.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
