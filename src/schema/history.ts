import { z } from "zod";

export const editProductHistorySchema = z.object({
    history_id: z.number(),
    type: z.enum(["INC", "DEC"]),
    amount: z.number()
})

export const editPaymentHistorySchema = z.object({
    history_id: z.number(),
    type: z.enum(["INC", "DEC"]),
    amount: z.number()
})