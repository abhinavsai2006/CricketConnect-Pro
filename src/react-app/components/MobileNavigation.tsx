import { Link, useLocation } from "react-router";
import { Users, Activity, Trophy, Settings, MapPin } from "lucide-react";

export default function MobileNavigation() {
  const location = useLocation();

  // Bottom nav - only 5 essential items
  const bottomNavItems = [
    { path: "/", label: "Home", icon: Trophy },
    { path: "/feed", label: "Feed", icon: Activity },
    { path: "/grounds", label: "Grounds", icon: MapPin },
    { path: "/teams", label: "Teams", icon: Users },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex justify-around items-center py-2 px-2 safe-area-inset-bottom">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 relative min-w-[60px] touch-manipulation ${
                active
                  ? "text-cricket-green-700 dark:text-cricket-green-400"
                  : "text-gray-500 hover:text-cricket-green-600 active:scale-95 dark:text-gray-400"
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${active ? "text-cricket-green-700 dark:text-cricket-green-400" : ""}`} />
              <span className={`text-xs font-medium ${active ? "text-cricket-green-700 dark:text-cricket-green-400" : ""}`}>
                {item.label}
              </span>
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-1 h-1 bg-cricket-green-600 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
