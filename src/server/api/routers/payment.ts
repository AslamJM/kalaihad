import { z } from "zod";
import { paymentHistorySchema } from "~/schema/payment";
import { editPaymentSchema } from "~/schema/sale";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const paymentRouter = createTRPCRouter({
    one: publicProcedure.input(z.number()).query(({ ctx, input }) => {
        return ctx.db.payment.findUnique({
            where: { sale_id: input },
            include: {
                payment_histories: true
            }
        })
    }),

    createHistory: publicProcedure.input(paymentHistorySchema).mutation(async ({ ctx, input }) => {
        try {
            const paymentHistory = await ctx.db.paymentHistory.create({
                data: {
                    amount: input.amount,
                    date: input.date,
                    payment: {
                        connect: {
                            sale_id: input.payment_id
                        }
                    }
                }
            })

            if (input.payment_status) {
                await ctx.db.payment.update({
                    where: {
                        sale_id: input.payment_id
                    },
                    data: {
                        outstanding: 0,
                        paid: {
                            increment: input.amount
                        },
                        payment_status: "PAID"
                    }
                })
            } else {
                await ctx.db.payment.update({
                    where: {
                        sale_id: input.payment_id
                    },
                    data: {
                        outstanding: {
                            decrement: input.amount
                        },
                        paid: {
                            increment: input.amount
                        }
                    }
                })
            }


            return {
                success: true,
                data: paymentHistory,
                message: "payment created successfully"
            }
        } catch (error) {
            return {
                success: false,
                data: null,
                message: "Error occurred in payment"
            }
        }
    }),

    editPayment: publicProcedure.input(editPaymentSchema).mutation(async ({ ctx, input }) => {
        try {
            const updated = await ctx.db.payment.update({ where: { sale_id: input.id }, data: input.update })
            return {
                success: true,
                data: updated,
                message: "Payment updated successfully"
            }
        } catch (error) {
            return {
                success: false,
                data: null,
                message: "Error occurred in Edit"
            }
        }
    })
})