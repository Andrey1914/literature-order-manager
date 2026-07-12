import { IconProps } from "../types";

export const SunIcon = ({ className = "" }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <g className="fill-amber-400 text-amber-400 stroke-amber-500 stroke-2">
        <circle cx="12" cy="12" r="5" className="fill-amber-400" />
        <path
          d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
