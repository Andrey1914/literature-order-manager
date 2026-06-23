import { Session } from "next-auth";

export interface WithSessionProps {
  session: Session | null;
}

export interface Congregation {
  id: string;
  name: string;
  userId: string;
  country?: string;
}

export interface Publisher {
  id: string;
  name: string;
  lastName?: string | null;
  congregationId: string;
}

export interface BaseFormProps {
  onSuccess: () => void;
}
