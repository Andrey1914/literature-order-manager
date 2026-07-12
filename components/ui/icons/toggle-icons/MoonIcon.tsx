import { IconProps } from "../types";

export const MoonIcon = ({ className = "" }: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} scale-x-[-1] origin-center`}
      fill="none"
    >
      <path
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
        className="fill-amber-300 text-amber-300 drop-shadow-[0_0_5px_rgba(252,211,77,0.6)]"
      />
    </svg>
  );
};
