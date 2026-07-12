import { IconProps } from "../types";

export const CloudIcon = ({ className = "" }: IconProps) => {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M19.36 10.04A6 6 0 008 11a5 5 0 00-4 4.75c0 2.62 2.13 4.25 4.75 4.25h10.5c2.35 0 4.25-1.9 4.25-4.25 0-2.22-1.7-4.04-3.89-4.21z" />
    </svg>
  );
};
