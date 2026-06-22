import { create } from "zustand";
import { OrderState } from "./types";

export const useOrderStore = create<OrderState>((set) => ({
  specialOrders: [],
  regularSubscriptions: [],
  isLoading: false,

  setSpecialOrders: (specialOrders) => set({ specialOrders }),

  setRegularSubscriptions: (regularSubscriptions) =>
    set({ regularSubscriptions }),

  addSpecialOrder: (order) =>
    set((state) => ({ specialOrders: [order, ...state.specialOrders] })),

  addRegularSubscription: (sub) =>
    set((state) => ({
      regularSubscriptions: [sub, ...state.regularSubscriptions],
    })),

  updateStatusInState: (id, isRegular, nextStatus) =>
    set((state) => {
      if (isRegular) {
        return {
          regularSubscriptions: state.regularSubscriptions.map((sub) =>
            sub.id === id
              ? { ...sub, status: nextStatus as "ORDERED" | "EXPECTED" }
              : sub,
          ),
        };
      } else {
        return {
          specialOrders: state.specialOrders.map((order) =>
            order.id === id
              ? {
                  ...order,
                  status: nextStatus as "ORDERED" | "EXPECTED" | "DELIVERED",
                }
              : order,
          ),
        };
      }
    }),

  setIsLoading: (isLoading) => set({ isLoading }),
}));
