

import { type PaymentStatus } from "@prisma/client";
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
            quantity: z.number(),
            price: z.number()
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

export type CreatePaymentSchema = z.infer<typeof createPaymentSchema> & { payment_status?: PaymentStatus }

export const saleInput = z.object({
    sale: createSalesSchema,
    payment: createPaymentSchema
})

export const editPaymentSchema = z.object({
    id: z.number(),
    update: createPaymentSchema.partial()
})

export const updateSaleDetailsSchema = z.object({
    product_id: z.number(),
    sale_id: z.number(),
    quantity: z.number().optional(),
    price: z.number().optional()
})

export type UpdateSDInput = z.infer<typeof updateSaleDetailsSchema>