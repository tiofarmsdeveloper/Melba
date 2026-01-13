import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";

import Login from "@/pages/Login";
import UserDashboard from "@/pages/user/Dashboard";
import AdminDashboard from "@/pages/admin/Dashboard";
import UserProtectedRoute from "@/components/UserProtectedRoute";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* User Routes */}
      <Route element={<UserProtectedRoute />}>
        <Route path="/" element={<UserDashboard />} />
        {/* Add other user routes here */}
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminProtectedRoute />}>
        <Route index element={<AdminDashboard />} />
        {/* Add other admin routes here */}
      </Route>

      <Route path="*" element={user ? <NotFound /> : <Navigate to="/login" />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;