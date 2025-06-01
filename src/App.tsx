import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./services/AuthContext";
import ProtectedRoute from "./services/ProtectedRoute";
import Header from "./components/Header";
import Index from "./pages/Index";
import About from "./pages/About";
import Programmes from "./pages/Programmes";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Contact from "./pages/Contact";
import LeadershipApplication from "./pages/LeadershipApplication";
import TechApplication from "./pages/TechApplication";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from './pages/PaymentFailed';
import NotFound from "./pages/NotFound";
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
       <AuthProvider>
      <BrowserRouter>
      <ScrollToTop />
        <div className="min-h-screen bg-white">
          <Header />
          <main className="pt-16 sm:pt-20">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/programmes" element={<Programmes />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/apply/leadership" element={<LeadershipApplication />} />
              <Route path="/apply/tech" element={<TechApplication />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-failed" element={<PaymentFailed />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} /> 
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
