"use server";

import clientPromise from "@/lib/db";
import { auth } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function updateCongregation(
  id: string,
  name: string,
  country?: string,
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Неавторизован");
  if (!name.trim()) throw new Error("Название обязательно");

  const client = await clientPromise;
  const db = client.db("literature-order-manager");

  await db.collection("congregations").updateOne(
    { _id: new ObjectId(id), userId: session.user.id },
    {
      $set: {
        name: name.trim(),
        country: country?.trim() || null,
        updatedAt: new Date(),
      },
    },
  );

  return { id, name, country, userId: session.user.id };
}
