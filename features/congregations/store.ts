import { create } from "zustand";
import { CongregationState } from "./types";

export const useCongregationStore = create<CongregationState>((set) => ({
  congregations: [],
  activeCongregationId: null,
  setCongregations: (congregations) => set({ congregations }),
  setActiveCongregation: (id) => set({ activeCongregationId: id }),

  addCongregation: (congregation) =>
    set((state) => ({
      congregations: [congregation, ...state.congregations],
      activeCongregationId: congregation.id,
    })),

  updateCongregation: (updated) =>
    set((state) => ({
      congregations: state.congregations.map((c) =>
        c.id === updated.id ? updated : c,
      ),
    })),

  deleteCongregation: (id) =>
    set((state) => ({
      congregations: state.congregations.filter((c) => c.id !== id),
      activeCongregationId:
        state.activeCongregationId === id ? null : state.activeCongregationId,
    })),
}));
