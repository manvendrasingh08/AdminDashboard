
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DashboardOverview } from "@/components/DashboardOverview";
import { TablesPage } from "@/components/TablesPage";
import { ChartsPage } from "@/components/ChartsPage";
import { CalendarPage } from "@/components/CalendarPage";
import { KanbanPage } from "@/components/KanbanPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/tables" element={<TablesPage />} />
              <Route path="/charts" element={<ChartsPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/kanban" element={<KanbanPage />} />
              <Route path="/settings" element={<div className="text-center py-12"><h2 className="text-2xl font-bold">Settings Page</h2><p className="text-muted-foreground mt-2">Settings functionality coming soon!</p></div>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DashboardLayout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
