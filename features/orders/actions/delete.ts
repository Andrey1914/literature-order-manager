"use server";

import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteOrder(id: string, isRegular: boolean) {
  try {
    const db = await getDb();
    const collectionName = isRegular
      ? "regular_subscriptions"
      : "special_orders";

    const result = await db.collection(collectionName).deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return { error: "Заказ не найден или уже удален" };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete order:", error);
    return { error: "Не удалось аннулировать заказ" };
  }
}
