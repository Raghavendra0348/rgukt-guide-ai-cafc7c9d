import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index-New";
import Chat from "./pages/Chat";
import Complaints from "./pages/Complaints";
import Admin from "./pages/Admin";
import StudentAuth from "./pages/StudentAuth";
import AdminAuth from "./pages/AdminAuth";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/student-auth" element={<StudentAuth />} />
            <Route path="/admin-auth" element={<AdminAuth />} />
            <Route path="/about" element={<AboutUs />} />

            {/* Protected routes - auth check happens inside component */}
            <Route path="/chat" element={<Chat />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Redirect all unknown routes to home */}
            <Route path="*" element={<Index />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
