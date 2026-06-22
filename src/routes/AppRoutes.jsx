import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage   from "../pages/LandingPage";
import LoginPage     from "../pages/LoginPage";
import Dashboard     from "../pages/Dashboard";
import Portfolio     from "../pages/Portfolio";
import Orders        from "../pages/Orders";
import StockDetail   from "../pages/StockDetail";
import Settings      from "../pages/Settings";
import ContactPage   from "../pages/ContactPage";
import NotFoundPage  from "../pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"              element={<LandingPage />} />
      <Route path="/login"         element={<LoginPage />} />
      <Route path="/dashboard"     element={<Dashboard />} />
      <Route path="/portfolio"     element={<Portfolio />} />
      <Route path="/orders"        element={<Orders />} />
      <Route path="/stock/:symbol" element={<StockDetail />} />
      <Route path="/settings"      element={<Settings />} />
      <Route path="/contact"       element={<ContactPage />} />
      <Route path="/404"           element={<NotFoundPage />} />
      <Route path="*"              element={<Navigate to="/404" />} />
    </Routes>
  );
}