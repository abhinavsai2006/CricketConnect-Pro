import { Link } from "react-router";
import { X, Home, Users, Calendar, MapPin, Trophy, BarChart3, MessageCircle, LogOut, ChevronRight } from "lucide-react";
import { useAuth } from "@getmocha/users-service/react";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    sessionStorage.removeItem('showDashboard');
    localStorage.removeItem('user');
    await logout();
    onClose();
    window.location.href = '/';
  };

  const menuItems = [
    { path: "/", label: "Dashboard", icon: Home, gradient: "from-green-500 to-green-600" },
    { path: "/feed", label: "Activity Feed", icon: Trophy, gradient: "from-blue-500 to-blue-600" },
    { path: "/players", label: "Find Players", icon: Users, gradient: "from-purple-500 to-purple-600" },
    { path: "/teams", label: "My Teams", icon: Calendar, gradient: "from-orange-500 to-orange-600" },
    { path: "/grounds", label: "Book Grounds", icon: MapPin, gradient: "from-red-500 to-red-600" },
    { path: "/tournaments", label: "Tournaments", icon: Trophy, gradient: "from-yellow-500 to-yellow-600" },
    { path: "/statistics", label: "Statistics", icon: BarChart3, gradient: "from-cyan-500 to-cyan-600" },
    { path: "/chat", label: "Messages", icon: MessageCircle, gradient: "from-pink-500 to-pink-600" },
  ];

  // Get user data from localStorage or use demo data
  const userData = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user')!) 
    : { name: user?.email?.split('@')[0] || 'Demo User', email: user?.email || 'demo@example.com' };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`md:hidden fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header with Profile */}
          <div className="bg-gradient-to-br from-cricket-green-600 to-cricket-blue-600 p-6 pb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-cricket-green-600 shadow-lg">
                  {userData.name?.charAt(0).toUpperCase() || 'D'}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg leading-tight">{userData.name || 'Demo User'}</h3>
                  <p className="text-white/80 text-sm">{userData.email || 'demo@example.com'}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white p-2 -mr-2 -mt-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <Link
              to="/profile"
              onClick={onClose}
              className="flex items-center justify-between bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl px-4 py-3 text-white transition-all duration-200"
            >
              <span className="font-medium">View Profile</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-3 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className="flex items-center space-x-4 px-4 py-3.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 group"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer with Logout */}
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-600 transition-all duration-200 font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>

            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">CricketConnect Pro v1.0</p>
              <p className="text-xs text-gray-400">© 2025 All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
