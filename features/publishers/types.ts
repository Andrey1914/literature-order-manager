import { Publisher } from "@/types";

export interface PublisherState {
  publishers: Publisher[];
  isLoading: boolean;
  activePublisherId: string | null;
  setPublishers: (publishers: Publisher[]) => void;
  addPublisher: (publisher: Publisher) => void;
  refreshPublishers: (congregationId: string) => Promise<void>;
  updatePublisherState: (id: string, updatedFields: Partial<Publisher>) => void;
  removePublisher: (id: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setActivePublisher: (id: string | null) => void;
}
