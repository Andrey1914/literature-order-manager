"use server";

import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateOrderDetails(
  id: string,
  isRegular: boolean,
  data: { title: string; quantity: number; language?: string },
) {
  try {
    const db = await getDb();
    const collectionName = isRegular
      ? "regular_subscriptions"
      : "special_orders";

    // const result = await db.collection(collectionName).updateOne(
    //   { _id: new ObjectId(id) },
    //   {
    //     $set: {
    //       title: data.title.trim(),
    //       quantity: Number(data.quantity) || 1,
    //       updatedAt: new Date(),
    //     },
    //   },
    // );
    const updatePayload = {
      title: data.title.trim(),
      quantity: Number(data.quantity) || 1,
      updatedAt: new Date(),
      language: data.language?.trim(),
    };

    if (data.language) {
      updatePayload.language = data.language.trim().toLowerCase();
    }

    const result = await db
      .collection(collectionName)
      .updateOne({ _id: new ObjectId(id) }, { $set: updatePayload });

    if (result.matchedCount === 0) {
      return { error: "Заказ не найден" };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to update order details:", error);
    return { error: "Не удалось обновить данные заказа" };
  }
}
