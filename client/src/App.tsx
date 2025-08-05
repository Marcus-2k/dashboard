import { MainLayout } from "@features/main-layout";
import { DashboardPage, LoginPage, Products, UpsertProduct } from "@pages";
import { Authorized } from "@pages/authorized";
import { NotAuthorized } from "@pages/not-authorized";
import { AuthProvider } from "@providers";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public route, only for unauthenticated */}
          <Route
            path="/login"
            element={
              <NotAuthorized>
                <LoginPage />
              </NotAuthorized>
            }
          />

          {/* Protected routes, only for authenticated */}
          <Route
            path="/"
            element={
              <Authorized>
                <MainLayout />
              </Authorized>
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<Products />} />
            <Route path="products/new" element={<UpsertProduct />} />
            <Route path="products/update/:id" element={<UpsertProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
