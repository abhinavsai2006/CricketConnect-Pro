import { useState, useEffect } from "react";
import { Search, Filter, Trophy, SlidersHorizontal, Star, MapPin, X } from "lucide-react";
import PlayerCard from "@/react-app/components/PlayerCard";
import PlayerProfileModal from "@/react-app/components/PlayerProfileModal";
import LoadingSpinner from "@/react-app/components/LoadingSpinner";

interface Player {
  id: number;
  name: string;
  email: string;
  profile_photo: string | null;
  position: string;
  batting_style: string | null;
  bowling_style: string | null;
  experience_years: number;
  rating: number;
  is_available: boolean;
  location: string | null;
  bio: string | null;
}

// Mock players data
const mockPlayers: Player[] = [
  { id: 1, name: "Virat Sharma", email: "virat@example.com", profile_photo: "https://ui-avatars.com/api/?name=Virat+Sharma&background=10b981&color=fff", position: "Batsman", batting_style: "Right-hand", bowling_style: "Right-arm Medium", experience_years: 8, rating: 4.8, is_available: true, location: "Mumbai", bio: "Aggressive batsman with consistent performance" },
  { id: 2, name: "Rohit Patel", email: "rohit@example.com", profile_photo: "https://ui-avatars.com/api/?name=Rohit+Patel&background=3b82f6&color=fff", position: "Batsman", batting_style: "Right-hand", bowling_style: null, experience_years: 10, rating: 4.9, is_available: true, location: "Delhi", bio: "Opening batsman, powerful hitter" },
  { id: 3, name: "Jasprit Kumar", email: "jasprit@example.com", profile_photo: "https://ui-avatars.com/api/?name=Jasprit+Kumar&background=f59e0b&color=fff", position: "Bowler", batting_style: "Right-hand", bowling_style: "Right-arm Fast", experience_years: 6, rating: 4.7, is_available: true, location: "Ahmedabad", bio: "Fast bowler with yorker specialty" },
  { id: 4, name: "Ravindra Singh", email: "ravindra@example.com", profile_photo: "https://ui-avatars.com/api/?name=Ravindra+Singh&background=8b5cf6&color=fff", position: "All-rounder", batting_style: "Left-hand", bowling_style: "Left-arm Spin", experience_years: 12, rating: 4.9, is_available: false, location: "Chennai", bio: "Experienced all-rounder, team player" },
  { id: 5, name: "MS Reddy", email: "ms@example.com", profile_photo: "https://ui-avatars.com/api/?name=MS+Reddy&background=ef4444&color=fff", position: "Wicket-keeper", batting_style: "Right-hand", bowling_style: null, experience_years: 15, rating: 5.0, is_available: true, location: "Ranchi", bio: "Wicket-keeper batsman, captain material" },
  { id: 6, name: "Hardik Verma", email: "hardik@example.com", profile_photo: "https://ui-avatars.com/api/?name=Hardik+Verma&background=06b6d4&color=fff", position: "All-rounder", batting_style: "Right-hand", bowling_style: "Right-arm Fast Medium", experience_years: 7, rating: 4.6, is_available: true, location: "Baroda", bio: "Hard-hitting all-rounder" },
  { id: 7, name: "Bumrah Khan", email: "bumrah@example.com", profile_photo: "https://ui-avatars.com/api/?name=Bumrah+Khan&background=84cc16&color=fff", position: "Bowler", batting_style: "Right-hand", bowling_style: "Right-arm Fast", experience_years: 5, rating: 4.8, is_available: true, location: "Ahmedabad", bio: "Death over specialist" },
  { id: 8, name: "Shikhar Das", email: "shikhar@example.com", profile_photo: "https://ui-avatars.com/api/?name=Shikhar+Das&background=f97316&color=fff", position: "Batsman", batting_style: "Left-hand", bowling_style: null, experience_years: 9, rating: 4.5, is_available: true, location: "Delhi", bio: "Left-handed opener" },
  { id: 9, name: "Kuldeep Yadav", email: "kuldeep@example.com", profile_photo: "https://ui-avatars.com/api/?name=Kuldeep+Yadav&background=ec4899&color=fff", position: "Bowler", batting_style: "Left-hand", bowling_style: "Left-arm Spin", experience_years: 4, rating: 4.3, is_available: false, location: "Kanpur", bio: "Chinaman bowler, wicket-taker" },
  { id: 10, name: "KL Rajput", email: "kl@example.com", profile_photo: "https://ui-avatars.com/api/?name=KL+Rajput&background=14b8a6&color=fff", position: "Wicket-keeper", batting_style: "Right-hand", bowling_style: null, experience_years: 8, rating: 4.7, is_available: true, location: "Bangalore", bio: "Stylish keeper-batsman" },
  { id: 11, name: "Ashwin Iyer", email: "ashwin@example.com", profile_photo: "https://ui-avatars.com/api/?name=Ashwin+Iyer&background=a855f7&color=fff", position: "All-rounder", batting_style: "Right-hand", bowling_style: "Right-arm Off-spin", experience_years: 11, rating: 4.8, is_available: true, location: "Chennai", bio: "Off-spinner with batting ability" },
  { id: 12, name: "Rishabh Pandey", email: "rishabh@example.com", profile_photo: "https://ui-avatars.com/api/?name=Rishabh+Pandey&background=0ea5e9&color=fff", position: "Wicket-keeper", batting_style: "Left-hand", bowling_style: null, experience_years: 5, rating: 4.4, is_available: true, location: "Delhi", bio: "Aggressive wicket-keeper" },
  { id: 13, name: "Mohammed Shami", email: "shami@example.com", profile_photo: "https://ui-avatars.com/api/?name=Mohammed+Shami&background=f43f5e&color=fff", position: "Bowler", batting_style: "Right-hand", bowling_style: "Right-arm Fast", experience_years: 9, rating: 4.7, is_available: true, location: "Kolkata", bio: "Swing bowler, new ball expert" },
  { id: 14, name: "Yuzvendra Chahal", email: "yuzi@example.com", profile_photo: "https://ui-avatars.com/api/?name=Yuzvendra+Chahal&background=eab308&color=fff", position: "Bowler", batting_style: "Right-hand", bowling_style: "Right-arm Leg-spin", experience_years: 7, rating: 4.6, is_available: false, location: "Jaipur", bio: "Leg-spinner, match-winner" },
  { id: 15, name: "Ajinkya Rahane", email: "ajinkya@example.com", profile_photo: "https://ui-avatars.com/api/?name=Ajinkya+Rahane&background=22c55e&color=fff", position: "Batsman", batting_style: "Right-hand", bowling_style: "Right-arm Off-spin", experience_years: 13, rating: 4.7, is_available: true, location: "Mumbai", bio: "Elegant middle-order batsman" },
  { id: 16, name: "Dinesh Karthik", email: "dk@example.com", profile_photo: "https://ui-avatars.com/api/?name=Dinesh+Karthik&background=6366f1&color=fff", position: "Wicket-keeper", batting_style: "Right-hand", bowling_style: null, experience_years: 16, rating: 4.6, is_available: true, location: "Chennai", bio: "Experienced finisher" },
  { id: 17, name: "Bhuvneshwar Kumar", email: "bhuvi@example.com", profile_photo: "https://ui-avatars.com/api/?name=Bhuvneshwar+Kumar&background=fb923c&color=fff", position: "All-rounder", batting_style: "Right-hand", bowling_style: "Right-arm Medium", experience_years: 10, rating: 4.5, is_available: true, location: "Meerut", bio: "Swing bowling all-rounder" },
  { id: 18, name: "Shreyas Iyer", email: "shreyas@example.com", profile_photo: "https://ui-avatars.com/api/?name=Shreyas+Iyer&background=ec4899&color=fff", position: "Batsman", batting_style: "Right-hand", bowling_style: "Right-arm Leg-spin", experience_years: 6, rating: 4.4, is_available: true, location: "Mumbai", bio: "Middle-order batsman, captain" },
  { id: 19, name: "Suryakumar Yadav", email: "sky@example.com", profile_photo: "https://ui-avatars.com/api/?name=Suryakumar+Yadav&background=10b981&color=fff", position: "Batsman", batting_style: "Right-hand", bowling_style: "Right-arm Off-spin", experience_years: 8, rating: 4.8, is_available: true, location: "Mumbai", bio: "360-degree player" },
  { id: 20, name: "Axar Patel", email: "axar@example.com", profile_photo: "https://ui-avatars.com/api/?name=Axar+Patel&background=8b5cf6&color=fff", position: "All-rounder", batting_style: "Left-hand", bowling_style: "Left-arm Spin", experience_years: 6, rating: 4.3, is_available: true, location: "Anand", bio: "Bowling all-rounder" }
];

export default function Players() {
  const [players] = useState<Player[]>(mockPlayers);
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(5);
  const [minExperience, setMinExperience] = useState(0);
  const [battingStyleFilter, setBattingStyleFilter] = useState("");
  const [bowlingStyleFilter, setBowlingStyleFilter] = useState("");
  const [sortBy, setSortBy] = useState("rating-desc");

  useEffect(() => {
    // Already using mock data, no need to fetch
  }, []);

  // fetchPlayers omitted; using mockPlayers

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (player.location && player.location.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesPosition = !positionFilter || player.position === positionFilter;
    const matchesAvailability = availabilityFilter === "all" || 
                               (availabilityFilter === "available" && player.is_available);
    
    const matchesRating = player.rating >= minRating && player.rating <= maxRating;
    const matchesExperience = player.experience_years >= minExperience;
    const matchesBattingStyle = !battingStyleFilter || player.batting_style === battingStyleFilter;
    const matchesBowlingStyle = !bowlingStyleFilter || player.bowling_style === bowlingStyleFilter;
    
    return matchesSearch && matchesPosition && matchesAvailability && 
           matchesRating && matchesExperience && matchesBattingStyle && matchesBowlingStyle;
  }).sort((a, b) => {
    switch(sortBy) {
      case "rating-desc": return b.rating - a.rating;
      case "rating-asc": return a.rating - b.rating;
      case "experience-desc": return b.experience_years - a.experience_years;
      case "experience-asc": return a.experience_years - b.experience_years;
      case "name-asc": return a.name.localeCompare(b.name);
      case "name-desc": return b.name.localeCompare(a.name);
      default: return 0;
    }
  });

  const positions = [...new Set(players.map(p => p.position))];
  const battingStyles = [...new Set(players.map(p => p.batting_style).filter(Boolean))] as string[];
  const bowlingStyles = [...new Set(players.map(p => p.bowling_style).filter(Boolean))] as string[];
  
  const clearFilters = () => {
    setSearchTerm("");
    setPositionFilter("");
    setAvailabilityFilter("all");
    setMinRating(0);
    setMaxRating(5);
    setMinExperience(0);
    setBattingStyleFilter("");
    setBowlingStyleFilter("");
    setSortBy("rating-desc");
  };

  const handleViewProfile = (playerId: number) => {
    setSelectedPlayerId(playerId);
    setShowPlayerModal(true);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner text="Loading players" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pt-4 sm:pt-8 pb-20 md:pb-8 page-transition">
      <div className="mb-4 sm:mb-8 fade-in">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Discover Players</h1>
        <p className="text-sm sm:text-base text-gray-600">Find talented cricketers to join your team</p>
      </div>

      {/* Search and Filters */}
      <div className="cricket-card p-3 sm:p-6 mb-4 sm:mb-8 slide-up">
        {/* Basic Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="relative sm:col-span-2 md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent transition-all duration-200 touch-manipulation"
            />
          </div>

          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent touch-manipulation"
          >
            <option value="">All Positions</option>
            {positions.map(position => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent touch-manipulation"
          >
            <option value="rating-desc">⭐ Highest Rated</option>
            <option value="rating-asc">Rating: Low to High</option>
            <option value="experience-desc">Most Experienced</option>
            <option value="experience-asc">Least Experienced</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>

          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`px-3 sm:px-4 py-2 sm:py-2.5 border-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-center space-x-2 touch-manipulation active:scale-95 ${
              showAdvancedFilters 
                ? "border-cricket-green-500 bg-cricket-green-50 text-cricket-green-700" 
                : "border-gray-300 text-gray-700 hover:border-cricket-green-500"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            <span className="sm:hidden">Filter</span>
          </button>
        </div>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
          <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4 space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {/* Rating Range */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                  <span>Rating: {minRating} - {maxRating}</span>
                </label>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                    className="flex-1 touch-manipulation"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={maxRating}
                    onChange={(e) => setMaxRating(parseFloat(e.target.value))}
                    className="flex-1 touch-manipulation"
                  />
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Min Experience: {minExperience} years
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={minExperience}
                  onChange={(e) => setMinExperience(parseInt(e.target.value))}
                  className="w-full touch-manipulation"
                />
              </div>

              {/* Availability */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-cricket-green-500 flex-shrink-0" />
                  <span>Availability</span>
                </label>
                <select
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent touch-manipulation"
                >
                  <option value="all">All Players</option>
                  <option value="available">✅ Available Only</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Batting Style */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Batting Style
                </label>
                <select
                  value={battingStyleFilter}
                  onChange={(e) => setBattingStyleFilter(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent touch-manipulation"
                >
                  <option value="">All Styles</option>
                  {battingStyles.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>

              {/* Bowling Style */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Bowling Style
                </label>
                <select
                  value={bowlingStyleFilter}
                  onChange={(e) => setBowlingStyleFilter(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent touch-manipulation"
                >
                  <option value="">All Styles</option>
                  {bowlingStyles.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Filter className="w-4 h-4" />
                <span className="font-medium">{filteredPlayers.length} players found</span>
              </div>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Clear All Filters</span>
              </button>
            </div>
          </div>
        )}

        {/* Quick Results Summary (when not showing advanced filters) */}
        {!showAdvancedFilters && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 gap-2 sm:gap-0">
            <div className="flex items-center space-x-2 text-gray-600">
              <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">{filteredPlayers.length} players found</span>
            </div>
            <button
              onClick={clearFilters}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-center space-x-2 touch-manipulation active:scale-95"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Clear All Filters</span>
            </button>
          </div>
        )}

        {/* Quick Results Summary (when not showing advanced filters) */}
        {!showAdvancedFilters && (
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 pt-2">
            <div className="flex items-center space-x-2">
              <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-medium">{filteredPlayers.length} players found</span>
            </div>
            {(searchTerm || positionFilter || availabilityFilter !== "all") && (
              <button
                onClick={clearFilters}
                className="text-cricket-green-600 hover:text-cricket-green-700 font-medium touch-manipulation"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Players Grid */}
      {filteredPlayers.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-600 mb-2">No players found</h3>
          <p className="text-sm sm:text-base text-gray-500 px-4">Try adjusting your search criteria or create a player profile</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {filteredPlayers.map((player, index) => (
            <div 
              key={player.id} 
              className="scale-in" 
              style={{animationDelay: `${index * 0.05}s`}}
            >
              <PlayerCard 
                player={player} 
                onViewProfile={handleViewProfile}
              />
            </div>
          ))}
        </div>
      )}

      <PlayerProfileModal 
        isOpen={showPlayerModal}
        onClose={() => setShowPlayerModal(false)}
        playerId={selectedPlayerId || 0}
      />
    </div>
  );
}
