import { z } from "zod";
import { editPaymentHistorySchema, editProductHistorySchema } from "~/schema/history";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const historyRouter = createTRPCRouter({
    productHistories: publicProcedure.input(z.number()).query(({ ctx, input }) => {
        return ctx.db.stockHistory.findMany({ where: { product_id: input }, include: { edits: true } })
    }),

    editStockHistory: publicProcedure.input(editProductHistorySchema).mutation(async ({ ctx, input }) => {
        try {
            const { amount, history_id, type } = input
            const history = await ctx.db.stockHistory.findUniqueOrThrow({ where: { id: history_id } })
            if (type === "DEC") {
                await ctx.db.stockHistory.update({
                    where: { id: history.id }, data: {
                        quantity: { decrement: amount }
                    }
                })
                await ctx.db.product.update({ where: { id: history.product_id }, data: { quantity: { decrement: amount } } })
            } else {
                await ctx.db.stockHistory.update({
                    where: { id: history.id }, data: {
                        quantity: { increment: amount }
                    }
                })
                await ctx.db.product.update({ where: { id: history.product_id }, data: { quantity: { increment: amount } } })
            }

            const edit = await ctx.db.stockHistoryEdit.create({ data: input })
            return {
                success: true,
                data: edit,
                message: "Edited successfully"
            }
        } catch (error) {
            return {
                success: false,
                data: null,
                message: "Failed to edit"
            }
        }
    }),

    editPaymentHistory: publicProcedure.input(editPaymentHistorySchema).mutation(async ({ ctx, input }) => {
        try {
            const { amount, history_id, type } = input
            const history = await ctx.db.paymentHistory.findUniqueOrThrow({ where: { id: history_id } })
            if (type === "DEC") {
                await ctx.db.paymentHistory.update({
                    where: { id: history.id },
                    data: { amount: { decrement: amount } }
                })
                await ctx.db.payment.update({
                    where: { sale_id: history.payment_id }, data: {
                        outstanding: { increment: amount },
                        paid: { decrement: amount }
                    }
                })
            } else {
                await ctx.db.paymentHistory.update({
                    where: { id: history.id },
                    data: { amount: { increment: amount } }
                })
                await ctx.db.payment.update({
                    where: { sale_id: history.payment_id }, data: {
                        outstanding: { decrement: amount },
                        paid: { increment: amount }
                    }
                })
            }

            const edit = await ctx.db.paymentHistoryEdit.create({ data: input })
            return {
                success: true,
                data: edit,
                message: "Edited successfully"
            }
        } catch (error) {
            return {
                success: false,
                data: null,
                message: "Failed to edit"
            }
        }
    })
})