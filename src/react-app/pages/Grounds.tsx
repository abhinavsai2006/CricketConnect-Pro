import { useState, useEffect } from "react";
import { Search, Filter, Star, MapPin, Calendar, Wifi, Car, Utensils, Shield, History, TrendingUp, Heart, Zap, Award } from "lucide-react";
import LoadingSpinner from "@/react-app/components/LoadingSpinner";
import GroundBookingModal from "@/react-app/components/GroundBookingModal";
import ScheduleModal from "@/react-app/components/ScheduleModal";
import BookingHistoryModal from "@/react-app/components/BookingHistoryModal";
import GroundCalendar from "@/react-app/components/GroundCalendar";

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

export default function Grounds() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [grounds, setGrounds] = useState<Ground[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGround, setSelectedGround] = useState<Ground | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showBookingHistoryModal, setShowBookingHistoryModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    fetchGrounds();
  }, []);

  const fetchGrounds = async () => {
    try {
      const response = await fetch("/api/grounds");
      if (response.ok) {
        const data = await response.json();
        setGrounds(data);
      }
    } catch (error) {
      console.error("Error fetching grounds:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mock images for demo purposes
  const mockImages = [
    "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop",
  ];

  const filteredGrounds = grounds.filter(ground => {
    const matchesSearch = ground.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ground.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = !priceFilter || 
                        (priceFilter === "low" && ground.price_per_hour < 2000) ||
                        (priceFilter === "medium" && ground.price_per_hour >= 2000 && ground.price_per_hour < 3000) ||
                        (priceFilter === "high" && ground.price_per_hour >= 3000);
    
    const matchesLocation = !locationFilter || ground.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesPrice && matchesLocation;
  });

  const amenityIcons = {
    parking: Car,
    wifi: Wifi,
    food: Utensils,
    security: Shield,
  };

  const amenityLabels = {
    parking: "Parking",
    wifi: "WiFi",
    food: "Food Court",
    security: "Security",
  };

  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  const handleBookNow = (ground: Ground) => {
    setSelectedGround(ground);
    setShowBookingModal(true);
  };

  const toggleFavorite = (groundId: number) => {
    setFavorites(prev => 
      prev.includes(groundId) 
        ? prev.filter(id => id !== groundId)
        : [...prev, groundId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-20 md:pb-8 page-transition">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8 fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-800 mb-1">Cricket Grounds</h1>
            <p className="text-gray-600 text-sm sm:text-base">Find and book the perfect cricket ground for your match</p>
          </div>
          <button 
            onClick={() => setShowBookingHistoryModal(true)}
            className="mt-3 sm:mt-0 cricket-btn-primary flex items-center justify-center space-x-2 py-2.5 px-4"
          >
            <History className="w-4 h-4" />
            <span>My Bookings</span>
          </button>
        </div>
      </div>

      {/* Stats Overview - 2x2 on mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="cricket-card p-3 sm:p-4 hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 cricket-gradient rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-800">{grounds.length}</div>
          <div className="text-xs text-gray-600">Total Grounds</div>
        </div>

        <div className="cricket-card p-3 sm:p-4 hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 cricket-gradient-alt rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-800">12</div>
          <div className="text-xs text-gray-600">My Bookings</div>
        </div>

        <div className="cricket-card p-3 sm:p-4 hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-800">{favorites.length}</div>
          <div className="text-xs text-gray-600">Favorites</div>
        </div>

        <div className="cricket-card p-3 sm:p-4 hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <Award className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-800">₹2.5K</div>
          <div className="text-xs text-gray-600">Avg. Price</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="cricket-card p-3 sm:p-6 mb-4 sm:mb-8 slide-up">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="relative sm:col-span-2 md:col-span-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search grounds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent transition-all duration-200 touch-manipulation"
            />
          </div>

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent touch-manipulation"
          >
            <option value="">All Prices</option>
            <option value="low">Under ₹2,000/hr</option>
            <option value="medium">₹2,000 - ₹3,000/hr</option>
            <option value="high">Above ₹3,000/hr</option>
          </select>

          <input
            type="text"
            placeholder="Location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent touch-manipulation"
          />

          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 justify-center sm:justify-start">
            <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{filteredGrounds.length} grounds found</span>
          </div>
        </div>
      </div>

      {/* Grounds Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner text="Loading grounds" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredGrounds.map((ground, index) => {
            const amenitiesList = ground.amenities ? ground.amenities.split(',') : [];
            const mockImage = mockImages[index % mockImages.length];
            
            return (
              <div 
                key={ground.id} 
                className="cricket-card overflow-hidden hover-lift scale-in relative touch-manipulation"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)',
                  border: '1px solid rgba(34, 197, 94, 0.1)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(34, 197, 94, 0.05)'
                }}
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={mockImage}
                    alt={ground.name}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(ground.id);
                      }}
                      className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-1.5 sm:p-2 hover:bg-opacity-100 transition-all duration-200 hover:scale-110 touch-manipulation active:scale-95"
                    >
                      <Heart 
                        className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                          favorites.includes(ground.id) 
                            ? 'text-red-500 fill-current' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </button>
                    {ground.is_available ? (
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        Available
                      </div>
                    ) : (
                      <div className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                        Booked
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1">
                    <div className="text-base sm:text-lg font-bold text-cricket-green-700">₹{ground.price_per_hour.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">per hour</div>
                  </div>
                </div>

            {/* Content */}
            <div className="p-3 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-base sm:text-lg text-gray-800 truncate">{ground.name}</h3>
                <div className="flex items-center space-x-0.5 sm:space-x-1 flex-shrink-0 ml-2">
                  {renderRating(ground.rating)}
                </div>
              </div>

              <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                <span className="truncate">{ground.location}</span>
              </div>

              <div className="flex items-center text-xs text-gray-500 mb-3 sm:mb-4">
                  <span>{ground.rating} ({ground.total_reviews} reviews)</span>
                </div>

                {/* Amenities */}
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  {amenitiesList.map(amenity => {
                    const Icon = amenityIcons[amenity.trim() as keyof typeof amenityIcons];
                    return Icon ? (
                      <div
                        key={amenity}
                        className="flex items-center text-xs text-gray-600"
                        title={amenityLabels[amenity.trim() as keyof typeof amenityLabels]}
                      >
                        <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                    ) : null;
                  })}
                </div>

                {/* Enhanced Action buttons */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button 
                    onClick={() => {
                      setSelectedGround(ground);
                      setShowCalendar(true);
                    }}
                    className="flex-1 cricket-btn-secondary text-xs sm:text-sm py-2.5 sm:py-3 flex items-center justify-center space-x-1 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg rounded-xl touch-manipulation active:scale-95"
                  >
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>View Calendar</span>
                  </button>
                  <button 
                    onClick={() => handleBookNow(ground)}
                    className={`flex-1 text-xs sm:text-sm py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-200 shadow-md touch-manipulation active:scale-95 ${
                      ground.is_available 
                        ? "cricket-btn-primary hover:scale-105 hover:shadow-lg" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!ground.is_available}
                  >
                    {ground.is_available ? "Book Now" : "Unavailable"}
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 cricket-gradient rounded-full opacity-5"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 cricket-gradient-alt rounded-full opacity-5"></div>
              </div>
            </div>
            );
          })}
        </div>
      )}

      <GroundBookingModal 
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        ground={selectedGround}
      />

      <ScheduleModal 
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        groundId={selectedGround?.id}
        groundName={selectedGround?.name}
      />

      <BookingHistoryModal 
        isOpen={showBookingHistoryModal}
        onClose={() => setShowBookingHistoryModal(false)}
      />

      {showCalendar && selectedGround && (
        <GroundCalendar
          groundId={selectedGround.id}
          groundName={selectedGround.name}
          basePrice={selectedGround.price_per_hour}
          onClose={() => setShowCalendar(false)}
          onBookSlot={(date, time, price) => {
            console.log("Booking slot:", { date, time, price });
            setShowCalendar(false);
            setShowBookingModal(true);
          }}
        />
      )}
    </div>
  );
}
