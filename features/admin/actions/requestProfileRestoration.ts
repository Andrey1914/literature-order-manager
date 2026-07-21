"use server";

import clientPromise from "@/lib/db";

export async function requestProfileRestoration(
  email: string,
): Promise<{ success?: boolean; error?: string }> {
  try {
    if (!email) return { error: "Email не указан" };

    const client = await clientPromise;
    const db = client.db("literature-order-manager");

    const user = await db.collection("users").findOne({ email: email });

    if (!user) {
      return { error: "Профиль с таким Email не найден" };
    }

    if (user.status === "pending_restore") {
      return {
        error:
          "Запрос на восстановление уже был отправлен и ожидает подтверждения администратора",
      };
    }

    if (user.status === "active") {
      return { error: "Этот профиль уже активен в системе" };
    }

    const result = await db
      .collection("users")
      .updateOne(
        { _id: user._id },
        { $set: { status: "pending_restore", requestedRestoreAt: new Date() } },
      );

    if (result.matchedCount === 0) {
      return {
        error: "Профиль не найден или статус не позволяет сделать запрос",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to request restoration:", error);
    return { error: "Не удалось отправить запрос" };
  }
}
