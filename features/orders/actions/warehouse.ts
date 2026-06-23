"use server";

import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { DbOrderItem } from "../types";

export async function getCongregationWarehouse(congregationId: string) {
  try {
    const db = await getDb();
    const congregationObjectId = new ObjectId(congregationId);

    const publishers = await db
      .collection("publishers")
      .find(
        { congregationId: congregationObjectId },
        { projection: { _id: 1 } },
      )
      .toArray();

    const publisherIds = publishers.map((p) => p._id);

    if (publisherIds.length === 0) {
      return { success: true, data: [] };
    }

    const specialOrders = await db
      .collection("special_orders")
      .find<DbOrderItem>({
        publisherId: { $in: publisherIds },
        status: { $ne: "DELIVERED" },
      })
      .toArray();

    const regularSubs = await db
      .collection("regular_subscriptions")
      .find<DbOrderItem>({
        publisherId: { $in: publisherIds },
        isActive: true,
      })
      .toArray();

    const warehouseMap: Record<
      string,
      {
        title: string;
        category: string;
        status: "ORDERED" | "EXPECTED";
        quantity: number;
        type: "SPECIAL" | "REGULAR";
      }
    > = {};

    const addToMap = (item: DbOrderItem, type: "SPECIAL" | "REGULAR") => {
      const key = `${item.title}_${item.category}_${item.status}`;
      if (warehouseMap[key]) {
        warehouseMap[key].quantity += item.quantity;
      } else {
        warehouseMap[key] = {
          title: item.title,
          category: item.category,
          status: item.status,
          quantity: item.quantity,
          type,
        };
      }
    };

    specialOrders.forEach((o) => addToMap(o, "SPECIAL"));
    regularSubs.forEach((s) => addToMap(s, "REGULAR"));

    return { success: true, data: Object.values(warehouseMap) };
  } catch (error) {
    console.error("Warehouse aggregation error:", error);
    return { error: "Не удалось загрузить склад собрания" };
  }
}
