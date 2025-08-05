import { PageWrapper } from "@pages";
import { Link, useLocation } from "react-router-dom";

export interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex">
      <div className="relative w-[250px] bg-gray-100 p-4 h-screen">
        {/* Current URL Display */}
        <div className="mb-4 p-2 bg-white rounded border">
          <p className="text-xs text-gray-500">Current URL:</p>
          <p className="text-sm font-mono text-gray-700 break-all">
            {location.pathname}
            {location.search && (
              <span className="text-blue-600">{location.search}</span>
            )}
          </p>
        </div>

        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className={`block p-2 rounded transition-colors ${
                isActive("/dashboard")
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className={`block p-2 rounded transition-colors ${
                location.pathname.startsWith("/products")
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Products
            </Link>
          </li>
        </ul>
      </div>

      <div className="w-[calc(100%-250px)]">
        <PageWrapper>{children}</PageWrapper>
      </div>
    </div>
  );
}
