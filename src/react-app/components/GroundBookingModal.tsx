import { useState } from "react";
import { X, Calendar, Clock, MapPin, Users, CreditCard, CheckCircle } from "lucide-react";

interface Ground {
  id: number;
  name: string;
  description: string | null;
  location: string;
  address: string | null;
  price_per_hour: number;
  amenities: string | null;
  rating: number;
  total_reviews: number;
  is_available: boolean;
}

interface GroundBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  ground: Ground | null;
}

export default function GroundBookingModal({ isOpen, onClose, ground }: GroundBookingModalProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [duration, setDuration] = useState(2);
  const [teamName, setTeamName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [bookingStep, setBookingStep] = useState<"details" | "payment" | "success">("details");
  const [loading, setLoading] = useState(false);

  if (!isOpen || !ground) return null;

  const handleBooking = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ground_id: ground.id,
          date: selectedDate,
          start_time: selectedTime,
          duration: duration,
          team_name: teamName,
          contact_number: contactNumber,
        }),
      });

      if (response.ok) {
        setBookingStep("success");
      } else {
        console.error("Booking failed");
      }
    } catch (error) {
      console.error("Error booking ground:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalCost = ground.price_per_hour * duration;
  const platformFee = Math.round(totalCost * 0.05); // 5% platform fee
  const finalTotal = totalCost + platformFee;

  // Generate time slots (9 AM to 9 PM)
  const timeSlots = [];
  for (let i = 9; i <= 21; i++) {
    const time = `${i.toString().padStart(2, '0')}:00`;
    timeSlots.push(time);
  }

  const handleClose = () => {
    setBookingStep("details");
    setSelectedDate("");
    setSelectedTime("");
    setDuration(2);
    setTeamName("");
    setContactNumber("");
    onClose();
  };

  if (bookingStep === "success") {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto fade-in">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 cricket-gradient rounded-full flex items-center justify-center mx-auto mb-4 bounce-in">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-6">
              Your ground has been successfully booked. You'll receive a confirmation email shortly.
            </p>
            <div className="cricket-card-dark p-4 mb-6 text-left">
              <h4 className="font-semibold mb-2">{ground.name}</h4>
              <p className="text-sm text-gray-600">{selectedDate} at {selectedTime}</p>
              <p className="text-sm text-gray-600">{duration} hours - ₹{finalTotal.toLocaleString()}</p>
            </div>
            <button
              onClick={handleClose}
              className="cricket-btn-primary w-full"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto fade-in">
      <div className="min-h-screen">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 sticky top-0 z-10 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">{ground.name}</h3>
              <div className="flex items-center text-white/80 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{ground.location}</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6 sm:p-8 lg:p-12">
          {bookingStep === "details" && (
            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Select Time
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm rounded-lg border transition-all duration-200 ${
                        selectedTime === time
                          ? "bg-cricket-green-100 border-cricket-green-600 text-cricket-green-800"
                          : "border-gray-300 hover:border-cricket-green-400"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (hours)
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6].map(hour => (
                    <option key={hour} value={hour}>{hour} hour{hour > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              {/* Team Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="Enter contact number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Cost Summary */}
              {selectedDate && selectedTime && (
                <div className="cricket-card-dark p-4">
                  <h4 className="font-semibold mb-3">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Ground fee ({duration} hours)</span>
                      <span>₹{totalCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform fee</span>
                      <span>₹{platformFee.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleClose}
                  className="flex-1 px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setBookingStep("payment")}
                  disabled={!selectedDate || !selectedTime || !teamName || !contactNumber}
                  className="flex-1 cricket-btn-primary disabled:opacity-50"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          {bookingStep === "payment" && (
            <div className="space-y-6">
              <div className="cricket-card-dark p-4">
                <h4 className="font-semibold mb-2">Booking Details</h4>
                <div className="text-sm space-y-1 text-gray-600">
                  <p><strong>{ground.name}</strong> - {selectedDate} at {selectedTime}</p>
                  <p>Duration: {duration} hours</p>
                  <p>Team: {teamName}</p>
                  <p>Contact: {contactNumber}</p>
                  <p className="text-lg font-semibold text-gray-800 pt-2">
                    Total: ₹{finalTotal.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <CreditCard className="w-4 h-4 inline mr-2" />
                  Payment Method
                </label>
                <div className="space-y-3">
                  <div className="cricket-card p-4 border-2 border-cricket-green-200">
                    <div className="flex items-center space-x-3">
                      <input type="radio" name="payment" defaultChecked className="text-cricket-green-600" />
                      <div>
                        <p className="font-medium">Pay Online</p>
                        <p className="text-sm text-gray-600">Credit/Debit Card, UPI, Net Banking</p>
                      </div>
                    </div>
                  </div>
                  <div className="cricket-card p-4">
                    <div className="flex items-center space-x-3">
                      <input type="radio" name="payment" className="text-cricket-green-600" />
                      <div>
                        <p className="font-medium">Pay at Ground</p>
                        <p className="text-sm text-gray-600">Cash payment on arrival</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setBookingStep("details")}
                  className="flex-1 px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleBooking}
                  disabled={loading}
                  className="flex-1 cricket-btn-primary disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Booking...</span>
                    </>
                  ) : (
                    <span>Confirm Booking</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
