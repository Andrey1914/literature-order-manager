import { DefaultSession } from "next-auth";
import { AdapterUser as BaseAdapterUser } from "@auth/core/adapters";

export type UserRole = "user" | "superadmin";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role?: UserRole;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser extends BaseAdapterUser {
    role?: UserRole;
  }
}
