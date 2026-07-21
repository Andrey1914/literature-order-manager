"use server";

import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DbRegularSubscription, DbSpecialOrder } from "../types";

export async function updateOrderStatus(
  id: string,
  isRegular: boolean,
  currentStatus: "ORDERED" | "EXPECTED" | "DELIVERED",
) {
  try {
    const db = await getDb();

    const collectionName = isRegular
      ? "regular_subscriptions"
      : "special_orders";
    const orderObjectId = new ObjectId(id);

    let nextStatus = currentStatus;

    if (currentStatus === "ORDERED") {
      nextStatus = "EXPECTED";
    } else if (currentStatus === "EXPECTED") {
      nextStatus = "DELIVERED";
    }

    if (nextStatus === "DELIVERED" && isRegular) {
      await db.collection<DbRegularSubscription>(collectionName).updateOne(
        { _id: orderObjectId },
        {
          $set: { status: "ORDERED", updatedAt: new Date() },
          $push: {
            deliveryHistory: {
              $each: [new Date()],
              $slice: -6,
            },
          },
        },
      );
    } else {
      if (nextStatus === "DELIVERED") {
        await db.collection<DbSpecialOrder>(collectionName).updateOne(
          { _id: orderObjectId },
          {
            $set: { status: nextStatus, updatedAt: new Date() },
            $push: { deliveryHistory: new Date() },
          },
        );
      } else {
        await db
          .collection(collectionName)
          .updateOne(
            { _id: orderObjectId },
            { $set: { status: nextStatus, updatedAt: new Date() } },
          );
      }
    }

    revalidatePath("/dashboard");
    return {
      success: true,
      nextStatus:
        isRegular && nextStatus === "DELIVERED" ? "ORDERED" : nextStatus,
    };
  } catch (error) {
    console.error("Failed to update order status:", error);
    return { error: "Не удалось обновить статус заказа" };
  }
}

export async function bulkReceivePublications(
  congregationId: string,
  title: string,
  category: string,
  language: string,
) {
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

    await db.collection("special_orders").updateMany(
      {
        publisherId: { $in: publisherIds },
        title: title,
        category: category,
        language: language,
        status: "ORDERED",
      },
      { $set: { status: "EXPECTED", updatedAt: new Date() } },
    );

    await db.collection("regular_subscriptions").updateMany(
      {
        publisherId: { $in: publisherIds },
        title: title,
        category: category,
        status: "ORDERED",
      },
      { $set: { status: "EXPECTED", updatedAt: new Date() } },
    );

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Bulk receive error:", error);
    return { error: "Не удалось обновить статус на складе" };
  }
}
