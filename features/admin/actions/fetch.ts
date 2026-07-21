"use server";

import clientPromise from "@/lib/db";
import { auth } from "@/lib/auth";
import { UserStatus } from "@/types";
import {
  AdminDashboardResponse,
  AdminUserAggregationResult,
  AdminDashboardUser,
  SerializedSpecialOrder,
  SerializedRegularSubscription,
} from "../types";

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
