import { auth } from "@/lib/auth";
import clientPromise from "@/lib/db";
import { DashboardView } from "@/views/DashboardView";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const client = await clientPromise;
  const db = client.db("literature-order-manager");

  const data = await db
    .collection("congregations")
    .find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .toArray();

  const initialCongregations = data.map((doc) => ({
    id: doc._id.toString(),
    name: doc.name,
    userId: doc.userId,
    country: doc.country || undefined,
  }));

  return <DashboardView initialCongregations={initialCongregations} />;
}
