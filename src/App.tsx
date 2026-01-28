import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogHub from "./pages/BlogHub";
import BlogCaseStudy from "./pages/BlogCaseStudy";
import ActiveHarmonicFilters from "./pages/ActiveHarmonicFilters";
import UPSMaintenance from "./pages/UPSMaintenance";
import InfraredThermography from "./pages/InfraredThermography";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<BlogHub />} />
          <Route path="/blog/power-factor-harmonics" element={<BlogCaseStudy />} />
          <Route path="/blog/active-harmonic-filters" element={<ActiveHarmonicFilters />} />
          <Route path="/blog/ups-preventive-maintenance" element={<UPSMaintenance />} />
          <Route path="/blog/infrared-thermography" element={<InfraredThermography />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
