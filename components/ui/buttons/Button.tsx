// "use client";

import { ButtonHTMLAttributes } from "react";
import { Spinner } from "@/components/ui/Spinner"; // Путь к вашему спиннеру

// Расширяем стандартные пропсы HTML-кнопки
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "icon";
  size?: "sm" | "md" | "lg" | "none"; // "none" идеален для кастомных иконок вроде меню
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
  // Базовые стили без жестких размеров и паддингов
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

  // Стили размеров (управляют паддингами и скруглениями)
  const sizes = {
    sm: "rounded-lg px-3 py-1.5 text-xs",
    md: "rounded-xl px-4 py-2.5 text-sm shadow-sm",
    lg: "rounded-xl px-6 py-3 text-base shadow-sm",
    none: "",
  };

  // Стили внешнего вида
  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary:
      "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-200",
    icon: "rounded-lg border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 p-2 focus:ring-gray-200",
  };

  return (
    <button
      type={props.type || "button"}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        // Спиннер автоматически подстраивается под цвет текста кнопки благодаря text-current
        <Spinner className="h-5 w-5 text-current shrink-0" />
      ) : (
        children
      )}
    </button>
  );
};

// // "use client";

// import { ButtonProps } from "../types";

// export const Button = ({
//   children,
//   variant = "primary",
//   isLoading = false,
//   className = "",
//   disabled,
//   ...props
// }: ButtonProps) => {
//   const baseStyles =
//     "rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed";

//   const variants = {
//     primary:
//       "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400",
//     secondary:
//       "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400",
//     icon: "rounded-xl p-2 text-gray-400 hover:bg-gray-50 border border-transparent hover:border-gray-100 shadow-none focus:ring-offset-0",
//   };

//   return (
//     <button
//       disabled={disabled || isLoading}
//       className={`${baseStyles} ${variants[variant]} ${className}`}
//       {...props}
//     >
//       {isLoading && variant !== "icon" ? "Загрузка..." : children}
//     </button>
//   );
// };
