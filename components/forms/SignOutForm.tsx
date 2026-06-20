"use client";

import { signOut } from "next-auth/react";

export const SignOutForm = () => {
  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault();
    await signOut({ callbackUrl: "/" });
  };

  return (
    <form onSubmit={handleSignOut} className="w-full sm:w-auto">
      <button
        type="submit"
        className="w-full sm:w-auto rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Выйти
      </button>
    </form>
  );
};
