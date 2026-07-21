"use server";

import clientPromise from "@/lib/db";
import { auth } from "@/lib/auth";

export async function createCongregation(name: string, country?: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Неавторизован");
  }

  if (!name.trim()) {
    throw new Error("Название собрания обязательно");
  }

  const client = await clientPromise;
  const db = client.db("literature-order-manager");

  const newDoc = {
    name: name.trim(),
    userId: session.user.id,
    country: country?.trim() || null,
    createdAt: new Date(),
  };

  const result = await db.collection("congregations").insertOne(newDoc);

  return {
    id: result.insertedId.toString(),
    name: newDoc.name,
    userId: newDoc.userId,
    country: newDoc.country || undefined,
  };
}
