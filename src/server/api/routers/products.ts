import { productInputTrpc } from "~/schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({

    create: publicProcedure
        .input(productInputTrpc)
        .mutation(async ({ ctx, input }) => {
            try {
                const store = await ctx.db.product.create({
                    data: input
                })
                return {
                    success: true,
                    data: store,
                    message: "Product created successfully"
                }
            } catch (error) {
                console.log(error);

                return {
                    success: false,
                    data: null,
                    message: "Error occurred in product create"
                }
            }
        }),

    all: publicProcedure.query(({ ctx }) => {
        return ctx.db.product.findMany();
    }),
});