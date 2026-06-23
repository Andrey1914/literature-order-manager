"use server";

import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import {
  CreateSpecialOrderArgs,
  CreateRegularSubscriptionArgs,
} from "../types";

export async function createSpecialOrder(data: CreateSpecialOrderArgs) {
  try {
    const db = await getDb();

    const newOrder = {
      publisherId: new ObjectId(data.publisherId),
      category: data.category,
      title: data.title.trim(),
      quantity: Number(data.quantity) || 1,
      status: "ORDERED",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("special_orders").insertOne(newOrder);

    revalidatePath("/dashboard");
    return { success: true, id: result.insertedId.toString() };
  } catch (error) {
    console.error("Failed to create special order:", error);
    return { error: "Не удалось создать специальный заказ" };
  }
}

export async function createRegularSubscription(
  data: CreateRegularSubscriptionArgs,
) {
  try {
    const db = await getDb();

    const newSubscription = {
      publisherId: new ObjectId(data.publisherId),
      category: data.category,
      title: data.title.trim(),
      quantity: Number(data.quantity) || 1,
      status: "ORDERED",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection("regular_subscriptions")
      .insertOne(newSubscription);

    revalidatePath("/dashboard");
    return { success: true, id: result.insertedId.toString() };
  } catch (error) {
    console.error("Failed to create regular subscription:", error);
    return { error: "Не удалось создать регулярную подписку" };
  }
}
