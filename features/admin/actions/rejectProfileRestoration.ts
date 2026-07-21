"use server";

import clientPromise from "@/lib/db";
import { auth } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function rejectProfileRestoration(
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
      { _id: new ObjectId(targetUserId), status: "pending_restore" },
      {
        $set: { status: "deactivated", rejectedAt: new Date() },
        $unset: { requestedRestoreAt: "" },
      },
    );

    if (result.matchedCount === 0) {
      return { error: "Заявка не найдена или уже была обработана" };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to reject restoration:", error);
    return { error: "Не удалось отклонить заявку" };
  }
}
