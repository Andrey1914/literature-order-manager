import { auth } from "@/lib/auth";
import { redirect } from "@/i18n/config"; // Импортируем из твоего конфига i18n

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await auth();

  // Жесткая проверка: если не админ — доступ закрыт
  if (!session?.user || session.user.role !== "superadmin") {
    redirect({ href: "/dashboard", locale: params.locale });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}

// import { auth } from "@/lib/auth";
// import { redirect } from "next-navigation"; // или из твоего @/i18n/config, если используется i18n redirect

// export default async function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const session = await auth();

//   // Жесткая проверка: если не админ — доступ закрыт
//   if (!session?.user || session.user.role !== "superadmin") {
//     redirect("/dashboard");
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Здесь может быть админский под-хедер, если он понадобится */}
//       <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">{children}</main>
//     </div>
//   );
// }
