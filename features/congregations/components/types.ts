import { Congregation, BaseFormProps } from "@/types";

export interface EditCongregationFormProps extends BaseFormProps {
  item: Congregation;
}
export type CreateCongregationFormProps = BaseFormProps;

export interface CongregationInfoCardProps {
  name: string;
  country?: string | null;
}

export interface CongregationCardProps {
  item: Congregation;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export interface WarehouseItem {
  title: string;
  category: string;
  language?: string;
  status: "ORDERED" | "EXPECTED";
  quantity: number;
  type: "SPECIAL" | "REGULAR";
}
