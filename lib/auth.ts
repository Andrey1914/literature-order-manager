import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "literature-order-manager",
  }),
  session: {
    strategy: "database",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      checks: ["state"],
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // 1. Если статус "deactivated", перенаправляем на логин и ПЕРЕДАЕМ email в query-параметрах
      if (user.status === "deactivated") {
        return `/login?error=Deactivated&email=${encodeURIComponent(user.email || "")}`;
      }

      // 2. Если статус "pending_restore", просто уводим на страницу ожидания
      if (user.status === "pending_restore") {
        return "/login?error=PendingRestore";
      }

      // 3. Если у нового пользователя вообще нет статуса (первый вход) — ставим "active"
      if (!user.status) {
        user.status = "active";
      }

      return true;
    },
    // async signIn({ user }) {
    //   if (user.status === "deactivated") return "/login?error=Deactivated";
    //   if (user.status === "pending_restore")
    //     return "/login?error=PendingRestore";

    //   if (!user.status) {
    //     user.status = "active";
    //   }

    //   return true;
    // },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role || "user";
        session.user.status = user.status || "active";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
