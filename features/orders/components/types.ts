import { SpecialOrder, RegularSubscription } from "../types";
import { BaseFormProps } from "@/types";
export type { RegularSubscription } from "../types";

export interface OrderCardProps {
  order: SpecialOrder | RegularSubscription;
  isRegular: boolean;
}

export interface CreateOrderFormProps extends BaseFormProps {
  publisherId: string;
}
