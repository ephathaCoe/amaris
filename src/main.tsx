import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { TooltipProvider } from "./components/ui/tooltip";

import { ThemeProvider } from "./components/layout/theme-provider";
import { AdminAuthProvider } from "./lib/admin-auth";
import "./index.css";
import Index from "./pages";
import ProductsPage from "./pages/products";
import ProductDetailPage from "./pages/product-detail";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import QuoteRequestPage from "./pages/quote-request";
import AdminPage from "./pages/admin";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AdminAuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/quote-request" element={<QuoteRequestPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </BrowserRouter>
          <Sonner />
          <Toaster />
        </AdminAuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);