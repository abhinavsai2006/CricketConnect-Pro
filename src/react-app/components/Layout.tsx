import { useAuth } from "@getmocha/users-service/react";
import { useLocation } from "react-router";
import DesktopNavigation from "@/react-app/components/DesktopNavigation";
import MobileNavigation from "@/react-app/components/MobileNavigation";
import MobileSidebar from "@/react-app/components/MobileSidebar";
import LoadingSpinner from "@/react-app/components/LoadingSpinner";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, isPending } = useAuth();
  const location = useLocation();
  
  // Don't show navigation on auth callback page or home landing page
  const hideNavigation = location.pathname === '/auth/callback' || 
    (location.pathname === '/' && !sessionStorage.getItem('showDashboard'));

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cricket-green-50 to-cricket-blue-50">
        <div className="text-center fade-in">
          <LoadingSpinner size="lg" text="Loading CricketConnect Pro" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cricket-green-50 via-white to-cricket-blue-50">
      {!hideNavigation && user && (
        <>
          <DesktopNavigation />
          <MobileNavigation />
        </>
      )}
      
      <main className={!hideNavigation && user ? "pb-20 md:pb-0" : ""}>
        {children}
      </main>
    </div>
  );
}
