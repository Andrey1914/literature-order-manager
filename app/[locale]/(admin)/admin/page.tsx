import { getAdminDashboardData } from "@/features/admin/actions";
import { UserRowCard } from "@/features/admin/components/UserRowCard";

export default async function AdminPage() {
  const { success, data: users, error } = await getAdminDashboardData();

  if (error || !success || !users) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
        {error || "Произошла ошибка при загрузке данных"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">
          Панель администратора
        </h1>
        <p className="text-sm text-gray-500">
          Выберите служителя литературы для детального просмотра его собрания и
          заказов.
        </p>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12 text-sm text-gray-500 bg-white rounded-2xl border border-gray-100 shadow-sm">
          Пользователи не найдены
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <UserRowCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}

// import Image from "next/image";
// import { getAdminDashboardData } from "@/features/admin/actions";
// // import { useTranslations } from "next-intl";

// export default async function AdminPage() {
//   //   const t = useTranslations("User");
//   const { success, data: users, error } = await getAdminDashboardData();

//   if (error || !success || !users) {
//     return (
//       <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
//         {error || "Произошла ошибка при загрузке данных"}
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Шапка админки */}
//       <div className="flex flex-col gap-1 border-b border-gray-200 pb-5">
//         <h1 className="text-2xl font-bold text-gray-900">
//           Панель администратора
//         </h1>
//         <p className="text-sm text-gray-500">
//           Просмотр всех зарегистрированных служителей, их собраний, возвещателей
//           и текущих заказов.
//         </p>
//       </div>

//       {users.length === 0 ? (
//         <div className="text-center py-12 text-sm text-gray-500 bg-white rounded-2xl border border-gray-100 shadow-sm">
//           Пользователи не найдены
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {users.map((user) => (
//             <div
//               key={user.id}
//               className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
//             >
//               {/* Уровень 1: Пользователь (Служитель Литературы) */}
//               <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
//                 <div className="flex items-center gap-3">
//                   {user.image ? (
//                     <Image
//                       width={40}
//                       height={40}
//                       src={user.image}
//                       alt={user.name || "User"}
//                       className="w-10 h-10 rounded-full object-cover border border-gray-200"
//                     />
//                   ) : (
//                     <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
//                       {user.name?.charAt(0) || "U"}
//                     </div>
//                   )}
//                   <div>
//                     <h2 className="text-sm font-semibold text-gray-900">
//                       {user.name || "Без имени"}
//                     </h2>
//                     <p className="text-xs text-gray-500">{user.email}</p>
//                   </div>
//                 </div>
//                 <div className="text-xs text-gray-400 font-mono">
//                   ID: {user.id}
//                 </div>
//               </div>

//               {/* Уровень 2: Собрания пользователя */}
//               <div className="p-4 space-y-4">
//                 {user.congregations.length === 0 ? (
//                   <p className="text-xs text-gray-400 italic">
//                     Собрание ещё не создано
//                   </p>
//                 ) : (
//                   user.congregations.map((cong) => (
//                     <div
//                       key={cong.id}
//                       className="border border-gray-100 rounded-xl p-4 bg-white shadow-xs"
//                     >
//                       <h3 className="text-base font-bold text-indigo-900 mb-3 flex items-center gap-2">
//                         Собрание: {cong.name}
//                       </h3>

//                       {/* Уровень 3: Возвещатели собрания */}
//                       {cong.publishers.length === 0 ? (
//                         <p className="text-xs text-gray-400 italic pl-4">
//                           В собрании нет возвещателей
//                         </p>
//                       ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2">
//                           {cong.publishers.map((pub) => {
//                             const totalOrdersCount =
//                               pub.specialOrders.length +
//                               pub.regularSubscriptions.length;

//                             return (
//                               <div
//                                 key={pub.id}
//                                 className="border border-gray-100 rounded-lg p-3 bg-blue-50/40 flex flex-col justify-between"
//                               >
//                                 <div>
//                                   <div className="flex items-start justify-between gap-2 mb-2 bg-transparent">
//                                     <h4 className="text-xs font-bold text-gray-800">
//                                       👤{" "}
//                                       {pub.lastName ? `${pub.lastName} ` : ""}
//                                       {pub.name}
//                                     </h4>
//                                     {totalOrdersCount > 0 && (
//                                       <span className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-full font-semibold border border-amber-100 shrink-0">
//                                         Заказов: {totalOrdersCount}
//                                       </span>
//                                     )}
//                                   </div>

//                                   {/* Уровень 4: Заказы возвещателя (Без кнопок управления) */}
//                                   <div className="space-y-2 mt-2 bg-blue-50/35">
//                                     {/* Специальные заказы */}
//                                     {pub.specialOrders.map((order) => (
//                                       <div
//                                         key={order._id.toString()}
//                                         className="text-[11px] bg-white p-2 rounded border border-gray-100 flex justify-between items-center gap-2"
//                                       >
//                                         <div className="truncate">
//                                           <span className="font-semibold text-gray-500 mr-1">
//                                             [{order.category}]
//                                           </span>
//                                           <span className="text-gray-700">
//                                             {order.title}
//                                           </span>
//                                         </div>
//                                         <div className="flex items-center gap-1.5 shrink-0">
//                                           <span className="font-bold text-gray-900">
//                                             {order.quantity} шт.
//                                           </span>
//                                           <span
//                                             className={`text-[9px] px-1 rounded font-medium ${
//                                               order.status === "EXPECTED"
//                                                 ? "bg-green-50 text-green-600 border border-green-100"
//                                                 : order.status === "DELIVERED"
//                                                   ? "bg-gray-100 text-gray-500"
//                                                   : "bg-blue-50 text-blue-600 border border-blue-100"
//                                             }`}
//                                           >
//                                             {order.status}
//                                           </span>
//                                         </div>
//                                       </div>
//                                     ))}

//                                     {/* Регулярные подписки */}
//                                     {pub.regularSubscriptions.map((sub) => (
//                                       <div
//                                         key={sub._id.toString()}
//                                         className="text-[11px] bg-white p-2 rounded border border-gray-100 flex justify-between items-center gap-2"
//                                       >
//                                         <div className="truncate">
//                                           <span className="font-semibold text-purple-500 mr-1">
//                                             [{sub.category}]
//                                           </span>
//                                           <span className="text-gray-700">
//                                             {sub.title}
//                                           </span>
//                                         </div>
//                                         <div className="flex items-center gap-1.5 shrink-0">
//                                           <span className="font-bold text-gray-900">
//                                             {sub.quantity} шт.
//                                           </span>
//                                           <span
//                                             className={`text-[9px] px-1 rounded font-medium ${
//                                               sub.status === "EXPECTED"
//                                                 ? "bg-green-50 text-green-600 border border-green-100"
//                                                 : "bg-blue-50 text-blue-600 border border-blue-100"
//                                             }`}
//                                           >
//                                             {sub.status}
//                                           </span>
//                                         </div>
//                                       </div>
//                                     ))}
//                                   </div>

//                                   {totalOrdersCount === 0 && (
//                                     <p className="text-[11px] text-gray-400 italic mt-1">
//                                       Нет активных заказов
//                                     </p>
//                                   )}
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       )}
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
