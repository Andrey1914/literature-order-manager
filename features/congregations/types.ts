import { Congregation } from "@/types";

export interface CongregationState {
  congregations: Congregation[];
  activeCongregationId: string | null;
  setCongregations: (congregations: Congregation[]) => void;
  setActiveCongregation: (id: string | null) => void;
  addCongregation: (congregation: Congregation) => void;
  updateCongregation: (congregation: Congregation) => void;
  deleteCongregation: (id: string) => void;
}
