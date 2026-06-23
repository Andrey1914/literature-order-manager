"use server";

import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getSpecialOrders(publisherId: string) {
  try {
    const db = await getDb();

    const orders = await db
      .collection("special_orders")
      .find({ publisherId: new ObjectId(publisherId) })
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      data: orders.map((o) => {
        let history: string[] = [];
        if (o.deliveryHistory && Array.isArray(o.deliveryHistory)) {
          history = o.deliveryHistory.map((d: Date) => d.toISOString());
        } else if (o.status === "DELIVERED") {
          const fallbackDate = o.updatedAt || o.createdAt || new Date();
          history = [new Date(fallbackDate).toISOString()];
        }

        return {
          id: o._id.toString(),
          publisherId: o.publisherId.toString(),
          category: o.category,
          title: o.title,
          quantity: o.quantity,
          status: o.status,
          deliveryHistory: history,
        };
      }),
    };
  } catch (error) {
    console.error("Failed to fetch special orders:", error);
    return { error: "Не удалось загрузить специальные заказы" };
  }
}

export async function getRegularSubscriptions(publisherId: string) {
  try {
    const db = await getDb();

    const subs = await db
      .collection("regular_subscriptions")
      .find({ publisherId: new ObjectId(publisherId) })
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      data: subs.map((s) => ({
        id: s._id.toString(),
        publisherId: s.publisherId.toString(),
        category: s.category,
        title: s.title,
        quantity: s.quantity,
        status: s.status,
        isActive: s.isActive,
        deliveryHistory: s.deliveryHistory
          ? s.deliveryHistory.map((d: Date) => d.toISOString())
          : [],
      })),
    };
  } catch (error) {
    console.error("Failed to fetch regular subscriptions:", error);
    return { error: "Не удалось загрузить регулярные подписки" };
  }
}
