import { GoogleSignInButton } from "@/components/ui";

export const LoginView = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md text-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Войти в систему
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Управляйте заказами литературы.
          </p>
        </div>

        <GoogleSignInButton />
      </div>
    </div>
  );
};
