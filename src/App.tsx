import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { HomePage } from "@/pages/HomePage";
import { CategoryPage } from "@/pages/CategoryPage";
import { QuizPage } from "@/pages/QuizPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { ProgressPage } from "@/pages/ProgressPage";
import { SupportPage } from "@/pages/SupportPage";
import { AuthPage } from "@/pages/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/quiz/:quizId" element={<QuizPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
