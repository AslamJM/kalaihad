

import { z } from "zod";

export const createCustomerSchema = z.object({
    name: z.string().min(1, "name is required")
})

export const createSalesSchema = z.object({
    customer_id: z.number(),
    sale_date: z.date(),
    sale_details: z.object({
        create: z.array(z.object({
            product_id: z.number(),
            quantity: z.number()
        }))
    })

})

export const createPaymentSchema = z.object({
    total: z.number(),
    paid: z.number(),
    outstanding: z.number(),
    discount: z.number(),
    payment_method: z.enum(["CASH", "CHEQUE"]),
    due_date: z.date()
})

export const saleInput = z.object({
    sale: createSalesSchema,
    payment: createPaymentSchema
})