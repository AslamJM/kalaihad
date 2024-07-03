import { storeCreateFormSchema } from "~/schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const storeRouter = createTRPCRouter({

    create: publicProcedure
        .input(storeCreateFormSchema)
        .mutation(async ({ ctx, input }) => {
            try {
                const store = await ctx.db.store.create({
                    data: input
                })
                return {
                    success: true,
                    data: store,
                    message: "Store created successfully"
                }
            } catch (error) {
                return {
                    success: false,
                    data: null,
                    message: "Error occurred in store create"
                }
            }
        }),

    getLatest: publicProcedure.query(({ ctx }) => {
        return ctx.db.store.findMany();
    }),
});