import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router";
import { AuthProvider } from "@getmocha/users-service/react";
import { useEffect } from "react";
import HomePage from "./pages/Home";
import AuthCallbackPage from "./pages/AuthCallback";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import PlayersPage from "./pages/Players";
import ProfilePage from "./pages/Profile";
import TeamsPage from "./pages/Teams";
import ChatPage from "./pages/Chat";
import GroundsPage from "./pages/Grounds";
import StatisticsPage from "./pages/Statistics";
import TournamentsPage from "./pages/Tournaments";
import FeedPage from "./pages/Feed";
import SettingsPage from "./pages/Settings";
import Layout from "@/react-app/components/Layout";
import { ThemeProvider } from "@/react-app/contexts/ThemeContext";
import OnboardingFlow from "@/react-app/components/OnboardingFlow";

// Scroll to top component
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <OnboardingFlow />
          <Routes>
            {/* Auth routes without Layout */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Main routes with Layout */}
            <Route path="*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/auth/callback" element={<AuthCallbackPage />} />
                  <Route path="/players" element={<PlayersPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/teams" element={<TeamsPage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/grounds" element={<GroundsPage />} />
                  <Route path="/statistics" element={<StatisticsPage />} />
                  <Route path="/tournaments" element={<TournamentsPage />} />
                  <Route path="/feed" element={<FeedPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
