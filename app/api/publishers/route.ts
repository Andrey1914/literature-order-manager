import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const congregationId = searchParams.get("congregationId");

    if (!congregationId) {
      return NextResponse.json(
        { error: "Missing congregationId" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("literature-order-manager");

    const data = await db
      .collection("publishers")
      .find({ congregationId: new ObjectId(congregationId) })
      .sort({ name: 1 })
      .toArray();

    const publishers = data.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      lastName: doc.lastName || null,
      congregationId: doc.congregationId.toString(),
    }));

    return NextResponse.json(publishers);
  } catch (error) {
    console.error("Failed to fetch publishers:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
