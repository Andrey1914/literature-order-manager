"use server";

import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function deletePublisher(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("literature-order-manager");

    const publisherObjectId = new ObjectId(id);

    await db
      .collection("orders")
      .deleteMany({ publisherId: publisherObjectId });

    await db.collection("publishers").deleteOne({ _id: publisherObjectId });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete publisher and their orders:", error);
    return { error: "Failed to delete publisher and their orders" };
  }
}
