import { useAuth } from "@providers/Auth";
import { Navigate } from "react-router-dom";

export function NotAuthorized({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (user) return <Navigate to="/dashboard" replace />;

  return children;
}
