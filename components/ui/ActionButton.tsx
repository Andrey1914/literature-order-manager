interface ActionButtonProps {
  onClick?: () => void;
  label: string;
  icon?: React.ReactNode;
}

export const ActionButton = ({ onClick, label, icon }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-sm bg-indigo-600 px-6 py-4 font-semibold text-white shadow-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {icon && <span className="h-6 w-6">{icon}</span>}
      <span className="text-lg">{label}</span>
    </button>
  );
};
