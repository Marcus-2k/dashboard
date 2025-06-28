export interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      className="bg-neutral-100 text-neutral-900 hover:bg-neutral-300 cursor-pointer transition-all p-2 rounded-md"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
