import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Schedules from "./pages/Schedules";
import RoutesList from "./pages/Routes";
import Stations from "./pages/Stations";
import Booking from "./pages/Booking";
import BookingPassengers from "./pages/BookingPassengers";
import BookingConfirmation from "./pages/BookingConfirmation";
import TicketAvailability from "./pages/TicketAvailability";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useTrainCursor } from "@/hooks/useTrainCursor";


const queryClient = new QueryClient();

// ✅ Main App component
const App = () => {
  // 🧭 Activate the train cursor globally
  useTrainCursor();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          {/* Global Notifications */}
          <Toaster />
          <Sonner />

          {/* Gradient Background Wrapper */}
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/schedules" element={<Schedules />} />
              <Route path="/routes" element={<RoutesList />} />
              <Route path="/stations" element={<Stations />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/booking/passengers" element={<BookingPassengers />} />
              <Route path="/booking/confirmation" element={<BookingConfirmation />} />
              <Route path="/ticket-availability" element={<TicketAvailability />} />
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
