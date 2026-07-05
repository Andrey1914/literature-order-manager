import { DbSpecialOrder, DbRegularSubscription } from "@/features/orders/types";
import { UserRole } from "@/types";

import { Session } from "next-auth";

export interface WithSessionProps {
  session: Session | null;
}

export interface UserRowCardProps {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: UserRole;
    congregations: Array<{ name: string }>;
  };
}

export interface Congregation {
  id: string;
  name: string;
  userId?: string;
  country?: string;
  publishers?: Publisher[];
}

export interface Publisher {
  id: string;
  name: string;
  lastName?: string | null;
  congregationId?: string;
  pendingCount?: number;
  specialOrders?: DbSpecialOrder[];
  regularSubscriptions?: DbRegularSubscription[];
}

export interface BaseFormProps {
  onSuccess: () => void;
}
