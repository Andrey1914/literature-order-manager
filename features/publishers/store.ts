import { create } from "zustand";
import { PublisherState } from "./types";
import { getPublishersByCongregation } from "./actions";

export const usePublisherStore = create<PublisherState>((set) => ({
  publishers: [],
  isLoading: false,
  activePublisherId: null,
  setPublishers: (publishers) => set({ publishers, isLoading: false }),

  addPublisher: (publisher) =>
    set((state) => ({ publishers: [publisher, ...state.publishers] })),

  refreshPublishers: async (congregationId: string) => {
    set({ isLoading: true });
    const res = await getPublishersByCongregation(congregationId);
    if (res?.success && res.data) {
      set({ publishers: res.data, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },

  updatePublisherState: (id, updatedFields) =>
    set((state) => ({
      publishers: state.publishers.map((p) =>
        p.id === id ? { ...p, ...updatedFields } : p,
      ),
    })),

  removePublisher: (id) =>
    set((state) => ({
      publishers: state.publishers.filter((p) => p.id !== id),
    })),

  setIsLoading: (isLoading) => set({ isLoading }),
  setActivePublisher: (id) => set({ activePublisherId: id }),
}));
