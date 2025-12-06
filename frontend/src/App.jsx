import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import AlumniDashboard from "./pages/AlumniDashboard";
import Connections from "./pages/Connections";
import Chat from "./pages/Chat";

export default function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const ProtectedRoute = ({ children }) => {
    if (!token) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Login />} />

      {/* Admin route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            {role === "admin" ? <AdminDashboard /> : <Navigate to="/" replace />}
          </ProtectedRoute>
        }
      />

      {/* Student route */}
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            {role === "student" ? <StudentDashboard /> : <Navigate to="/" replace />}
          </ProtectedRoute>
        }
      />

      {/* Alumni route */}
      <Route
        path="/alumni"
        element={
          <ProtectedRoute>
            {role === "alumni" ? <AlumniDashboard /> : <Navigate to="/" replace />}
          </ProtectedRoute>
        }
      />

      {/* Connections route */}
      <Route
        path="/connections"
        element={
          <ProtectedRoute>
            <Connections />
          </ProtectedRoute>
        }
      />

      {/* Chat route */}
      <Route
        path="/chat/:conversationId"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
