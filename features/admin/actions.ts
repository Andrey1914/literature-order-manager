"use server";

import clientPromise from "@/lib/db";
import { auth } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { DbSpecialOrder, DbRegularSubscription } from "@/features/orders/types";
import { UserRole } from "@/types";

interface DbCongregationDoc {
  _id: ObjectId;
  name: string;
  userId: string;
}

interface DbPublisherDoc {
  _id: ObjectId;
  name: string;
  lastName?: string | null;
  congregationId: ObjectId;
}

interface AdminUserAggregationResult {
  _id: ObjectId;
  name: string | null;
  email: string | null;
  image: string | null;
  role?: UserRole;
  congregations: DbCongregationDoc[];
  publishers: DbPublisherDoc[];
  specialOrders: DbSpecialOrder[];
  regularSubs: DbRegularSubscription[];
}

interface AdminPublisherResponse {
  id: string;
  name: string;
  lastName: string | null;
  specialOrders: DbSpecialOrder[];
  regularSubscriptions: DbRegularSubscription[];
}

interface AdminCongregationResponse {
  id: string;
  name: string;
  publishers: AdminPublisherResponse[];
}

interface AdminDashboardUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: UserRole;
  congregations: AdminCongregationResponse[];
}

interface AdminDashboardResponse {
  success?: boolean;
  data?: AdminDashboardUser[];
  error?: string;
}

export async function getAdminDashboardData(): Promise<AdminDashboardResponse> {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "superadmin") {
      return { error: "Unauthorized" };
    }

    const client = await clientPromise;
    const db = client.db("literature-order-manager");

    const usersTree = await db
      .collection("users")
      .aggregate<AdminUserAggregationResult>([
        {
          // 1. Ищем собрания. Так как в congregations.userId лежит строка,
          // конвертируем _id пользователя в строку для корректного сравнения.
          $lookup: {
            from: "congregations",
            let: { userIdStr: { $toString: "$_id" } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$userId", "$$userIdStr"] },
                },
              },
            ],
            as: "congregations",
          },
        },
        {
          // 2. Ищем возвещателей для этих собраний (связь ObjectId <-> ObjectId)
          $lookup: {
            from: "publishers",
            localField: "congregations._id",
            foreignField: "congregationId",
            as: "publishers",
          },
        },
        {
          // 3. Ищем спецзаказы возвещателей
          $lookup: {
            from: "special_orders",
            localField: "publishers._id",
            foreignField: "publisherId",
            as: "specialOrders",
          },
        },
        {
          // 4. Ищем подписки возвещателей
          $lookup: {
            from: "regular_subscriptions",
            localField: "publishers._id",
            foreignField: "publisherId",
            as: "regularSubs",
          },
        },
      ])
      .toArray();

    const serializedData: AdminDashboardUser[] = usersTree.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role || "user",
      congregations: user.congregations.map((cong) => ({
        id: cong._id.toString(),
        name: cong.name,
        publishers: user.publishers
          .filter(
            (p) => p.congregationId.toHexString() === cong._id.toHexString(),
          )
          .map((p) => ({
            id: p._id.toString(),
            name: p.name,
            lastName: p.lastName || null,
            specialOrders: user.specialOrders.filter(
              (o) => o.publisherId.toHexString() === p._id.toHexString(),
            ),
            regularSubscriptions: user.regularSubs.filter(
              (s) => s.publisherId.toHexString() === p._id.toHexString(),
            ),
          })),
      })),
    }));

    return { success: true, data: serializedData };
  } catch (error) {
    console.error("Admin data fetch failed:", error);
    return { error: "Не удалось загрузить админ-панель" };
  }
}
