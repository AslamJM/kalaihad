import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const historyRouter = createTRPCRouter({
    productHistories: publicProcedure.input(z.number()).query(({ ctx, input }) => {
        return ctx.db.stockHistory.findMany({ where: { product_id: input } })
    })
})