import { Locale } from "@/i18n/config";
import {
  UkraineFlagIcon,
  RussiaFlagIcon,
  MacedoniaFlagIcon,
  UkFlagIcon,
} from "@/components/ui/icons";

export const flagIcons: Record<
  Locale,
  React.ComponentType<{ className?: string }>
> = {
  ru: RussiaFlagIcon,
  en: UkFlagIcon,
  uk: UkraineFlagIcon,
  mk: MacedoniaFlagIcon,
};
