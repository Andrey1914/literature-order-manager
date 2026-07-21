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
