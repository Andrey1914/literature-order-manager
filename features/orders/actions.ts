"use server";

import { ObjectId } from "mongodb";
import clientPromise from "@/lib/db";
import { revalidatePath } from "next/cache";
import {
  DbRegularSubscription,
  DbSpecialOrder,
  CreateSpecialOrderArgs,
  CreateRegularSubscriptionArgs,
  DbOrderItem,
} from "./types";

export async function createSpecialOrder(data: CreateSpecialOrderArgs) {
  try {
    const client = await clientPromise;
    const db = client.db("literature-order-manager");

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
    const client = await clientPromise;
    const db = client.db("literature-order-manager");

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

export async function updateOrderStatus(
  id: string,
  isRegular: boolean,
  currentStatus: "ORDERED" | "EXPECTED" | "DELIVERED",
) {
  try {
    const client = await clientPromise;
    const db = client.db("literature-order-manager");

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
          $set: {
            status: "ORDERED",
            updatedAt: new Date(),
          },
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

export async function getSpecialOrders(publisherId: string) {
  try {
    const client = await clientPromise;
    const db = client.db("literature-order-manager");

    const orders = await db
      .collection("special_orders")
      .find({ publisherId: new ObjectId(publisherId) })
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      data: orders.map((o) => ({
        id: o._id.toString(),
        publisherId: o.publisherId.toString(),
        category: o.category,
        title: o.title,
        quantity: o.quantity,
        status: o.status,
        deliveryHistory: o.deliveryHistory
          ? o.deliveryHistory.map((d: Date) => d.toISOString())
          : [],
      })),
    };
  } catch (error) {
    console.error("Failed to fetch special orders:", error);
    return { error: "Не удалось загрузить специальные заказы" };
  }
}

export async function getRegularSubscriptions(publisherId: string) {
  try {
    const client = await clientPromise;
    const db = client.db("literature-order-manager");

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

export async function getCongregationWarehouse(congregationId: string) {
  try {
    const client = await clientPromise;
    const db = client.db("literature-order-manager");
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

export async function bulkReceivePublications(
  congregationId: string,
  title: string,
  category: string,
) {
  try {
    const client = await clientPromise;
    const db = client.db("literature-order-manager");
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
