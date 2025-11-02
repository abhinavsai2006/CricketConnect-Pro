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
      // Only handle click outside on desktop (md and up)
      if (window.innerWidth >= 768 && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll on mobile when notification is open
      if (window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
      }
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
        className="relative p-2 text-gray-600 hover:text-cricket-green-700 hover:bg-cricket-green-50 rounded-lg transition-all duration-200 touch-manipulation"
        aria-label="Open notifications"
      >
        <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Mobile Overlay */}
          <div 
            className="md:hidden fixed inset-0 bg-black/60 z-[999]" 
            onClick={() => setIsOpen(false)}
            style={{ touchAction: 'none' }}
          />
          
          {/* Dropdown Panel */}
          <div className="fixed md:absolute left-0 right-0 md:right-0 top-0 md:top-auto md:left-auto md:mt-2 w-full md:w-96 h-full md:h-auto md:max-h-[600px] bg-white md:rounded-xl shadow-2xl border-0 md:border border-gray-200 z-[1000] overflow-hidden animate-in fade-in slide-in-from-top-5 md:slide-in-from-top-2 duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 p-4 sm:p-6 sticky top-0 z-10 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-white text-xl sm:text-2xl">Notifications</h3>
                <p className="text-white/90 text-sm sm:text-base mt-1">{unreadCount} unread</p>
              </div>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-white hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hidden md:flex items-center space-x-1"
                  >
                    <Check className="w-4 h-4" />
                    <span>Mark all read</span>
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="p-2 sm:p-3 text-white hover:bg-white/20 rounded-lg transition-all duration-200 touch-manipulation"
                  aria-label="Close notifications"
                >
                  <X className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="h-[calc(100vh-160px)] sm:h-[calc(100vh-180px)] md:max-h-96 overflow-y-auto overscroll-contain bg-gray-50">
            {notifications.length === 0 ? (
              <div className="p-12 sm:p-16 text-center">
                <Bell className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 font-semibold text-lg">No notifications</p>
                <p className="text-gray-500 text-sm mt-2">You're all caught up!</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 sm:p-5 border-b border-gray-200 hover:bg-white transition-all duration-200 cursor-pointer active:bg-gray-100 ${
                    !notification.isRead ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    {/* Icon */}
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 ${getIconBg(notification.type)} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      {getIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 flex items-center">
                            {notification.title}
                            {!notification.isRead && (
                              <span className="ml-2 w-2 h-2 bg-cricket-green-500 rounded-full flex-shrink-0 animate-pulse"></span>
                            )}
                          </h4>
                          <p className="text-gray-600 text-sm sm:text-base mb-2 line-clamp-2">{notification.message}</p>
                          <p className="text-gray-500 text-xs sm:text-sm">{notification.time}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-1 flex-shrink-0">
                          {!notification.isRead && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                              className="p-2 text-gray-400 hover:text-cricket-green-600 hover:bg-cricket-green-100 rounded-lg transition-all duration-200 touch-manipulation"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 touch-manipulation"
                            title="Remove"
                          >
                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
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
            <div className="p-4 bg-white border-t border-gray-200 sticky bottom-0 shadow-lg">
              <button className="w-full text-center text-cricket-green-600 hover:text-cricket-green-700 font-semibold text-sm sm:text-base py-3 hover:bg-cricket-green-50 rounded-lg transition-all duration-200 touch-manipulation">
                View All Notifications
              </button>
            </div>
          )}
          </div>
        </>
      )}
    </div>
  );
}
