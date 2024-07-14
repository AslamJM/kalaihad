
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createCustomerSchema } from '~/schema/sale'
import { handlerError } from "~/lib/handleError";

export const customerRouter = createTRPCRouter({
    create: publicProcedure.input(createCustomerSchema).mutation(async ({ ctx, input }) => {
        try {
            const customer = await ctx.db.customer.create({
                data: {
                    ...input
                }
            })
            return {
                success: true,
                data: customer,
                message: "Customer created successfully"
            }
        } catch (error) {
            return handlerError(error)
        }
    }),

    selectAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.customer.findMany({
            select: {
                id: true,
                name: true
            }
        })
    }),

    all: publicProcedure.query(({ ctx }) => {
        return ctx.db.customer.findMany({
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        Sales: true
                    }
                }
            }
        })
    })
})