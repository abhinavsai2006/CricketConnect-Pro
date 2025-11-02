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
          <div className="fixed md:absolute left-0 right-0 md:right-0 top-0 md:top-auto md:left-auto md:mt-2 w-full md:w-96 h-full md:h-auto md:max-h-[600px] bg-white md:rounded-xl shadow-2xl border-0 md:border border-gray-200 z-[1000] overflow-hidden animate-in fade-in slide-in-from-top-5 md:slide-in-from-top-2 duration-300 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 p-5 sm:p-6 flex-shrink-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <h3 className="font-bold text-white text-xl sm:text-2xl leading-tight">Notifications</h3>
                <p className="text-white text-sm sm:text-base mt-1.5 font-medium">{unreadCount} unread</p>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                {unreadCount > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAllAsRead();
                    }}
                    className="text-white bg-white/20 hover:bg-white/30 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 hidden md:flex items-center space-x-1 whitespace-nowrap touch-manipulation"
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
                  className="p-2.5 sm:p-3 text-white bg-white/10 hover:bg-white/30 rounded-lg transition-all duration-200 touch-manipulation flex-shrink-0"
                  aria-label="Close notifications"
                >
                  <X className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto overscroll-contain bg-gray-50 min-h-0">
            {notifications.length === 0 ? (
              <div className="p-12 sm:p-16 text-center flex flex-col items-center justify-center min-h-[300px]">
                <Bell className="w-20 h-20 sm:w-24 sm:h-24 text-gray-300 mx-auto mb-6" />
                <p className="text-gray-700 font-bold text-xl sm:text-2xl">No notifications</p>
                <p className="text-gray-500 text-base mt-3">You're all caught up!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-5 sm:p-6 hover:bg-white transition-all duration-200 cursor-pointer active:bg-gray-100 ${
                      !notification.isRead ? "bg-white" : "bg-gray-50/70"
                    }`}
                  >
                    <div className="flex items-start space-x-4 sm:space-x-5">
                      {/* Icon */}
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 ${getIconBg(notification.type)} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                        {getIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-1.5 flex items-center leading-tight">
                              {notification.title}
                              {!notification.isRead && (
                              <span className="ml-2.5 w-2.5 h-2.5 bg-cricket-green-500 rounded-full flex-shrink-0 animate-pulse"></span>
                            )}
                          </h4>
                          <p className="text-gray-700 text-sm sm:text-base mb-2.5 line-clamp-2 leading-relaxed">{notification.message}</p>
                          <p className="text-gray-500 text-xs sm:text-sm font-medium">{notification.time}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-1.5 flex-shrink-0">
                          {!notification.isRead && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                              className="p-2.5 text-gray-400 hover:text-cricket-green-600 hover:bg-cricket-green-100 rounded-lg transition-all duration-200 touch-manipulation"
                              title="Mark as read"
                            >
                              <Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 touch-manipulation"
                            title="Remove"
                          >
                            <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t-2 border-gray-200 flex-shrink-0 shadow-2xl">
              <button 
                onClick={() => {
                  // Handle view all notifications
                  console.log('View all notifications');
                }}
                className="w-full text-center text-cricket-green-600 hover:text-white bg-cricket-green-50 hover:bg-cricket-green-600 font-bold text-sm sm:text-base py-3.5 rounded-xl transition-all duration-200 touch-manipulation shadow-sm hover:shadow-md"
              >
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
