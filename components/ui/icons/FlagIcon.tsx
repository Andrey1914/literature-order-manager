import { IconProps } from "./types";

export const UkraineFlagIcon = ({ className = "h-5 w-5" }: IconProps) => {
  return (
    <svg className={className} viewBox="0 0 640 480">
      <g fillRule="evenodd" strokeWidth="1pt">
        <path fill="#0057b7" d="M0 0h640v240H0z" />
        <path fill="#ffd700" d="M0 240h640v240H0z" />
      </g>
    </svg>
  );
};

export const RussiaFlagIcon = ({ className = "h-5 w-5" }: IconProps) => {
  return (
    <svg className={className} viewBox="0 0 640 480">
      <g fillRule="evenodd" strokeWidth="1pt">
        <path fill="#fff" d="M0 0h640v160H0z" />
        <path fill="#0039a6" d="M0 160h640v160H0z" />
        <path fill="#d52b1e" d="M0 320h640v160H0z" />
      </g>
    </svg>
  );
};

export const MacedoniaFlagIcon = ({ className = "h-5 w-5" }: IconProps) => {
  return (
    <svg className={className} viewBox="0 0 640 480">
      <path fill="#d20000" d="M0 0h640v480H0z" />
      <path
        fill="#fff100"
        d="M272 0h96v480h-96zM0 204h640v72H0zM0 0l640 480H531L0 82zm531 0L0 398v82l640-480zM0 480l640-480h-109L0 398zm109 0L640 82V0L0 480z"
      />
      <circle
        cx="320"
        cy="240"
        r="60"
        fill="#fff100"
        stroke="#d20000"
        strokeWidth="12"
      />
      <path fill="#fff100" d="M320 156l36 84h-72z" />
    </svg>
  );
};

export const UkFlagIcon = ({ className = "h-5 w-5" }: IconProps) => {
  return (
    <svg className={className} viewBox="0 0 640 480">
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path fill="#fff" d="M0 0l640 480h-60L0 45zm640 0L0 480h60l580-435z" />
      <path fill="#C8102E" d="M0 0l640 480h-35L0 26zm640 0L0 480h35l580-435z" />
      <path fill="#fff" d="M240 0h160v480H240zM0 160h640v160H0z" />
      <path fill="#C8102E" d="M272 0h96v480h-96zM0 192h640v96H0z" />
    </svg>
  );
};
