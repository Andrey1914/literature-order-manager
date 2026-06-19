import { signOut } from "@/lib/auth";

export const SignOutForm = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
      className="w-full sm:w-auto"
    >
      <button
        type="submit"
        className="w-full sm:w-auto rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Выйти
      </button>
    </form>
  );
};
