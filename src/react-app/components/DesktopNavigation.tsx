import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "@getmocha/users-service/react";
import { Users, Calendar, MapPin, User, LogOut, Trophy, BarChart3, Award, Activity, Settings, ChevronDown } from "lucide-react";
import { useState } from "react";
import NotificationDropdown from "@/react-app/components/NotificationDropdown";
import ThemeToggle from "@/react-app/components/ThemeToggle";

export default function DesktopNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleLogout = async () => {
    // Clear the dashboard flag so landing page shows on next visit
    sessionStorage.removeItem('showDashboard');
    // Clear the fake user data from localStorage
    localStorage.removeItem('user');
    await logout();
    // Navigate to home page and reload to show landing page
    navigate('/');
    window.location.reload();
  };

  // Primary navigation items - most used
  const primaryNavItems = [
    { path: "/", label: "Dashboard", icon: Trophy },
    { path: "/feed", label: "Feed", icon: Activity },
    { path: "/players", label: "Players", icon: Users },
    { path: "/teams", label: "Teams", icon: Calendar },
    { path: "/grounds", label: "Grounds", icon: MapPin },
  ];
  
  // Secondary navigation items - in dropdown
  const secondaryNavItems = [
    { path: "/tournaments", label: "Tournaments", icon: Award },
    { path: "/statistics", label: "Statistics", icon: BarChart3 },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="hidden md:block bg-white shadow-sm border-b border-cricket-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 cricket-gradient rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl bg-gradient-to-r from-cricket-green-700 to-cricket-blue-700 bg-clip-text text-transparent">
                CricketConnect Pro
              </span>
            </Link>

            <nav className="flex items-center space-x-1">
              {primaryNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-cricket-green-100 text-cricket-green-800"
                        : "text-gray-600 hover:text-cricket-green-700 hover:bg-cricket-green-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* More Menu Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-lg font-medium text-sm text-gray-600 hover:text-cricket-green-700 hover:bg-cricket-green-50 transition-all duration-200"
                >
                  <span>More</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showMoreMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowMoreMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                      {secondaryNavItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setShowMoreMenu(false)}
                            className={`flex items-center space-x-2 px-4 py-2 text-sm transition-colors ${
                              isActive(item.path)
                                ? "bg-cricket-green-50 text-cricket-green-800"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Notifications */}
            <NotificationDropdown />
            
            {/* Profile Link */}
            <Link
              to="/profile"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive("/profile")
                  ? "bg-cricket-green-100 text-cricket-green-800"
                  : "text-gray-600 hover:bg-cricket-green-50"
              }`}
            >
              {user?.google_user_data?.picture ? (
                <img
                  src={user.google_user_data.picture}
                  alt="Profile"
                  className="w-7 h-7 rounded-full border-2 border-cricket-green-200"
                />
              ) : (
                <User className="w-5 h-5" />
              )}
              <span className="text-sm font-medium hidden lg:block">
                {user?.google_user_data?.given_name || 'Profile'}
              </span>
            </Link>
            
            {/* Settings Link */}
            <Link
              to="/settings"
              className={`p-2 rounded-lg transition-all duration-200 ${
                isActive("/settings")
                  ? "bg-cricket-green-100 text-cricket-green-800"
                  : "text-gray-600 hover:bg-cricket-green-50"
              }`}
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </Link>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden lg:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
