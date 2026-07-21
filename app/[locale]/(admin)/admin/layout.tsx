import { auth } from "@/lib/auth";
import { redirect } from "@/i18n/config";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const session = await auth();
  const { locale } = await params;

  if (!session?.user || session.user.role !== "superadmin") {
    redirect({ href: "/dashboard", locale });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start text-left bg-gray-50 p-4 transition-colors dark:bg-slate-950">
      <main className="w-full max-w-7xl space-y-6 rounded-2xl bg-white p-8 shadow-sm border border-gray-100 dark:bg-slate-900/50 dark:border-slate-800">
        {children}
      </main>
    </div>
  );
}
