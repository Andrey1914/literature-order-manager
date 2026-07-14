import { DefaultSession } from "next-auth";
import { AdapterUser as BaseAdapterUser } from "@auth/core/adapters";

export type UserRole = "user" | "superadmin";
export type UserStatus = "active" | "deactivated" | "pending_restore";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      status: UserStatus;
    } & DefaultSession["user"];
  }

  interface User {
    status?: UserStatus;
    role?: UserRole;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser extends BaseAdapterUser {
    role?: UserRole;
    status?: UserStatus;
  }
}
