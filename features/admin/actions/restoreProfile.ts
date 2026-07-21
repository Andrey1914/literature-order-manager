"use server";

import clientPromise from "@/lib/db";
import { auth } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function restoreUserProfile(
  targetUserId: string,
): Promise<{ success?: boolean; error?: string }> {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "superadmin") {
      return { error: "Unauthorized" };
    }

    const client = await clientPromise;
    const db = client.db("literature-order-manager");

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(targetUserId) },
      {
        $set: { status: "active" },
        $unset: { deactivatedAt: "", requestedRestoreAt: "" },
      },
    );

    if (result.matchedCount === 0) {
      return { error: "Пользователь не найден" };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to restore user profile:", error);
    return { error: "Не удалось восстановить профиль" };
  }
}
