import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { comments } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const commentRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1).max(255),
        email: z.string().email(),
        website: z.string().max(255).optional(),
        content: z.string().min(1).max(5000),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(comments).values({
        name: input.name,
        email: input.email,
        website: input.website || null,
        content: input.content,
      });
      return { id: Number(result[0].insertId), success: true };
    }),

  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(comments).orderBy(desc(comments.createdAt));
  }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(comments).where(eq(comments.id, input.id));
      return { success: true };
    }),
});
