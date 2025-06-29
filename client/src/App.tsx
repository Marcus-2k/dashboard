import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home, UpsertProduct } from "./pages";
import { DashboardTab, OverviewTab, StatsTab } from "./pages/HomeTabs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />}>
          <Route path="dashboard" index element={<DashboardTab />} />
          <Route path="overview" element={<OverviewTab />} />
          <Route path="stats" element={<StatsTab />} />
          <Route index element={<Navigate to="/home/dashboard" replace />} />
        </Route>

        <Route
          path="/products"
          element={<div>Products List - Coming Soon</div>}
        />

        <Route path="/products/new" element={<UpsertProduct />} />

        <Route path="/products/update/:id" element={<UpsertProduct />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
