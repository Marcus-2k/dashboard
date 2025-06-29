import { Link } from "react-router-dom";

export function DashboardTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">
          Quick Actions
        </h3>
        <div className="space-y-3">
          <Link
            to="/products"
            className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors"
          >
            Manage Products
          </Link>
          <Link
            to="/products/new"
            className="block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition-colors"
          >
            Upload Files
          </Link>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-green-900 mb-2">
          Recent Activity
        </h3>
        <p className="text-green-700">No recent activity to display.</p>
      </div>
    </div>
  );
}

export function OverviewTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">System Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">0</div>
          <div className="text-gray-600">Total Products</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">0</div>
          <div className="text-gray-600">Uploaded Files</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">0</div>
          <div className="text-gray-600">Categories</div>
        </div>
      </div>
    </div>
  );
}

export function StatsTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistics</h2>
      <p className="text-gray-600">
        Statistics and analytics will be displayed here.
      </p>
    </div>
  );
}
