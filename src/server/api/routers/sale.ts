import { StockActions } from "@prisma/client";
import { z } from "zod";
import { saleInput } from "~/schema/sale";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const saleRouter = createTRPCRouter({
    create: publicProcedure.input(saleInput).mutation(async ({ ctx, input }) => {
        try {
            const saleInput = input.sale
            const sale = await ctx.db.sale.create({ data: saleInput })

            const paymentInput = input.payment

            const payment = await ctx.db.payment.create({
                data: {
                    sale_id: sale.id,
                    ...paymentInput,
                    payment_histories: {
                        create: {
                            date: input.sale.sale_date,
                            amount: input.payment.paid
                        }
                    }
                }
            })

            const saleDetails = saleInput.sale_details.create

            for (const sd of saleDetails) {
                await ctx.db.product.update({
                    where: { id: sd.product_id },
                    data: {
                        quantity: {
                            decrement: sd.quantity
                        }
                    }
                })
            }

            const historyupdates = saleDetails.map(d => ({
                action: StockActions.SALE,
                quantity: d.quantity,
                product_id: d.product_id
            }))

            await ctx.db.stockHistory.createMany({
                data: historyupdates
            })



            return {
                success: true,
                data: payment,
                message: "Sale created successfully"
            }

        } catch (error) {
            return {
                success: false,
                data: null,
                message: "Error in sale creation"
            }
        }
    }),

    salesTable: publicProcedure.query(async ({ ctx }) => {
        const data = await ctx.db.sale.findMany({
            select: {
                id: true,
                sale_date: true,
                customer: {
                    select: {
                        name: true
                    }
                },
                _count: {
                    select: {
                        sale_details: true
                    }
                },
                payment: {
                    select: {
                        total: true,
                        outstanding: true
                    }
                }
            }
        })

        return data.map(d => ({
            id: d.id,
            sale_date: d.sale_date,
            customer: d.customer.name,
            items: d._count.sale_details,
            total: d.payment?.total ?? 0,
            outstanding: d.payment?.outstanding ?? 0
        }))
    }),

    one: publicProcedure.input(z.number()).query(({ ctx, input }) => {
        return ctx.db.sale.findUnique({
            where: { id: input }, include: {
                customer: true,
                sale_details: {
                    include: {
                        product: true
                    }
                }
            }
        })
    })
})