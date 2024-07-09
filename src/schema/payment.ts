import { z } from "zod";

export const paymentHistorySchema = z.object({
    payment_id: z.number(),
    date: z.date(),
    amount: z.number(),
    payment_status: z.enum(["PENDING", "PAID"]).optional()
})