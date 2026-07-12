import { ButtonHTMLAttributes } from "react";
import { Spinner } from "@/components/ui/Spinner";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "icon";
  size?: "sm" | "md" | "lg" | "none";
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60";

  const sizes = {
    sm: "rounded-lg px-3 py-1.5 text-xs",
    md: "rounded-xl px-4 py-2.5 text-sm shadow-sm",
    lg: "rounded-xl px-6 py-3 text-base shadow-sm",
    none: "",
  };

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600",
    secondary:
      "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:focus:ring-slate-700",
    icon: "rounded-lg border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 p-2 focus:ring-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:ring-slate-700",
  };

  return (
    <button
      type={props.type || "button"}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Spinner className="h-5 w-5 text-current shrink-0" />
      ) : (
        children
      )}
    </button>
  );
};
