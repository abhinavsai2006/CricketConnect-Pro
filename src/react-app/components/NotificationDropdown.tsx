import { useState, useEffect, useRef } from "react";
import { Bell, Check, X, Trophy, Users, Calendar, MessageCircle, MapPin } from "lucide-react";

interface Notification {
  id: number;
  type: "team_invite" | "booking_confirmed" | "match_reminder" | "new_message" | "player_joined";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  icon?: string;
}

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "team_invite",
      title: "Team Invitation",
      message: "Thunder Bolts invited you to join their team",
      time: "2 minutes ago",
      isRead: false,
    },
    {
      id: 2,
      type: "booking_confirmed",
      title: "Booking Confirmed",
      message: "Your ground booking for Central Ground on Nov 5 is confirmed",
      time: "1 hour ago",
      isRead: false,
    },
    {
      id: 3,
      type: "match_reminder",
      title: "Match Tomorrow",
      message: "Don't forget! Match vs Lightning Stars at 10:00 AM",
      time: "3 hours ago",
      isRead: false,
    },
    {
      id: 4,
      type: "new_message",
      title: "New Message",
      message: "John sent you a message in Thunder Bolts chat",
      time: "5 hours ago",
      isRead: true,
    },
    {
      id: 5,
      type: "player_joined",
      title: "New Team Member",
      message: "Sarah joined your team Thunder Bolts",
      time: "1 day ago",
      isRead: true,
    },
  ]);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "team_invite":
        return <Users className="w-5 h-5 text-cricket-blue-600" />;
      case "booking_confirmed":
        return <MapPin className="w-5 h-5 text-cricket-green-600" />;
      case "match_reminder":
        return <Calendar className="w-5 h-5 text-orange-600" />;
      case "new_message":
        return <MessageCircle className="w-5 h-5 text-purple-600" />;
      case "player_joined":
        return <Trophy className="w-5 h-5 text-yellow-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "team_invite":
        return "bg-cricket-blue-100";
      case "booking_confirmed":
        return "bg-cricket-green-100";
      case "match_reminder":
        return "bg-orange-100";
      case "new_message":
        return "bg-purple-100";
      case "player_joined":
        return "bg-yellow-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-cricket-green-700 hover:bg-cricket-green-50 rounded-lg transition-all duration-200"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-lg">Notifications</h3>
                <p className="text-white/80 text-sm">{unreadCount} unread</p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-white hover:bg-white/20 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                >
                  <Check className="w-4 h-4" />
                  <span>Mark all read</span>
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No notifications</p>
                <p className="text-gray-400 text-sm">You're all caught up!</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 ${
                    !notification.isRead ? "bg-cricket-green-50/30" : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Icon */}
                    <div className={`w-10 h-10 ${getIconBg(notification.type)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      {getIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm mb-1">
                            {notification.title}
                            {!notification.isRead && (
                              <span className="ml-2 w-2 h-2 bg-cricket-green-500 rounded-full inline-block"></span>
                            )}
                          </h4>
                          <p className="text-gray-600 text-sm mb-1">{notification.message}</p>
                          <p className="text-gray-400 text-xs">{notification.time}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-gray-400 hover:text-cricket-green-600 hover:bg-cricket-green-100 rounded transition-all duration-200"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded transition-all duration-200"
                            title="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <button className="w-full text-center text-cricket-green-600 hover:text-cricket-green-700 font-medium text-sm py-2 hover:bg-white rounded-lg transition-all duration-200">
                View All Notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
