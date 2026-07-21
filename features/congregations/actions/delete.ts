"use server";

import clientPromise from "@/lib/db";
import { auth } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function deleteCongregation(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Неавторизован");

  const client = await clientPromise;
  const db = client.db("literature-order-manager");

  await db.collection("congregations").deleteOne({
    _id: new ObjectId(id),
    userId: session.user.id,
  });

  await db.collection("publishers").deleteMany({ congregationId: id });
  await db.collection("orders").deleteMany({ congregationId: id });

  return { id };
}
