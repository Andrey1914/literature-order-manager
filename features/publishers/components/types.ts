import { Publisher, BaseFormProps } from "@/types";

export interface CreatePublisherFormProps extends BaseFormProps {
  congregationId: string;
}

export interface EditPublisherFormProps extends BaseFormProps {
  publisher: Publisher;
}

export interface PublisherCardProps {
  publisher: Publisher;
}

export interface PublisherStatusCardProps {
  totalOrders?: number;
  needsDelivery?: boolean;
}
