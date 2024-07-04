import { productInputTrpc, updateProductSchema, singleQuerySchema, addToStockSchema } from "~/schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({

    create: publicProcedure
        .input(productInputTrpc)
        .mutation(async ({ ctx, input }) => {
            try {
                const product = await ctx.db.product.create({
                    data: input
                })
                await ctx.db.stockHistory.create({
                    data: {
                        action: "CREATED",
                        quantity: input.quantity,
                        product: {
                            connect: {
                                id: product.id
                            }
                        }
                    }
                })
                return {
                    success: true,
                    data: product,
                    message: "Product created successfully"
                }
            } catch (error) {
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

    one: publicProcedure.input(singleQuerySchema).query(({ ctx, input }) => {
        return ctx.db.product.findUnique({ where: { id: input } });
    }),

    update: publicProcedure.input(updateProductSchema).mutation(async ({ ctx, input }) => {
        try {
            const updated = await ctx.db.product.update({
                where: { id: input.id },
                data: input.update
            })
            return {
                success: true,
                data: updated,
                message: "Product updated successfully"
            }
        } catch (error) {
            return {
                success: false,
                data: null,
                message: "Error occurred in product update"
            }
        }
    }),

    addToStock: publicProcedure.input(addToStockSchema).mutation(async ({ ctx, input }) => {
        try {
            await ctx.db.product.update({
                where: { id: input.id },
                data: {
                    quantity: {
                        increment: input.quantity
                    }
                }
            })
            const history = await ctx.db.stockHistory.create({
                data: {
                    action: "ADDED",
                    quantity: input.quantity,
                    product: {
                        connect: {
                            id: input.id
                        }
                    },
                    createdAt: input.date
                }
            })
            return {
                success: true,
                data: history,
                message: "Product updated successfully"
            }
        } catch (error) {
            return {
                success: false,
                data: null,
                message: "Error occurred in product update"
            }
        }
    })
});