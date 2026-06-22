import { Session } from "next-auth";
import { Congregation } from "@/types";

export interface DashboardViewProps {
  initialCongregations: Congregation[];
}

export interface HomeViewProps {
  session: Session | null;
}
