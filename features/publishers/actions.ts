"use server";

import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function createPublisher(data: {
  name: string;
  lastName?: string;
  congregationId: string;
}) {
  try {
    if (!data.name.trim()) {
      return { error: "Имя обязательно для заполнения" };
    }

    const client = await clientPromise;
    const db = client.db("literature-order-manager");

    const newPublisher = {
      name: data.name.trim(),
      lastName: data.lastName?.trim() || null,
      congregationId: new ObjectId(data.congregationId),
      createdAt: new Date(),
    };

    const result = await db.collection("publishers").insertOne(newPublisher);

    revalidatePath("/dashboard");

    return {
      success: true,
      publisher: {
        id: result.insertedId.toString(),
        name: newPublisher.name,
        lastName: newPublisher.lastName,
        congregationId: data.congregationId,
      },
    };
  } catch (error) {
    console.error("Failed to create publisher:", error);
    return { error: "Не удалось создать возвещателя" };
  }
}

export async function updatePublisher(data: {
  id: string;
  name: string;
  lastName?: string;
}) {
  try {
    if (!data.name.trim()) {
      return { error: "Имя обязательно для заполнения" };
    }

    const client = await clientPromise;
    const db = client.db("literature-order-manager");

    await db.collection("publishers").updateOne(
      { _id: new ObjectId(data.id) },
      {
        $set: {
          name: data.name.trim(),
          lastName: data.lastName?.trim() || null,
          updatedAt: new Date(),
        },
      },
    );

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to update publisher:", error);
    return { error: "Не удалось обновить данные возвещателя" };
  }
}

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
    return { error: "Не удалось полностью удалить возвещателя и его заказы" };
  }
}
