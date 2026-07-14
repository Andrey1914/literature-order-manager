import { ObjectId } from "mongodb";
import { DbSpecialOrder, DbRegularSubscription } from "@/features/orders/types";
import { UserRole, UserStatus } from "@/types";

interface DbCongregationDoc {
  _id: ObjectId;
  name: string;
  userId: string;
}

interface DbPublisherDoc {
  _id: ObjectId;
  name: string;
  lastName?: string | null;
  congregationId: ObjectId;
}

export interface AdminUserAggregationResult {
  _id: ObjectId;
  name: string | null;
  email: string | null;
  image: string | null;
  status: string;
  role?: UserRole;
  congregations: DbCongregationDoc[];
  publishers: DbPublisherDoc[];
  specialOrders: DbSpecialOrder[];
  regularSubs: DbRegularSubscription[];
}

export type SerializedSpecialOrder = Omit<
  DbSpecialOrder,
  "_id" | "publisherId" | "createdAt" | "updatedAt"
> & {
  id: string;
  _id: string;
  publisherId: string;
  createdAt: string;
  updatedAt: string;
};

export type SerializedRegularSubscription = Omit<
  DbRegularSubscription,
  "_id" | "publisherId" | "createdAt" | "updatedAt"
> & {
  id: string;
  _id: string;
  publisherId: string;
  createdAt: string;
  updatedAt: string;
};

interface AdminPublisherResponse {
  id: string;
  name: string;
  lastName: string | null;
  specialOrders: SerializedSpecialOrder[];
  regularSubscriptions: SerializedRegularSubscription[];
}

interface AdminCongregationResponse {
  id: string;
  name: string;
  publishers: AdminPublisherResponse[];
}

export interface AdminDashboardUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: UserRole;
  status: UserStatus;
  congregations: AdminCongregationResponse[];
}

export interface AdminDashboardResponse {
  success?: boolean;
  data?: AdminDashboardUser[];
  error?: string;
}
