interface GoogleIconProps {
  className?: string;
}

export const GoogleIcon = ({ className = "h-5 w-5" }: GoogleIconProps) => {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#EA4335"
        d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.107C18.422 2.114 15.518 1 12.24 1c-6.075 0-11 4.925-11 11s4.925 11 11 11c6.34 0 10.556-4.43 10.556-10.714 0-.724-.078-1.275-.173-1.611H12.24z"
      />
    </svg>
  );
};
