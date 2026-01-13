import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";

import Login from "@/pages/Login";
import UserLayout from "./components/user/UserLayout";
import UserDashboard from "@/pages/user/Dashboard";
import Tiers from "@/pages/user/Tiers";
import Rewards from "@/pages/user/Rewards";
import Profile from "@/pages/user/Profile";
import Leaderboard from "@/pages/user/Leaderboard";
import ReferFriend from "@/pages/user/ReferFriend";
import Wallet from "@/pages/user/Wallet";

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
        <Route element={<UserLayout />}>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/tiers" element={<Tiers />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/refer" element={<ReferFriend />} />
          <Route path="/wallet" element={<Wallet />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminProtectedRoute />}>
        <Route index element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={user ? <Navigate to="/" /> : <Navigate to="/login" />} />
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