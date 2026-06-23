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
      const currentIsoDate = new Date().toISOString();

      if (isRegular) {
        return {
          regularSubscriptions: state.regularSubscriptions.map((sub) =>
            sub.id === id
              ? {
                  ...sub,
                  status: nextStatus as "ORDERED" | "EXPECTED",
                  deliveryHistory: sub.deliveryHistory
                    ? [currentIsoDate, ...sub.deliveryHistory]
                    : [currentIsoDate],
                }
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
                  deliveryHistory:
                    nextStatus === "DELIVERED"
                      ? order.deliveryHistory
                        ? [currentIsoDate, ...order.deliveryHistory]
                        : [currentIsoDate]
                      : order.deliveryHistory,
                }
              : order,
          ),
        };
      }
    }),

  deleteOrderInState: (id, isRegular) =>
    set((state) =>
      isRegular
        ? {
            regularSubscriptions: state.regularSubscriptions.filter(
              (s) => s.id !== id,
            ),
          }
        : { specialOrders: state.specialOrders.filter((o) => o.id !== id) },
    ),

  updateOrderInState: (id, isRegular, title, quantity) =>
    set((state) => {
      if (isRegular) {
        return {
          regularSubscriptions: state.regularSubscriptions.map((s) =>
            s.id === id ? { ...s, title, quantity } : s,
          ),
        };
      } else {
        return {
          specialOrders: state.specialOrders.map((o) =>
            o.id === id ? { ...o, title, quantity } : o,
          ),
        };
      }
    }),

  setIsLoading: (isLoading) => set({ isLoading }),
}));
