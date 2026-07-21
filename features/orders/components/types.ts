import type { BaseFormProps } from "@/types";
import type { SpecialOrder, RegularSubscription } from "../types";

export type { RegularSubscription, SpecialOrder };
export type Order = SpecialOrder | RegularSubscription;
export type OrderStatus = Order["status"];

export interface OrderCardProps {
  order: Order;
  isRegular: boolean;
}

export interface OrderBadgesProps {
  category: string;
  status: OrderStatus;
  language?: string;
  isRegular?: boolean;
}

export interface OrderActionsProps {
  status: OrderStatus;
  isPending: boolean;
  onStatusChange: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export interface OrderHistoryProps {
  historyDates: string[];
  isRegular?: boolean;
}

export interface CreateOrderFormProps extends BaseFormProps {
  publisherId: string;
}

export interface EditOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quantity: number, language: string) => Promise<void>;
  initialQuantity: number;
  initialLanguage: string;
  isLoading?: boolean;
}
