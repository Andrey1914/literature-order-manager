import Link from "next/link";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export const ButtonLink = ({
  href,
  children,
  variant = "primary",
}: ButtonLinkProps) => {
  const baseStyles =
    "w-full sm:w-auto rounded-xl px-6 py-3 font-medium shadow transition-colors text-center";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  };

  return (
    <Link href={href} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </Link>
  );
};
