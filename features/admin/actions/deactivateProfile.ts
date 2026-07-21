"use server";

import clientPromise from "@/lib/db";
import { auth } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function deactivateOwnProfile(): Promise<{
  success?: boolean;
  error?: string;
}> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const client = await clientPromise;
    const db = client.db("literature-order-manager");
    const userId = new ObjectId(session.user.id);

    await db
      .collection("users")
      .updateOne(
        { _id: userId },
        { $set: { status: "deactivated", deactivatedAt: new Date() } },
      );

    await db.collection("sessions").deleteMany({ userId: session.user.id });

    return { success: true };
  } catch (error) {
    console.error("Failed to deactivate profile:", error);
    return { error: "Не удалось удалить профиль" };
  }
}
