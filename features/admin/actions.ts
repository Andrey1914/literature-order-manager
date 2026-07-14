"use server";

import clientPromise from "@/lib/db";
import { auth } from "@/lib/auth";
import { ObjectId } from "mongodb";
import {
  AdminDashboardResponse,
  AdminUserAggregationResult,
  AdminDashboardUser,
} from "./types";
import { UserStatus } from "@/types";

type SerializedSpecialOrder = Omit<
  AdminDashboardUser["congregations"][number]["publishers"][number]["specialOrders"][number],
  "_id" | "publisherId" | "createdAt" | "updatedAt"
> & {
  id: string;
  _id: string;
  publisherId: string;
  createdAt: string;
  updatedAt: string;
};

type SerializedRegularSubscription = Omit<
  AdminDashboardUser["congregations"][number]["publishers"][number]["regularSubscriptions"][number],
  "_id" | "publisherId" | "createdAt" | "updatedAt"
> & {
  id: string;
  _id: string;
  publisherId: string;
  createdAt: string;
  updatedAt: string;
};

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
          $lookup: {
            from: "publishers",
            localField: "congregations._id",
            foreignField: "congregationId",
            as: "publishers",
          },
        },
        {
          $lookup: {
            from: "special_orders",
            localField: "publishers._id",
            foreignField: "publisherId",
            as: "specialOrders",
          },
        },
        {
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
      // status: user.status || "active",
      status: user.status as UserStatus,
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
            specialOrders: user.specialOrders
              .filter(
                (o) => o.publisherId.toHexString() === p._id.toHexString(),
              )
              .map(
                (o): SerializedSpecialOrder => ({
                  ...o,
                  id: o._id.toString(),
                  _id: o._id.toString(),
                  publisherId: o.publisherId.toString(),
                  createdAt:
                    o.createdAt instanceof Date
                      ? o.createdAt.toISOString()
                      : String(o.createdAt),
                  updatedAt:
                    o.updatedAt instanceof Date
                      ? o.updatedAt.toISOString()
                      : String(o.updatedAt),
                }),
              ),
            regularSubscriptions: user.regularSubs
              .filter(
                (s) => s.publisherId.toHexString() === p._id.toHexString(),
              )
              .map(
                (s): SerializedRegularSubscription => ({
                  ...s,
                  id: s._id.toString(),
                  _id: s._id.toString(),
                  publisherId: s.publisherId.toString(),
                  createdAt:
                    s.createdAt instanceof Date
                      ? s.createdAt.toISOString()
                      : String(s.createdAt),
                  updatedAt:
                    s.updatedAt instanceof Date
                      ? s.updatedAt.toISOString()
                      : String(s.updatedAt),
                }),
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

export async function deactivateOwnProfile(): Promise<{
  success?: boolean;
  error?: string;
}> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const client = await clientPromise;
    const db = client.db("literature-order-manager");
    const userId = new ObjectId(session.user.id);

    await db
      .collection("users")
      .updateOne(
        { _id: userId },
        { $set: { status: "deactivated", deactivatedAt: new Date() } },
      );

    await db.collection("sessions").deleteMany({ userId: session.user.id });

    return { success: true };
  } catch (error) {
    console.error("Failed to deactivate profile:", error);
    return { error: "Не удалось удалить профиль" };
  }
}

export async function requestProfileRestoration(
  email: string,
): Promise<{ success?: boolean; error?: string }> {
  try {
    if (!email) return { error: "Email не указан" };

    const client = await clientPromise;
    const db = client.db("literature-order-manager");

    const user = await db.collection("users").findOne({ email: email });

    if (!user) {
      return { error: "Профиль с таким Email не найден" };
    }

    if (user.status === "pending_restore") {
      return {
        error:
          "Запрос на восстановление уже был отправлен и ожидает подтверждения администратора",
      };
    }

    if (user.status === "active") {
      return { error: "Этот профиль уже активен в системе" };
    }

    const result = await db
      .collection("users")
      .updateOne(
        { _id: user._id },
        { $set: { status: "pending_restore", requestedRestoreAt: new Date() } },
      );

    if (result.matchedCount === 0) {
      return {
        error: "Профиль не найден или статус не позволяет сделать запрос",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to request restoration:", error);
    return { error: "Не удалось отправить запрос" };
  }
}

export async function restoreUserProfile(
  targetUserId: string,
): Promise<{ success?: boolean; error?: string }> {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "superadmin") {
      return { error: "Unauthorized" };
    }

    const client = await clientPromise;
    const db = client.db("literature-order-manager");

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(targetUserId) },
      {
        $set: { status: "active" },
        $unset: { deactivatedAt: "", requestedRestoreAt: "" },
      },
    );

    if (result.matchedCount === 0) {
      return { error: "Пользователь не найден" };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to restore user profile:", error);
    return { error: "Не удалось восстановить профиль" };
  }
}

export async function rejectProfileRestoration(
  targetUserId: string,
): Promise<{ success?: boolean; error?: string }> {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "superadmin") {
      return { error: "Unauthorized" };
    }

    const client = await clientPromise;
    const db = client.db("literature-order-manager");

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(targetUserId), status: "pending_restore" },
      {
        $set: { status: "deactivated", rejectedAt: new Date() },
        $unset: { requestedRestoreAt: "" },
      },
    );

    if (result.matchedCount === 0) {
      return { error: "Заявка не найдена или уже была обработана" };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to reject restoration:", error);
    return { error: "Не удалось отклонить заявку" };
  }
}
