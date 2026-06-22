import { create } from "zustand";
import { PublisherState } from "./types";

export const usePublisherStore = create<PublisherState>((set) => ({
  publishers: [],
  isLoading: false,
  activePublisherId: null,
  setPublishers: (publishers) => set({ publishers, isLoading: false }),

  addPublisher: (publisher) =>
    set((state) => ({ publishers: [publisher, ...state.publishers] })),

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
