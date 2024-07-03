import { z } from 'zod'

export const refineToNumber = z.string().transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Not a number" })

export const storeCreateFormSchema = z.object({
    name: z.string().min(1, "name is required"),
    address: z.string(),
    phone: z.string().min(1, "phone is required"),
    email: z.string()
})

export const productInputSchema = z.object({
    name: z.string().min(1, "name is required"),
    quantity: refineToNumber,
    selling_price: refineToNumber,
    buying_price: refineToNumber,
    store_id: refineToNumber
})

export const productInputTrpc = z.object({
    name: z.string().min(1, "name is required"),
    quantity: z.number(),
    selling_price: z.number(),
    buying_price: z.number(),
    store_id: z.number()
})