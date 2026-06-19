"use server";

import clientPromise from "@/lib/db";

export async function createCongregation(name: string, userId: string) {
  const client = await clientPromise;

  const db = client.db();

  const newCongregation = await db.collection("congregations").insertOne({
    name,
    userId,
    createdAt: new Date(),
  });

  return {
    id: newCongregation.insertedId.toString(),
    name,
    userId,
  };
}
