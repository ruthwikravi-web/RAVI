import { z } from "zod";
import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users, localUsers, contacts, messages, comments } from "@db/schema";
import { count, sql } from "drizzle-orm";

export const adminRouter = createRouter({
  stats: adminQuery.query(async () => {
    const db = getDb();

    const [oauthUserCount] = await db
      .select({ count: count() })
      .from(users);
    const [localUserCount] = await db
      .select({ count: count() })
      .from(localUsers);
    const [contactCount] = await db
      .select({ count: count() })
      .from(contacts);
    const [messageCount] = await db
      .select({ count: count() })
      .from(messages);
    const [commentCount] = await db
      .select({ count: count() })
      .from(comments);

    // Get unread contacts
    const [unreadContacts] = await db
      .select({ count: count() })
      .from(contacts)
      .where(sql`${contacts.isRead} = false`);

    return {
      totalUsers: oauthUserCount.count + localUserCount.count,
      oauthUsers: oauthUserCount.count,
      localUsers: localUserCount.count,
      totalContacts: contactCount.count,
      unreadContacts: unreadContacts.count,
      totalMessages: messageCount.count,
      totalComments: commentCount.count,
    };
  }),

  users: adminQuery.query(async () => {
    const db = getDb();

    const oauthUsers = await db.select().from(users);
    const local = await db.select().from(localUsers);

    const unified = [
      ...oauthUsers.map((u) => ({
        id: u.id,
        name: u.name || "Unknown",
        email: u.email,
        role: u.role,
        authType: "oauth" as const,
        createdAt: u.createdAt,
      })),
      ...local.map((u) => ({
        id: u.id + 100000,
        name: u.displayName || u.username,
        email: u.email,
        role: u.role,
        authType: "local" as const,
        createdAt: u.createdAt,
      })),
    ];

    return unified;
  }),

  updateRole: adminQuery
    .input(
      z.object({
        userId: z.number(),
        authType: z.enum(["oauth", "local"]),
        role: z.enum(["user", "admin"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      if (input.authType === "oauth") {
        await db
          .update(users)
          .set({ role: input.role })
          .where(sql`${users.id} = ${input.userId}`);
      } else {
        const realId = input.userId - 100000;
        await db
          .update(localUsers)
          .set({ role: input.role })
          .where(sql`${localUsers.id} = ${realId}`);
      }

      return { success: true };
    }),
});
