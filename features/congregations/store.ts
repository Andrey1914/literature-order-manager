import { create } from "zustand";
import { Congregation } from "./types";

interface CongregationState {
  congregations: Congregation[];
  activeCongregationId: string | null;

  setCongregations: (congregations: Congregation[]) => void;
  setActiveCongregation: (id: string | null) => void;
  addCongregation: (congregation: Congregation) => void;
}

export const useCongregationStore = create<CongregationState>((set) => ({
  congregations: [],
  activeCongregationId: null,

  setCongregations: (congregations) => set({ congregations }),
  setActiveCongregation: (id) => set({ activeCongregationId: id }),
  addCongregation: (congregation) =>
    set((state) => ({
      congregations: [...state.congregations, congregation],
      activeCongregationId: congregation.id,
    })),
}));
