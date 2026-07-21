"use server";

import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { auth } from "@/lib/auth";

export async function getPublishersByCongregation(congregationId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const client = await clientPromise;
    const db = client.db("literature-order-manager");

    const publishersData = await db
      .collection("publishers")
      .find({ congregationId: new ObjectId(congregationId) })
      .sort({ name: 1 })
      .toArray();

    if (publishersData.length === 0) {
      return { success: true, data: [] };
    }

    const publisherIdStrings = publishersData.map((p) => p._id.toString());
    const publisherIdObjects = publishersData.map((p) => p._id);

    const searchQuery = {
      $or: [
        { publisherId: { $in: publisherIdStrings } },
        { publisherId: { $in: publisherIdObjects } },
      ],
    };

    const [specialOrders, regularSubs] = await Promise.all([
      db.collection("special_orders").find(searchQuery).toArray(),
      db.collection("regular_subscriptions").find(searchQuery).toArray(),
    ]);

    const publishers = publishersData.map((doc) => {
      const currentPublisherIdStr = doc._id.toString();

      const matchedSpecials = specialOrders.filter(
        (order) =>
          order.publisherId?.toString() === currentPublisherIdStr &&
          order.status === "EXPECTED",
      );

      const matchedRegulars = regularSubs.filter(
        (sub) =>
          sub.publisherId?.toString() === currentPublisherIdStr &&
          sub.status === "EXPECTED",
      );

      const specialQuantity = matchedSpecials.reduce(
        (sum, o) => sum + (o.quantity || 0),
        0,
      );
      const regularQuantity = matchedRegulars.reduce(
        (sum, s) => sum + (s.quantity || 0),
        0,
      );

      const totalPending = specialQuantity + regularQuantity;

      return {
        id: currentPublisherIdStr,
        name: doc.name,
        lastName: doc.lastName || null,
        congregationId: doc.congregationId.toString(),
        pendingCount: totalPending,
      };
    });

    return { success: true, data: publishers };
  } catch (error) {
    console.error("Failed to fetch publishers:", error);
    return { error: "Failed to fetch publishers" };
  }
}
