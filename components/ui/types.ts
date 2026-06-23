import {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";
import Link from "next/link";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "icon";
  isLoading?: boolean;
}

export interface ActionButtonProps {
  onClick?: () => void;
  label: string;
  icon?: ReactNode;
}

export interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: "primary" | "secondary";
}

export interface CardActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export interface ModalProps extends BaseModalProps {
  children: ReactNode;
}

export interface ConfirmModalProps extends BaseModalProps {
  onConfirm: () => void;
  message: string;
  isLoading?: boolean;
}
