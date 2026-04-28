import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import PublicHomePage from "./pages/PublicHomePage.jsx";
import AdminContentPage from "./pages/admin/AdminContentPage.jsx";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.jsx";
import AdminLoginPage from "./pages/admin/AdminLoginPage.jsx";
import AdminMediaPage from "./pages/admin/AdminMediaPage.jsx";
import AdminNotFoundPage from "./pages/admin/AdminNotFoundPage.jsx";
import AdminProjectsPage from "./pages/admin/AdminProjectsPage.jsx";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage.jsx";
import AdminThemePage from "./pages/admin/AdminThemePage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicHomePage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="media" element={<AdminMediaPage />} />
          <Route path="content" element={<AdminContentPage />} />
          <Route path="theme" element={<AdminThemePage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<AdminNotFoundPage />} />
    </Routes>
  );
}
