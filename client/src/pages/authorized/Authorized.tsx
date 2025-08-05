import { useAuth } from "@providers/Auth";
import { Navigate } from "react-router-dom";

export interface AuthorizedProps {
  children: React.ReactNode;
}

export function Authorized({ children }: AuthorizedProps) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
