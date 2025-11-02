import { useState, useEffect } from "react";
import { X, Calendar, Clock, Filter, CheckCircle, AlertCircle, XCircle, MapPin, Users, Phone } from "lucide-react";

interface Booking {
  id: number;
  ground_id: number;
  ground_name: string;
  team_name: string;
  contact_number: string;
  date: string;
  start_time: string;
  duration: number;
  total_cost: number;
  status: string;
  payment_method: string;
  payment_status: string;
  special_requests: string | null;
  created_at: string;
  updated_at: string;
}

interface BookingHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingHistoryModal({ isOpen, onClose }: BookingHistoryModalProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "past" | "cancelled">("all");
  const [selectedBookingDetails, setSelectedBookingDetails] = useState<Booking | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchBookings();
    }
  }, [isOpen]);

  useEffect(() => {
    filterBookingsByStatus();
  }, [bookings, filterStatus]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/bookings/my");
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterBookingsByStatus = () => {
    const today = new Date().toISOString().split('T')[0];
    
    let filtered = bookings;
    
    switch (filterStatus) {
      case "upcoming":
        filtered = bookings.filter(booking => booking.date >= today && booking.status !== 'cancelled');
        break;
      case "past":
        filtered = bookings.filter(booking => booking.date < today);
        break;
      case "cancelled":
        filtered = bookings.filter(booking => booking.status === 'cancelled');
        break;
      default:
        filtered = bookings;
    }
    
    setFilteredBookings(filtered);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString([], { 
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isUpcoming = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr >= today;
  };

  const cancelBooking = async (bookingId: number) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: 'PATCH',
      });

      if (response.ok) {
        fetchBookings(); // Refresh bookings
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };
  if (!isOpen) return null;

  // If viewing details, show detail view instead of list
  if (selectedBookingDetails) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-none bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 p-4 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <button 
                onClick={() => setSelectedBookingDetails(null)}
                className="text-white hover:bg-white/20 p-2 rounded-lg touch-manipulation active:scale-95 flex-shrink-0"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-2xl font-bold text-white truncate">Booking Details</h3>
                <p className="text-white/80 text-xs sm:text-sm">ID: #{selectedBookingDetails.id}</p>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getStatusColor(selectedBookingDetails.status)}`}>
              {selectedBookingDetails.status.charAt(0).toUpperCase() + selectedBookingDetails.status.slice(1)}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-none bg-gray-50">
          <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-4 pb-20 sm:pb-6">
            {/* Ground Information */}
            <div className="cricket-card bg-gradient-to-br from-cricket-green-50 to-cricket-blue-50 p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 cricket-gradient rounded-xl flex items-center justify-center pulse-glow flex-shrink-0">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{selectedBookingDetails.ground_name}</h4>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span>Cricket Ground • Ground ID: {selectedBookingDetails.ground_id}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="cricket-card p-4 sm:p-5 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-cricket-blue-600" />
                  <span className="text-sm sm:text-base font-semibold text-gray-700">Booking Date</span>
                </div>
                <p className="text-base sm:text-xl font-bold text-gray-900 mb-1">{formatDate(selectedBookingDetails.date)}</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {isUpcoming(selectedBookingDetails.date) ? '🟢 Upcoming' : '🔴 Past'}
                </p>
              </div>
              
              <div className="cricket-card p-4 sm:p-5 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  <span className="text-sm sm:text-base font-semibold text-gray-700">Time & Duration</span>
                </div>
                <p className="text-base sm:text-xl font-bold text-gray-900 mb-1">{selectedBookingDetails.start_time}</p>
                <p className="text-xs sm:text-sm text-gray-600">{selectedBookingDetails.duration} hour{selectedBookingDetails.duration > 1 ? 's' : ''} session</p>
              </div>
            </div>

            {/* Team & Contact */}
            <div className="cricket-card p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div>
                <label className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 sm:mb-3 block">Team Information</label>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cricket-green-100 to-cricket-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-cricket-green-600" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-900">{selectedBookingDetails.team_name}</p>
                    <p className="text-xs sm:text-sm text-gray-500">Team Name</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 sm:pt-5">
                <label className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 sm:mb-3 block">Contact Information</label>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-cricket-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-900">{selectedBookingDetails.contact_number}</p>
                    <p className="text-xs sm:text-sm text-gray-500">Primary Contact</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="cricket-card p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50">
              <h5 className="text-sm sm:text-base font-bold text-gray-900 mb-4 sm:mb-5 flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-lg">₹</span>
                </div>
                Payment Details
              </h5>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-green-100">
                  <span className="text-xs sm:text-sm text-gray-600">Payment Method</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900">
                    {selectedBookingDetails.payment_method === 'online' ? '💳 Online Payment' : '💵 Pay at Ground'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-green-100">
                  <span className="text-xs sm:text-sm text-gray-600">Payment Status</span>
                  <span className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full ${
                    selectedBookingDetails.payment_status === 'paid' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {selectedBookingDetails.payment_status ? 
                      selectedBookingDetails.payment_status.charAt(0).toUpperCase() + selectedBookingDetails.payment_status.slice(1) 
                      : 'Pending'
                    }
                  </span>
                </div>
                <div className="pt-3 sm:pt-4 flex justify-between items-center">
                  <span className="text-base sm:text-lg font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl sm:text-3xl font-bold text-cricket-green-700">₹{selectedBookingDetails.total_cost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            {selectedBookingDetails.special_requests && (
              <div className="cricket-card p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-yellow-50">
                <h5 className="text-sm sm:text-base font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">📝</span>
                  Special Requests
                </h5>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-9">"{selectedBookingDetails.special_requests}"</p>
              </div>
            )}

            {/* Booking Metadata */}
            <div className="cricket-card p-4 sm:p-6 bg-gray-50">
              <h5 className="text-sm sm:text-base font-bold text-gray-900 mb-4">Booking Information</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Booked On</span>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900 text-sm sm:text-base">
                      {new Date(selectedBookingDetails.created_at).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 ml-6">
                    {new Date(selectedBookingDetails.created_at).toLocaleTimeString()}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Last Updated</span>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900 text-sm sm:text-base">
                      {new Date(selectedBookingDetails.updated_at).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 ml-6">
                    {new Date(selectedBookingDetails.updated_at).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isUpcoming(selectedBookingDetails.date) && selectedBookingDetails.status === 'confirmed' && (
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <button className="flex-1 px-6 py-4 cricket-btn-secondary text-sm sm:text-base font-semibold hover:scale-105 transition-transform duration-200 touch-manipulation active:scale-95 flex items-center justify-center space-x-2">
                  <span>✏️</span>
                  <span>Modify Booking</span>
                </button>
                <button 
                  onClick={() => {
                    cancelBooking(selectedBookingDetails.id);
                    setSelectedBookingDetails(null);
                  }}
                  className="flex-1 px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm sm:text-base font-semibold touch-manipulation active:scale-95 flex items-center justify-center space-x-2"
                >
                  <span>❌</span>
                  <span>Cancel Booking</span>
                </button>
              </div>
            )}

            {/* Back Button */}
            <button
              onClick={() => setSelectedBookingDetails(null)}
              className="w-full px-6 py-4 cricket-btn-primary text-sm sm:text-base font-semibold hover:scale-105 transition-transform touch-manipulation active:scale-95"
            >
              ← Back to Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show bookings list
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden">
      {/* Sticky header with gradient */}
      <div className="flex-none bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 p-4 sm:p-6 flex items-center justify-between shadow-lg">
        <div className="flex-1 min-w-0 mr-3">
          <h3 className="text-lg sm:text-2xl font-bold text-white truncate">My Bookings</h3>
          <p className="text-white/80 mt-0.5 sm:mt-1 text-xs sm:text-sm">View and manage your ground bookings</p>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors duration-200 touch-manipulation active:scale-95 flex-shrink-0"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overscroll-none bg-gray-50">
        <div className="max-w-6xl mx-auto p-3 sm:p-6 lg:p-12">
          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
            <div className="flex overflow-x-auto w-full sm:w-auto space-x-2 pb-2 sm:pb-0 scrollbar-hide">
              {[
                { key: "all", label: "All Bookings" },
                { key: "upcoming", label: "Upcoming" },
                { key: "past", label: "Past" },
                { key: "cancelled", label: "Cancelled" }
              ].map(filter => (
                <button
                  key={filter.key}
                  onClick={() => setFilterStatus(filter.key as any)}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm whitespace-nowrap touch-manipulation active:scale-95 ${
                    filterStatus === filter.key
                      ? "bg-cricket-green-100 text-cricket-green-800"
                      : "text-gray-600 hover:text-cricket-green-700 hover:bg-gray-100"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2 text-xs sm:text-sm">
              <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-gray-600">{filteredBookings.length} bookings found</span>
            </div>
          </div>

          {/* Bookings List */}
          {loading ? (
            <div className="text-center py-8 sm:py-12">
              <div className="animate-spin w-6 h-6 sm:w-8 sm:h-8 border-4 border-cricket-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600 text-sm sm:text-base">Loading your bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-8 sm:py-12 px-4">
              <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-600 mb-2">No bookings found</h3>
              <p className="text-sm sm:text-base text-gray-500">
                {filterStatus === "all" 
                  ? "You haven't made any bookings yet" 
                  : `No ${filterStatus} bookings found`}
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filteredBookings.map((booking, index) => (
                <div
                  key={booking.id}
                  className={`cricket-card p-3 sm:p-6 hover-lift scale-in relative overflow-hidden touch-manipulation ${
                    isUpcoming(booking.date) && booking.status !== 'cancelled' 
                      ? 'border-l-4 border-cricket-green-500' 
                      : ''
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Mobile Layout */}
                  <div className="flex flex-col sm:hidden space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1 min-w-0">
                        <div className="w-10 h-10 cricket-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-bold text-sm text-gray-800 truncate">{booking.ground_name}</h4>
                            {getStatusIcon(booking.status)}
                          </div>
                          <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <div className="text-base font-bold text-cricket-green-700">
                          ₹{booking.total_cost.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {booking.payment_method === 'online' ? 'Pay at Ground' : 'Pay at Ground'}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-2 flex-shrink-0" />
                        <span className="font-medium">{formatDate(booking.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-2 flex-shrink-0" />
                        <span>{booking.start_time} ({booking.duration}h)</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Team: {booking.team_name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 cricket-gradient rounded-xl flex items-center justify-center pulse-glow">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-bold text-lg text-gray-800">{booking.ground_name}</h4>
                          {getStatusIcon(booking.status)}
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="font-medium">{formatDate(booking.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{booking.start_time} ({booking.duration}h)</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium">Team: {booking.team_name}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium mb-2 ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </div>
                      <div className="text-lg font-bold text-cricket-green-700 mb-2">
                        ₹{booking.total_cost.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.payment_method === 'online' ? 'Paid Online' : 'Pay at Ground'}
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                      <div>
                        <span className="text-gray-500">Contact:</span>
                        <span className="ml-2 font-medium">{booking.contact_number}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Booked on:</span>
                        <span className="ml-2 font-medium">{new Date(booking.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {booking.special_requests && (
                      <div className="mt-2">
                        <span className="text-gray-500 text-xs sm:text-sm">Special Requests:</span>
                        <p className="mt-1 text-xs sm:text-sm text-gray-700 italic">"{booking.special_requests}"</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-3 sm:mt-4">
                      {isUpcoming(booking.date) && booking.status === 'confirmed' && (
                        <>
                          <button className="w-full sm:w-auto px-3 sm:px-4 py-2 cricket-btn-secondary text-xs sm:text-sm hover:scale-105 transition-transform duration-200 touch-manipulation active:scale-95">
                            Modify Booking
                          </button>
                          <button 
                            onClick={() => cancelBooking(booking.id)}
                            className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-xs sm:text-sm touch-manipulation active:scale-95"
                          >
                            Cancel Booking
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => setSelectedBookingDetails(booking)}
                        className="w-full sm:w-auto px-3 sm:px-4 py-2 cricket-btn-primary text-xs sm:text-sm hover:scale-105 transition-transform duration-200 touch-manipulation active:scale-95"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  {isUpcoming(booking.date) && booking.status !== 'cancelled' && (
                    <div className="absolute -top-4 -right-4 w-16 h-16 cricket-gradient rounded-full opacity-5"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
