
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
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/routes" element={<RoutesList />} />
          <Route path="/stations" element={<Stations />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/passengers" element={<BookingPassengers />} />
          <Route path="/booking/confirmation" element={<BookingConfirmation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
