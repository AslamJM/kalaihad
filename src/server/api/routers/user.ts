import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const userCreateSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.enum(["ADMIN", "EMPLOYEE"]),
});

export const userRouter = createTRPCRouter({

    create: publicProcedure
        .input(userCreateSchema)
        .mutation(async ({ ctx, input }) => {
            try {
                const user = await ctx.db.user.create({
                    data: input
                })
                return {
                    success: true,
                    data: user,
                    message: "User created successfully"
                }
            } catch (error) {
                return {
                    success: false,
                    data: null
                }
            }
        }),

    getLatest: publicProcedure.query(({ ctx }) => {
        return ctx.db.user.findMany();
    }),
});