export interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message = "No data" }: EmptyStateProps) {
  return <div className="text-gray-500">{message}</div>;
}
