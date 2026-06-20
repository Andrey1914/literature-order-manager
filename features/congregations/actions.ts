"use server";

import clientPromise from "@/lib/db";
import { auth } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function createCongregationAction(name: string, country?: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Неавторизован");
  }

  if (!name.trim()) {
    throw new Error("Название собрания обязательно");
  }

  const client = await clientPromise;

  const db = client.db();

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

export async function updateCongregationAction(
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

export async function deleteCongregationAction(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Неавторизован");

  const client = await clientPromise;
  const db = client.db("literature-order-manager");

  await db.collection("congregations").deleteOne({
    _id: new ObjectId(id),
    userId: session.user.id,
  });

  await db.collection("customers").deleteMany({ congregationId: id });
  await db.collection("orders").deleteMany({ congregationId: id });

  return { id };
}
