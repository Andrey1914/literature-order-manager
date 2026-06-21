import { create } from "zustand";

export interface Publisher {
  id: string;
  name: string;
  lastName?: string | null;
  congregationId: string;
}

interface PublisherState {
  publishers: Publisher[];
  isLoading: boolean;
  activePublisherId: string | null;
  setPublishers: (publishers: Publisher[]) => void;
  addPublisher: (publisher: Publisher) => void;
  updatePublisherState: (id: string, updatedFields: Partial<Publisher>) => void;
  removePublisher: (id: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setActivePublisher: (id: string | null) => void;
}

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
