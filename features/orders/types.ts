import { ObjectId } from "mongodb";

interface BaseOrderFields<TCategory, TStatus> {
  category: TCategory;
  title: string;
  quantity: number;
  status: TStatus;
  language?: string;
}

interface BaseClientOrder<TCategory, TStatus> extends BaseOrderFields<
  TCategory,
  TStatus
> {
  id: string;
  publisherId: string;
  deliveryHistory?: string[];
}

interface BaseDbOrder<TCategory, TStatus> extends BaseOrderFields<
  TCategory,
  TStatus
> {
  _id: ObjectId;
  publisherId: ObjectId;
  deliveryHistory?: Date[];
  createdAt: Date;
  updatedAt: Date;
}

interface BaseCreateArgs<TCategory> {
  publisherId: string;
  category: TCategory;
  title: string;
  quantity: number;
  language?: string;
}

export type SpecialCategory = "BOOK" | "BROCHURE" | "CD" | "ANNUAL_EDITION";
export type SpecialStatus = "ORDERED" | "EXPECTED" | "DELIVERED";

export type RegularCategory = "MAGAZINE" | "WORKBOOK";
export type RegularStatus = "ORDERED" | "EXPECTED";

export type OrderStatus = "ORDERED" | "EXPECTED";

export type SpecialOrder = BaseClientOrder<SpecialCategory, SpecialStatus>;

export interface RegularSubscription extends BaseClientOrder<
  RegularCategory,
  RegularStatus
> {
  isActive: boolean;
}

export type DbSpecialOrder = BaseDbOrder<SpecialCategory, SpecialStatus>;

export interface DbRegularSubscription extends BaseDbOrder<
  RegularCategory,
  RegularStatus
> {
  isActive: boolean;
}

export type DbOrderItem = BaseOrderFields<string, OrderStatus>;

export type CreateSpecialOrderArgs = BaseCreateArgs<SpecialCategory>;
export type CreateRegularSubscriptionArgs = BaseCreateArgs<RegularCategory>;

export interface OrderState {
  specialOrders: SpecialOrder[];
  regularSubscriptions: RegularSubscription[];
  isLoading: boolean;

  setSpecialOrders: (orders: SpecialOrder[]) => void;
  setRegularSubscriptions: (subs: RegularSubscription[]) => void;
  addSpecialOrder: (order: SpecialOrder) => void;
  addRegularSubscription: (sub: RegularSubscription) => void;
  updateStatusInState: (
    id: string,
    isRegular: boolean,
    nextStatus: string,
  ) => void;
  deleteOrderInState: (id: string, isRegular: boolean) => void;
  updateOrderInState: (
    id: string,
    isRegular: boolean,
    title: string,
    quantity: number,
    language?: string,
  ) => void;
  setIsLoading: (isLoading: boolean) => void;
}
