import { create } from "zustand";
import { Congregation } from "./types";

interface CongregationState {
  congregations: Congregation[];
  activeCongregationId: string | null;
  setCongregations: (congregations: Congregation[]) => void;
  setActiveCongregation: (id: string | null) => void;
  addCongregation: (congregation: Congregation) => void;
  updateCongregation: (congregation: Congregation) => void;
  deleteCongregation: (id: string) => void;
}

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
