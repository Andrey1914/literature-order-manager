import { signIn } from "@/lib/auth";
import { GoogleIcon } from "./icons/GoogleIcon";

export const GoogleSignInButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
      >
        <GoogleIcon />
        Войти через Google
      </button>
    </form>
  );
};
