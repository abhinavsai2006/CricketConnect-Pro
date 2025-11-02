import { Star, MapPin, Calendar, Trophy, User, MessageCircle, UserPlus } from "lucide-react";

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

interface PlayerCardProps {
  player: Player;
  onViewProfile: (playerId: number) => void;
}

export default function PlayerCard({ player, onViewProfile }: PlayerCardProps) {
  const handleAddFriend = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch('/api/friends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          friend_id: player.id,
        }),
      });

      if (response.ok) {
        alert(`Friend request sent to ${player.name}!`);
      } else {
        alert('Failed to send friend request');
      }
    } catch (error) {
      console.error('Error adding friend:', error);
      alert('Error sending friend request');
    }
  };

  const handleSendMessage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate to chat or open a message modal
    alert(`Opening chat with ${player.name}...`);
    // In production, this would navigate to /chat with the player's conversation
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

  return (
    <div className="cricket-card p-4 sm:p-6 hover-lift hover-glow group relative overflow-hidden touch-manipulation"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)',
        border: '1px solid rgba(34, 197, 94, 0.1)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(34, 197, 94, 0.05)'
      }}>
      {/* Header with photo and availability */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          {player.profile_photo ? (
            <img
              src={player.profile_photo}
              alt={player.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-cricket-green-200"
            />
          ) : (
            <div className="w-10 h-10 sm:w-12 sm:h-12 cricket-gradient rounded-full flex items-center justify-center">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-base sm:text-lg text-gray-800 line-clamp-1">{player.name}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{player.position}</p>
          </div>
        </div>
        
        {player.is_available && (
          <div className="bg-green-100 text-green-800 text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
            Available
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
        {player.batting_style && (
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-cricket-green-600 flex-shrink-0" />
            <span className="truncate">Batting: {player.batting_style}</span>
          </div>
        )}
        {player.bowling_style && (
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-cricket-blue-600 flex-shrink-0" />
            <span className="truncate">Bowling: {player.bowling_style}</span>
          </div>
        )}
        <div className="flex items-center text-xs sm:text-sm text-gray-600">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-500 flex-shrink-0" />
          <span>{player.experience_years} years experience</span>
        </div>
        {player.location && (
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-500 flex-shrink-0" />
            <span className="truncate">{player.location}</span>
          </div>
        )}
      </div>

      {/* Bio */}
      {player.bio && (
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">{player.bio}</p>
      )}

      {/* Rating & Actions */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-0.5 sm:space-x-1">
          {renderRating(player.rating)}
          <span className="text-xs sm:text-sm font-medium text-gray-700 ml-1">
            {player.rating > 0 ? player.rating.toFixed(1) : "New"}
          </span>
        </div>
        
        <div className="flex items-center space-x-1.5 sm:space-x-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleSendMessage}
            className="w-7 h-7 sm:w-8 sm:h-8 cricket-gradient-alt rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg touch-manipulation"
            title="Send Message"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </button>
          <button 
            onClick={handleAddFriend}
            className="w-7 h-7 sm:w-8 sm:h-8 cricket-gradient rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg touch-manipulation"
            title="Add Friend"
          >
            <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Enhanced Action Button */}
      <button 
        onClick={() => onViewProfile(player.id)}
        className="w-full cricket-btn-primary text-xs sm:text-sm py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold group-hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl touch-manipulation"
      >
        <span className="flex items-center justify-center space-x-1.5 sm:space-x-2">
          <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>View Full Profile</span>
        </span>
      </button>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-16 h-16 cricket-gradient rounded-full opacity-5 group-hover:scale-110 transition-transform duration-500"></div>
      <div className="absolute -bottom-4 -left-4 w-12 h-12 cricket-gradient-alt rounded-full opacity-5 group-hover:scale-110 transition-transform duration-500"></div>
    </div>
  );
}
