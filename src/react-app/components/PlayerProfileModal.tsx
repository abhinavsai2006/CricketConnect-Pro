import { useState, useEffect } from "react";
import { X, Star, MapPin, Calendar, Trophy, Mail, MessageCircle, Award, Target, TrendingUp, Instagram, Twitter, Facebook, Globe, Play, Image as ImageIcon } from "lucide-react";

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

interface CareerStats {
  matches: number;
  runs: number;
  wickets: number;
  catches: number;
  highestScore: number;
  bestBowling: string;
  average: number;
  strikeRate: number;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  date: string;
}

interface PlayerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerId: number;
}

export default function PlayerProfileModal({ isOpen, onClose, playerId }: PlayerProfileModalProps) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "stats" | "achievements" | "media">("overview");

  useEffect(() => {
    if (isOpen && playerId) {
      fetchPlayer();
    }
  }, [isOpen, playerId]);

  const fetchPlayer = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/players/${playerId}`);
      if (response.ok) {
        const data = await response.json();
        setPlayer(data);
      }
    } catch (error) {
      console.error("Error fetching player:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartChat = () => {
    // TODO: Implement start chat functionality
    console.log("Start chat with", player?.name);
    alert(`Opening chat with ${player?.name}...`);
  };

  const handleAddFriend = async () => {
    if (!player) return;
    
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

  // Mock career stats (in production, fetch from API)
  const careerStats: CareerStats = {
    matches: 156,
    runs: 4523,
    wickets: 89,
    catches: 45,
    highestScore: 187,
    bestBowling: "5/32",
    average: 42.8,
    strikeRate: 138.5,
  };

  // Mock achievements
  const achievements: Achievement[] = [
    { id: 1, title: "Century Maker", description: "Scored 5+ centuries", icon: "🏆", date: "2024" },
    { id: 2, title: "Five Wicket Haul", description: "Took 5 wickets in an innings", icon: "🎯", date: "2024" },
    { id: 3, title: "Team Player", description: "Played 100+ matches", icon: "⭐", date: "2023" },
    { id: 4, title: "Match Winner", description: "Won 50+ matches", icon: "🥇", date: "2023" },
  ];

  // Mock skill levels for radar chart (0-100)
  const skills = {
    batting: 85,
    bowling: 72,
    fielding: 78,
    fitness: 90,
    leadership: 65,
  };

  const renderSkillRadar = () => {
    return (
      <div className="relative w-full aspect-square max-w-xs mx-auto">
        {/* Pentagon background */}
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Grid circles */}
          {[20, 40, 60, 80, 100].map((percent) => (
            <polygon
              key={percent}
              points="100,20 172,76 142,164 58,164 28,76"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              style={{
                transform: `scale(${percent / 100})`,
                transformOrigin: 'center',
              }}
            />
          ))}
          
          {/* Grid lines */}
          <line x1="100" y1="100" x2="100" y2="20" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="100" y1="100" x2="172" y2="76" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="100" y1="100" x2="142" y2="164" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="100" y1="100" x2="58" y2="164" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="100" y1="100" x2="28" y2="76" stroke="#e5e7eb" strokeWidth="1" />
          
          {/* Skill polygon */}
          <polygon
            points={`
              100,${20 + (100 - skills.batting) * 0.8}
              ${172 - (100 - skills.bowling) * 0.72},${76 + (100 - skills.bowling) * 0.44}
              ${142 - (100 - skills.fielding) * 0.42},${164 - (100 - skills.fielding) * 0.88}
              ${58 + (100 - skills.fitness) * 0.42},${164 - (100 - skills.fitness) * 0.88}
              ${28 + (100 - skills.leadership) * 0.72},${76 + (100 - skills.leadership) * 0.44}
            `}
            fill="rgba(34, 197, 94, 0.3)"
            stroke="#22c55e"
            strokeWidth="2"
          />
          
          {/* Skill points */}
          <circle cx="100" cy={20 + (100 - skills.batting) * 0.8} r="4" fill="#22c55e" />
          <circle cx={172 - (100 - skills.bowling) * 0.72} cy={76 + (100 - skills.bowling) * 0.44} r="4" fill="#22c55e" />
          <circle cx={142 - (100 - skills.fielding) * 0.42} cy={164 - (100 - skills.fielding) * 0.88} r="4" fill="#22c55e" />
          <circle cx={58 + (100 - skills.fitness) * 0.42} cy={164 - (100 - skills.fitness) * 0.88} r="4" fill="#22c55e" />
          <circle cx={28 + (100 - skills.leadership) * 0.72} cy={76 + (100 - skills.leadership) * 0.44} r="4" fill="#22c55e" />
        </svg>
        
        {/* Labels */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-sm font-semibold text-gray-700">
          Batting {skills.batting}
        </div>
        <div className="absolute top-1/4 right-0 translate-x-12 text-sm font-semibold text-gray-700">
          Bowling {skills.bowling}
        </div>
        <div className="absolute bottom-1/4 right-0 translate-x-12 text-sm font-semibold text-gray-700">
          Fielding {skills.fielding}
        </div>
        <div className="absolute bottom-1/4 left-0 -translate-x-12 text-sm font-semibold text-gray-700">
          Fitness {skills.fitness}
        </div>
        <div className="absolute top-1/4 left-0 -translate-x-16 text-sm font-semibold text-gray-700">
          Leadership {skills.leadership}
        </div>
      </div>
    );
  };

  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400 opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      );
    }

    return stars;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto fade-in">
      <div className="min-h-screen">
        {loading ? (
          <div className="p-8 text-center min-h-screen flex items-center justify-center">
            <div>
              <div className="animate-spin w-8 h-8 border-4 border-cricket-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading player profile...</p>
            </div>
          </div>
        ) : player ? (
          <>
            {/* Header */}
            <div className="relative">
              <div className="h-32 sm:h-40 cricket-gradient"></div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-200 bg-black bg-opacity-20 rounded-full p-2"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Profile Picture */}
              <div className="absolute -bottom-16 left-6 sm:left-12">
                {player.profile_photo ? (
                  <img
                    src={player.profile_photo}
                    alt={player.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 cricket-gradient-alt rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <Trophy className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>

              {/* Availability Status */}
              {player.is_available && (
                <div className="absolute -bottom-4 right-6">
                  <div className="bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full border-2 border-white shadow-lg pulse-glow">
                    Available for Teams
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto pt-20 pb-6 px-6 sm:px-8 lg:px-12">
              {/* Basic Info */}
              <div className="mb-6">
                <h2 className="font-heading text-2xl font-bold text-gray-800 mb-2">{player.name}</h2>
                <p className="text-lg text-cricket-green-700 font-semibold mb-2">{player.position}</p>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {renderRating(player.rating)}
                  </div>
                  <span className="text-lg font-semibold text-gray-700">
                    {player.rating > 0 ? player.rating.toFixed(1) : "New Player"}
                  </span>
                </div>

                {/* Location & Experience */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {player.location && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2 text-cricket-green-600" />
                      <span>{player.location}</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2 text-cricket-blue-600" />
                    <span>{player.experience_years} years experience</span>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="flex space-x-3 mb-6">
                  <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-transform duration-200">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white hover:scale-110 transition-transform duration-200">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform duration-200">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:scale-110 transition-transform duration-200">
                    <Globe className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-6">
                <button 
                  onClick={handleStartChat}
                  className="flex-1 cricket-btn-primary flex items-center justify-center space-x-2 py-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Start Chat</span>
                </button>
                <button 
                  onClick={handleAddFriend}
                  className="flex-1 cricket-btn-secondary flex items-center justify-center space-x-2 py-3"
                >
                  <Mail className="w-5 h-5" />
                  <span>Add Friend</span>
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex space-x-2 mb-6 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-2 font-medium transition-all duration-200 ${
                    activeTab === "overview"
                      ? "text-cricket-green-700 border-b-2 border-cricket-green-700"
                      : "text-gray-600 hover:text-cricket-green-600"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("stats")}
                  className={`px-4 py-2 font-medium transition-all duration-200 ${
                    activeTab === "stats"
                      ? "text-cricket-green-700 border-b-2 border-cricket-green-700"
                      : "text-gray-600 hover:text-cricket-green-600"
                  }`}
                >
                  Career Stats
                </button>
                <button
                  onClick={() => setActiveTab("achievements")}
                  className={`px-4 py-2 font-medium transition-all duration-200 ${
                    activeTab === "achievements"
                      ? "text-cricket-green-700 border-b-2 border-cricket-green-700"
                      : "text-gray-600 hover:text-cricket-green-600"
                  }`}
                >
                  Achievements
                </button>
                <button
                  onClick={() => setActiveTab("media")}
                  className={`px-4 py-2 font-medium transition-all duration-200 ${
                    activeTab === "media"
                      ? "text-cricket-green-700 border-b-2 border-cricket-green-700"
                      : "text-gray-600 hover:text-cricket-green-600"
                  }`}
                >
                  Media
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Skills Section */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4 text-gray-800">Cricket Skills</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {player.batting_style && (
                        <div className="cricket-card-dark p-4">
                          <div className="flex items-center mb-2">
                            <Trophy className="w-5 h-5 mr-2 text-cricket-green-600" />
                            <span className="font-medium text-gray-700">Batting Style</span>
                          </div>
                          <p className="text-gray-600">{player.batting_style}</p>
                        </div>
                      )}
                      {player.bowling_style && (
                        <div className="cricket-card-dark p-4">
                          <div className="flex items-center mb-2">
                            <Trophy className="w-5 h-5 mr-2 text-cricket-blue-600" />
                            <span className="font-medium text-gray-700">Bowling Style</span>
                          </div>
                          <p className="text-gray-600">{player.bowling_style}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Skill Radar Chart */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4 text-gray-800">Skill Analysis</h3>
                    <div className="cricket-card-dark p-6">
                      {renderSkillRadar()}
                    </div>
                  </div>

                  {/* Bio Section */}
                  {player.bio && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-gray-800">About</h3>
                      <div className="cricket-card-dark p-4">
                        <p className="text-gray-600 leading-relaxed">{player.bio}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "stats" && (
                <div className="space-y-6">
                  <h3 className="font-semibold text-lg text-gray-800 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-cricket-green-600" />
                    <span>Career Statistics</span>
                  </h3>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="cricket-card-dark p-4 text-center">
                      <Trophy className="w-8 h-8 text-cricket-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">{careerStats.matches}</div>
                      <div className="text-xs text-gray-600">Matches</div>
                    </div>
                    <div className="cricket-card-dark p-4 text-center">
                      <Target className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">{careerStats.runs}</div>
                      <div className="text-xs text-gray-600">Runs</div>
                    </div>
                    <div className="cricket-card-dark p-4 text-center">
                      <Award className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">{careerStats.wickets}</div>
                      <div className="text-xs text-gray-600">Wickets</div>
                    </div>
                    <div className="cricket-card-dark p-4 text-center">
                      <Trophy className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">{careerStats.catches}</div>
                      <div className="text-xs text-gray-600">Catches</div>
                    </div>
                  </div>

                  {/* Detailed Stats */}
                  <div className="cricket-card-dark p-6 space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Highest Score</span>
                      <span className="font-bold text-gray-800">{careerStats.highestScore}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Best Bowling</span>
                      <span className="font-bold text-gray-800">{careerStats.bestBowling}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Batting Average</span>
                      <span className="font-bold text-gray-800">{careerStats.average}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Strike Rate</span>
                      <span className="font-bold text-gray-800">{careerStats.strikeRate}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "achievements" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-800 flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span>Achievement Badges</span>
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="cricket-card-dark p-4 hover:shadow-lg transition-shadow duration-200">
                        <div className="flex items-start space-x-3">
                          <div className="text-3xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-1">{achievement.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                            <span className="text-xs text-cricket-green-600 font-medium">{achievement.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "media" && (
                <div className="space-y-6">
                  <h3 className="font-semibold text-lg text-gray-800">Photos & Videos</h3>
                  
                  {/* Media Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="aspect-square bg-gradient-to-br from-cricket-green-100 to-cricket-blue-100 rounded-lg relative group cursor-pointer overflow-hidden hover:scale-105 transition-transform duration-200">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {item % 3 === 0 ? (
                            <Play className="w-12 h-12 text-white opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
                          ) : (
                            <ImageIcon className="w-12 h-12 text-white opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
                          )}
                        </div>
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <button className="cricket-btn-secondary px-6 py-2">
                      View All Media
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-600">Player not found</p>
          </div>
        )}
      </div>
    </div>
  );
}
