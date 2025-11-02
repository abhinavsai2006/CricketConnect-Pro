import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, DollarSign, Cloud, Sun, CloudRain, X } from "lucide-react";

interface TimeSlot {
  time: string;
  available: boolean;
  price: number;
  weather?: string;
}

interface GroundCalendarProps {
  groundId: number;
  groundName: string;
  basePrice: number;
  onClose: () => void;
  onBookSlot: (date: string, time: string, price: number) => void;
}

export default function GroundCalendar({ groundName, basePrice, onClose, onBookSlot }: GroundCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Generate time slots for a day
  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    for (let hour = 6; hour <= 22; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`;
      const nextHour = `${(hour + 1).toString().padStart(2, '0')}:00`;
      
      // Peak hours pricing (6-9 AM and 5-10 PM)
      const isPeakHour = (hour >= 6 && hour < 9) || (hour >= 17 && hour <= 21);
      let price = basePrice;
      
      if (isPeakHour) {
        price = basePrice * 1.5; // 50% markup for peak hours
      }
      
      if (isWeekend) {
        price = price * 1.3; // 30% markup for weekends
      }
      
      // Mock availability (random for demo)
      const available = Math.random() > 0.3;
      
      // Mock weather for today
      const isToday = date.toDateString() === new Date().toDateString();
      const weatherIcons = ['sunny', 'cloudy', 'rainy'];
      const weather = isToday ? weatherIcons[Math.floor(Math.random() * weatherIcons.length)] : undefined;
      
      slots.push({
        time: `${timeString} - ${nextHour}`,
        available,
        price: Math.round(price),
        weather: isToday ? weather : undefined,
      });
    }
    
    return slots;
  };

  // Calendar generation
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    setSelectedDate(null);
  };

  const selectDate = (day: number) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(selected);
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const isDatePast = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  const getWeatherIcon = (weather?: string) => {
    switch (weather) {
      case 'sunny':
        return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="w-4 h-4 text-gray-400" />;
      case 'rainy':
        return <CloudRain className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto animate-in fade-in duration-200">
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 p-4 sm:p-6 flex items-center justify-between sticky top-0 z-10 shadow-lg">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-white mb-1">{groundName}</h2>
            <p className="text-sm sm:text-base text-white/80">Select date and time slot</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200 touch-manipulation"
            aria-label="Close calendar"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="max-w-7xl mx-auto p-3 sm:p-6 lg:p-12 grid lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Calendar Section */}
          <div>
            <div className="cricket-card p-3 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 touch-manipulation"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <h3 className="text-base sm:text-xl font-bold text-gray-800">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 touch-manipulation"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Day names */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-xs sm:text-sm font-semibold text-gray-600 py-1 sm:py-2">
                    {day.slice(0, 3)}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square"></div>
                ))}

                {/* Actual days */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const isPast = isDatePast(day);
                  const isSelected = isDateSelected(day);
                  const isToday = 
                    day === new Date().getDate() &&
                    currentDate.getMonth() === new Date().getMonth() &&
                    currentDate.getFullYear() === new Date().getFullYear();

                  return (
                    <button
                      key={day}
                      onClick={() => !isPast && selectDate(day)}
                      disabled={isPast}
                      className={`aspect-square flex items-center justify-center rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 touch-manipulation min-h-[40px] sm:min-h-0 ${
                        isPast
                          ? "text-gray-300 cursor-not-allowed"
                          : isSelected
                          ? "bg-cricket-green-600 text-white shadow-lg scale-105"
                          : isToday
                          ? "bg-cricket-blue-100 text-cricket-blue-700 hover:bg-cricket-blue-200 active:bg-cricket-blue-300"
                          : "hover:bg-cricket-green-50 active:bg-cricket-green-100 text-gray-700"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 flex items-center justify-around text-xs sm:text-sm">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-cricket-blue-100 rounded"></div>
                  <span className="text-gray-600">Today</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-cricket-green-600 rounded"></div>
                  <span className="text-gray-600">Selected</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded"></div>
                  <span className="text-gray-600">Past</span>
                </div>
              </div>
            </div>

            {/* Pricing Info */}
            <div className="cricket-card p-3 sm:p-6 mt-4">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-cricket-green-600" />
                <span>Pricing Information</span>
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Base Price (Regular Hours)</span>
                  <span className="font-bold text-gray-800">${basePrice}/hr</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700">Peak Hours (6-9 AM, 5-10 PM)</span>
                  <span className="font-bold text-orange-700">${Math.round(basePrice * 1.5)}/hr</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Weekend Premium</span>
                  <span className="font-bold text-blue-700">+30%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Time Slots Section */}
          <div>
            {selectedDate ? (
              <div className="cricket-card p-3 sm:p-6">
                <h4 className="text-sm sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center space-x-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-cricket-blue-600" />
                  <span className="text-sm sm:text-base">
                    Available Slots - {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </h4>

                <div className="space-y-2 max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-1 sm:pr-2">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => slot.available && onBookSlot(selectedDate.toISOString(), slot.time, slot.price)}
                      disabled={!slot.available}
                      className={`w-full p-3 sm:p-4 rounded-lg transition-all duration-200 touch-manipulation ${
                        slot.available
                          ? "bg-gradient-to-r from-cricket-green-50 to-cricket-blue-50 hover:from-cricket-green-100 hover:to-cricket-blue-100 active:from-cricket-green-200 active:to-cricket-blue-200 border-2 border-cricket-green-200 hover:border-cricket-green-400 hover:shadow-md cursor-pointer"
                          : "bg-gray-50 border-2 border-gray-200 cursor-not-allowed opacity-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Clock className={`w-4 h-4 sm:w-5 sm:h-5 ${slot.available ? "text-cricket-green-600" : "text-gray-400"}`} />
                          <span className={`text-sm sm:text-base font-medium ${slot.available ? "text-gray-800" : "text-gray-500"}`}>
                            {slot.time}
                          </span>
                          {slot.weather && getWeatherIcon(slot.weather)}
                        </div>
                        <div className="text-right">
                          <div className={`text-base sm:text-lg font-bold ${slot.available ? "text-cricket-green-700" : "text-gray-500"}`}>
                            ${slot.price}
                          </div>
                          <div className="text-xs text-gray-500">
                            {slot.available ? "Available" : "Booked"}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="cricket-card p-12 text-center">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Select a date to view available time slots</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
