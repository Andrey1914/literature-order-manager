"use server";

import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

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
