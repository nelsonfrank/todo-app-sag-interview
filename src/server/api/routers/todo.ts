/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        todo: z.string(),
        dueDate: z.date().optional(),
        priority: z.enum(["high", "medium", "low"]).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db.todo.create({
        data: {
          todo: input.todo,
          dueDate: input.dueDate,
          priority: input.priority,
        },
      });

      console.log({ response });
      return response;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        todo: z.string(),
        dueDate: z.date().optional(),
        isComplete: z.boolean().optional(),
        priority: z.enum(["high", "medium", "low"]).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.todo.update({
        where: {
          id: input.id,
        },
        data: {
          todo: input.todo,
          dueDate: input.dueDate,
          priority: input.priority,
          isComplete: input.isComplete,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.todo.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.todo.findMany();
  }),

  filterByPriority: publicProcedure
    .input(z.object({ priority: z.enum(["high", "medium", "low"]) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.todo.findMany({
        where: {
          priority: input.priority,
        },
      });
    }),
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.todo.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
