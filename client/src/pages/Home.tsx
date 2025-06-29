import { Link, Outlet, useLocation } from "react-router-dom";

export function Home() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to Product Manager
        </h1>
        <p className="text-xl text-gray-600">
          Manage your products and upload files with ease
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-4xl mx-auto">
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <Link
              to="dashboard"
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                isActive("/home/dashboard")
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="overview"
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                isActive("/home/overview")
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview
            </Link>
            <Link
              to="stats"
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                isActive("/home/stats")
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Statistics
            </Link>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
