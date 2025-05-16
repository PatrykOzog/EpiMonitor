import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedLayout } from "./routes/ProtectedLayout";
import { SurveyPage } from "./pages/SurveyPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ContactPage } from "./pages/ContactPage";
import "./App.css";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/survey" element={<SurveyPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};
