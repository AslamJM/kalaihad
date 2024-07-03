import { z } from 'zod'

export const storeCreateFormSchema = z.object({
    name: z.string().min(1, "name is required"),
    address: z.string(),
    phone: z.string().min(1, "phone is required"),
    email: z.string()
})