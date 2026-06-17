import { z } from "zod";
import bcrypt from "bcryptjs";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { localUsers } from "@db/schema";
import { eq } from "drizzle-orm";
import { createLocalToken, verifyLocalToken } from "./local-auth-utils";
import { TRPCError } from "@trpc/server";

export const localAuthRouter = createRouter({
  register: publicQuery
    .input(
      z.object({
        username: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(6).max(100),
        displayName: z.string().max(100).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      // Check if username or email already exists
      const existing = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.username, input.username))
        .limit(1);

      if (existing.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already taken",
        });
      }

      const existingEmail = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.email, input.email))
        .limit(1);

      if (existingEmail.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already registered",
        });
      }

      const passwordHash = await bcrypt.hash(input.password, 10);

      const result = await db.insert(localUsers).values({
        username: input.username,
        email: input.email,
        displayName: input.displayName || input.username,
        passwordHash,
      });

      const userId = Number(result[0].insertId);
      const token = await createLocalToken(userId);

      return { token, userId };
    }),

  login: publicQuery
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      const user = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.username, input.username))
        .limit(1);

      if (user.length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username or password",
        });
      }

      const valid = await bcrypt.compare(input.password, user[0].passwordHash);
      if (!valid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username or password",
        });
      }

      const token = await createLocalToken(user[0].id);

      return {
        token,
        user: {
          id: user[0].id,
          username: user[0].username,
          email: user[0].email,
          displayName: user[0].displayName,
          name: user[0].displayName || user[0].username,
          role: user[0].role,
        },
      };
    }),

  me: publicQuery.query(async ({ ctx }) => {
    const token = ctx.req.headers.get("x-local-auth-token");
    if (!token) return null;

    const user = await verifyLocalToken(token);
    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      name: user.displayName || user.username,
      role: user.role,
      authType: "local" as const,
    };
  }),
});
