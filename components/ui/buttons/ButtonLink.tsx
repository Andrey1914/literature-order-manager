import Link from "next/link";
import { ButtonLinkProps } from "../types";

export const ButtonLink = ({
  href,
  children,
  variant = "primary",
}: ButtonLinkProps) => {
  const baseStyles =
    "w-full sm:w-auto rounded-xl px-6 py-3 font-medium shadow transition-colors text-center";
  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600",
    secondary:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
  };

  return (
    <Link href={href} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </Link>
  );
};
