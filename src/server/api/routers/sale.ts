import { type Prisma, StockActions } from "@prisma/client";
import { z } from "zod";
import { saleInput, updateSaleDetailsSchema } from "~/schema/sale";
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
    }),

    updateSingleSaleDetail: publicProcedure.input(updateSaleDetailsSchema).mutation(async ({ ctx, input }) => {
        let priceDiff = 0
        let quantityDiff = 0
        let totalDiff = 0
        try {

            const sd = await ctx.db.saleDetails.findUniqueOrThrow({
                where: {
                    sale_detail_id: {
                        product_id: input.product_id,
                        sale_id: input.sale_id
                    }
                }
            })

            const og_price = sd.price
            const og_quantity = sd.quantity

            if (input.price && input.quantity) {

                totalDiff = input.price * input.quantity - og_price * og_quantity
                quantityDiff = input.quantity - og_quantity
                priceDiff = input.price - og_price
            }

            else if (input.price && !input.quantity) {
                priceDiff = input.price - og_price
                totalDiff = priceDiff * og_quantity

            } else if (input.quantity) {
                quantityDiff = input.quantity - og_quantity
                totalDiff = og_price * quantityDiff

            }

            let updateObj: Prisma.SaleDetailsUpdateInput = {}

            if (quantityDiff && priceDiff) {
                updateObj = {
                    quantity: quantityDiff > 0 ? {
                        increment: Math.abs(quantityDiff)
                    } : {
                        decrement: Math.abs(quantityDiff)
                    },
                    price: priceDiff > 0 ? {
                        increment: Math.abs(priceDiff
                        )
                    } : {
                        decrement: Math.abs(priceDiff
                        )
                    }
                }
            } else if (quantityDiff) {
                updateObj = {
                    quantity: quantityDiff > 0 ? {
                        increment: Math.abs(quantityDiff)
                    } : {
                        decrement: Math.abs(quantityDiff)
                    },
                }
            } else {
                updateObj = {
                    price: priceDiff > 0 ? {
                        increment: Math.abs(priceDiff
                        )
                    } : {
                        decrement: Math.abs(priceDiff
                        )
                    }
                }
            }

            const updated = await ctx.db.saleDetails.update({
                where: {
                    sale_detail_id: {
                        product_id: input.product_id,
                        sale_id: input.sale_id
                    }
                }, data: updateObj
            })

            if (quantityDiff) {

                await ctx.db.product.update({
                    where: { id: input.product_id },
                    data: {
                        quantity: quantityDiff > 0 ? {
                            increment: Math.abs(quantityDiff)
                        } : {
                            decrement: Math.abs(quantityDiff)
                        },
                    }
                })




            }


            await ctx.db.payment.update({
                where: { sale_id: input.sale_id }, data: totalDiff > 0 ? {
                    total: {
                        increment: Math.abs(totalDiff)
                    },
                    outstanding: {
                        increment: Math.abs(totalDiff)
                    }
                } : {
                    total: {
                        decrement: Math.abs(totalDiff)
                    },
                    outstanding: {
                        decrement: Math.abs(totalDiff)
                    }
                }
            })

            return {
                success: true,
                data: updated,
                message: "updated successfully"
            }

        } catch (error) {
            return {
                success: false,
                data: null,
                message: "failed to update"
            }
        }
    })
})