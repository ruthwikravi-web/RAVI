import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { contacts } from "@db/schema";
import { eq, desc, count, sql } from "drizzle-orm";

export const contactRouter = createRouter({
  submit: publicQuery
    .input(
      z.object({
        name: z.string().min(1).max(255),
        email: z.string().email(),
        company: z.string().max(255).optional(),
        subject: z.string().max(255).optional(),
        message: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(contacts).values({
        name: input.name,
        email: input.email,
        company: input.company || null,
        subject: input.subject || null,
        message: input.message,
      });
      return { success: true };
    }),

  list: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }),

  markRead: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(contacts)
        .set({ isRead: true })
        .where(eq(contacts.id, input.id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(contacts).where(eq(contacts.id, input.id));
      return { success: true };
    }),

  stats: adminQuery.query(async () => {
    const db = getDb();
    const total = await db.select({ count: count() }).from(contacts);
    const unread = await db
      .select({ count: count() })
      .from(contacts)
      .where(eq(contacts.isRead, false));
    const today = await db
      .select({ count: count() })
      .from(contacts)
      .where(
        sql`DATE(${contacts.createdAt}) = CURDATE()`
      );

    return {
      total: total[0].count,
      unread: unread[0].count,
      today: today[0].count,
    };
  }),
});
