import { useState, useEffect } from "react";
import { X, Calendar, Clock, MapPin, Filter } from "lucide-react";

interface Booking {
  id: number;
  ground_id: number;
  ground_name: string;
  team_name: string;
  date: string;
  start_time: string;
  duration: number;
  status: string;
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  groundId?: number;
  groundName?: string;
}

export default function ScheduleModal({ isOpen, onClose, groundId, groundName }: ScheduleModalProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState<"week" | "month">("week");

  useEffect(() => {
    if (isOpen) {
      fetchSchedule();
    }
  }, [isOpen, groundId]);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const url = groundId ? `/api/grounds/${groundId}/schedule` : '/api/schedule';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  const getNextWeekDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString([], { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  

  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 9; // 9 AM to 9 PM
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const isTimeSlotBooked = (dateStr: string, time: string) => {
    return bookings.some(booking => {
      if (booking.date !== dateStr) return false;
      const bookingStartHour = parseInt(booking.start_time.split(':')[0]);
      const slotHour = parseInt(time.split(':')[0]);
      const bookingEndHour = bookingStartHour + booking.duration;
      return slotHour >= bookingStartHour && slotHour < bookingEndHour;
    });
  };

  const getBookingForSlot = (dateStr: string, time: string) => {
    return bookings.find(booking => {
      if (booking.date !== dateStr) return null;
      const bookingStartHour = parseInt(booking.start_time.split(':')[0]);
      const slotHour = parseInt(time.split(':')[0]);
      return slotHour === bookingStartHour;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto fade-in">
      <div className="min-h-screen">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 sticky top-0 z-10 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">
                {groundName ? `${groundName} Schedule` : 'My Schedule'}
              </h3>
              <p className="text-white/80 mt-1">View upcoming bookings and available slots</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6 sm:p-8 lg:p-12">
          {/* View Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setViewType("week")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  viewType === "week"
                    ? "bg-cricket-green-100 text-cricket-green-800"
                    : "text-gray-600 hover:text-cricket-green-700"
                }`}
              >
                Week View
              </button>
              <button
                onClick={() => setViewType("month")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  viewType === "month"
                    ? "bg-cricket-green-100 text-cricket-green-800"
                    : "text-gray-600 hover:text-cricket-green-700"
                }`}
              >
                List View
              </button>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <Filter className="w-4 h-4" />
              <span className="text-gray-600">{bookings.length} bookings found</span>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-cricket-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading schedule...</p>
            </div>
          ) : (
            <>
              {viewType === "week" && (
                <div className="overflow-x-auto">
                  <div className="min-w-full">
                    {/* Header row with dates */}
                    <div className="grid grid-cols-8 gap-2 mb-4">
                      <div className="p-2 text-sm font-medium text-gray-600">Time</div>
                      {getNextWeekDates().map((date, index) => (
                        <div key={index} className="p-2 text-center">
                          <div className="text-sm font-medium text-gray-800">
                            {date.toLocaleDateString([], { weekday: 'short' })}
                          </div>
                          <div className="text-xs text-gray-600">
                            {date.toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Time slots grid */}
                    <div className="space-y-1">
                      {timeSlots.map((time) => (
                        <div key={time} className="grid grid-cols-8 gap-2">
                          <div className="p-3 text-sm font-medium text-gray-600 border-r">
                            {time}
                          </div>
                          {getNextWeekDates().map((date, dateIndex) => {
                            const dateStr = formatDate(date);
                            const isBooked = isTimeSlotBooked(dateStr, time);
                            const booking = getBookingForSlot(dateStr, time);
                            
                            return (
                              <div
                                key={dateIndex}
                                className={`p-2 text-xs rounded-lg border transition-all duration-200 ${
                                  isBooked
                                    ? booking
                                      ? "bg-cricket-green-100 border-cricket-green-300 text-cricket-green-800"
                                      : "bg-red-50 border-red-200"
                                    : "bg-gray-50 border-gray-200 hover:bg-cricket-blue-50"
                                }`}
                              >
                                {booking && (
                                  <div className="font-medium truncate">
                                    {booking.team_name}
                                  </div>
                                )}
                                {isBooked && !booking && (
                                  <div className="text-red-600 font-medium">
                                    Booked
                                  </div>
                                )}
                                {!isBooked && (
                                  <div className="text-gray-500">
                                    Available
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {viewType === "month" && (
                <div className="space-y-4">
                  {bookings.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No bookings found</h3>
                      <p className="text-gray-500">There are no scheduled bookings at this time</p>
                    </div>
                  ) : (
                    bookings.map((booking, index) => (
                      <div
                        key={booking.id}
                        className="cricket-card p-4 hover-lift scale-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 cricket-gradient rounded-lg flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg text-gray-800">{booking.team_name}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  <span>{formatDisplayDate(booking.date)}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  <span>{booking.start_time} ({booking.duration}h)</span>
                                </div>
                                {!groundName && (
                                  <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span>{booking.ground_name}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {booking.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
