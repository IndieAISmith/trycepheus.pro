import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/utils/ScrollToTop";
import Index from "./pages/Index";
import Docs from "./pages/Docs";
import Cookbook from "./pages/Cookbook";
import HallucinationGuardrails from "./pages/cookbook/HallucinationGuardrails";
import RateLimits from "./pages/cookbook/RateLimits";

import Models from "./pages/Models";
import Playground from "./pages/Playground";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/cookbook" element={<Cookbook />} />
          <Route path="/cookbook/hallucination-guardrails" element={<HallucinationGuardrails />} />
          <Route path="/cookbook/rate-limits" element={<RateLimits />} />
          <Route path="/models" element={<Models />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
