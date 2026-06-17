import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { User, LocalUser } from "@db/schema";
import { authenticateRequest } from "./kimi/auth";
import { verifyLocalToken } from "./local-auth-utils";

export type UnifiedUser = {
  id: number;
  name: string;
  email: string | null;
  avatar?: string | null;
  role: "user" | "admin";
  authType: "oauth" | "local";
};

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: UnifiedUser;
};

function oauthUserToUnified(u: User): UnifiedUser {
  return {
    id: u.id,
    name: u.name || "User",
    email: u.email,
    avatar: u.avatar,
    role: u.role as "user" | "admin",
    authType: "oauth",
  };
}

function localUserToUnified(u: LocalUser): UnifiedUser {
  return {
    id: u.id + 100000, // offset to avoid ID collision
    name: u.displayName || u.username,
    email: u.email,
    avatar: null,
    role: u.role as "user" | "admin",
    authType: "local",
  };
}

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  const ctx: TrpcContext = { req: opts.req, resHeaders: opts.resHeaders };

  // Try OAuth auth first
  try {
    const oauthUser = await authenticateRequest(opts.req.headers);
    if (oauthUser) {
      ctx.user = oauthUserToUnified(oauthUser);
      return ctx;
    }
  } catch {
    // OAuth auth failed, try local auth
  }

  // Fall back to local auth token
  try {
    const token = opts.req.headers.get("x-local-auth-token");
    if (token) {
      const localUser = await verifyLocalToken(token);
      if (localUser) {
        ctx.user = localUserToUnified(localUser);
      }
    }
  } catch {
    // Local auth failed
  }

  return ctx;
}
