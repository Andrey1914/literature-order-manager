import { IconProps } from "../types";

export const StarsIcon = ({ className = "" }: IconProps) => {
  return (
    <svg className={className} viewBox="0 0 64 32" fill="currentColor">
      {/* first star */}
      <path
        d="M14 4 C14 8.5, 12.5 10, 8 10 C12.5 10, 14 11.5, 14 16 C14 11.5, 15.5 10, 20 10 C15.5 10, 14 8.5, 14 4 Z"
        fill="#fff"
        opacity="0.95"
      />

      {/* second star */}
      <path
        d="M27 8 C27 11, 26 12, 23 12 C26 12, 27 13, 27 16 C27 13, 28 12, 31 12 C28 12, 27 11, 27 8 Z"
        fill="#fff"
        opacity="0.85"
      />

      {/* third star */}
      <path
        d="M20 18 C20 20, 19.3 20.7, 17.5 20.7 C19.3 20.7, 20 21.4, 20 23.4 C20 21.4, 20.7 20.7, 22.5 20.7 C20.7 20.7, 20 20, 20 18 Z"
        fill="#fff"
        opacity="0.75"
      />
    </svg>
  );
};
