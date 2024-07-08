import { createSalesSchema } from "~/schema/sale";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const salesRouter = createTRPCRouter({
    create: publicProcedure.input(createSalesSchema).mutation(async () => { })
})