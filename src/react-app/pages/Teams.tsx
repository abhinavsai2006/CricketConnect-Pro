import { useState, useEffect } from "react";
import { Plus, Users, Trophy, Star, MapPin, Target, Calendar, TrendingUp, Award, Filter, Search, BarChart3, MessageCircle, Shield } from "lucide-react";
import CreateTeamModal from "@/react-app/components/CreateTeamModal";
import TeamManagementModal from "@/react-app/components/TeamManagementModal";
import JoinTeamModal from "@/react-app/components/JoinTeamModal";
import LoadingSpinner from "@/react-app/components/LoadingSpinner";
import TeamFormationTool from "@/react-app/components/TeamFormationTool";

interface Team {
  id: number;
  name: string;
  description: string | null;
  captain_id: string;
  captain_name?: string;
  location: string | null;
  max_players: number;
  member_count?: number;
  created_at: string;
}

export default function Teams() {
  const [activeTab, setActiveTab] = useState<"my-teams" | "discover">("my-teams");
  const [myTeams, setMyTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showFormationTool, setShowFormationTool] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState<"all" | "active" | "recruiting">("all");

  // Mock players for demo (in production, fetch from API)
  const mockPlayers = [
    { id: 1, name: "Player 1", role: "batsman" as const },
    { id: 2, name: "Player 2", role: "bowler" as const },
    { id: 3, name: "Player 3", role: "all-rounder" as const },
    { id: 4, name: "Player 4", role: "wicket-keeper" as const },
    { id: 5, name: "Player 5", role: "batsman" as const },
    { id: 6, name: "Player 6", role: "bowler" as const },
    { id: 7, name: "Player 7", role: "all-rounder" as const },
    { id: 8, name: "Player 8", role: "batsman" as const },
    { id: 9, name: "Player 9", role: "bowler" as const },
    { id: 10, name: "Player 10", role: "batsman" as const },
    { id: 11, name: "Player 11", role: "bowler" as const },
  ];

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/teams");
      if (response.ok) {
        const data = await response.json();
        setMyTeams(data);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamCreated = () => {
    fetchTeams();
  };

  const handleManageTeam = (team: Team) => {
    setSelectedTeam(team);
    setShowManageModal(true);
  };

  const handleJoinTeam = (team: any) => {
    setSelectedTeam(team);
    setShowJoinModal(true);
  };

  // Mock discover teams data
  const discoverTeams = [
    {
      id: 100,
      name: "Thunder Bolts",
      description: "Looking for skilled all-rounders",
      member_count: 9,
      max_players: 11,
      location: "Bangalore",
      captain_name: "Mike Johnson",
      positions: ["Batsman", "Bowler"],
    },
    {
      id: 101,
      name: "Rising Stars", 
      description: "Young team with great potential",
      member_count: 7,
      max_players: 11,
      location: "Chennai",
      captain_name: "Sarah Wilson",
      positions: ["Wicket-keeper", "All-rounder"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-20 md:pb-8 page-transition">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8 fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-800 mb-1">Teams Management</h1>
            <p className="text-gray-600 text-sm sm:text-base">Manage your teams and discover new opportunities</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="mt-3 sm:mt-0 cricket-btn-primary flex items-center justify-center space-x-2 py-2.5 px-4"
          >
            <Plus className="w-4 h-4" />
            <span>Create Team</span>
          </button>
        </div>
      </div>

      {/* Stats Overview - 2x2 on mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="cricket-card p-3 sm:p-4 hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 cricket-gradient rounded-lg flex items-center justify-center">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-800">{myTeams.length}</div>
          <div className="text-xs text-gray-600">My Teams</div>
        </div>

        <div className="cricket-card p-3 sm:p-4 hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 cricket-gradient-alt rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-800">{myTeams.reduce((acc, t) => acc + (t.member_count || 1), 0)}</div>
          <div className="text-xs text-gray-600">Total Members</div>
        </div>

        <div className="cricket-card p-3 sm:p-4 hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-800">5</div>
          <div className="text-xs text-gray-600">Upcoming Matches</div>
        </div>

        <div className="cricket-card p-3 sm:p-4 hover-lift">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-800">67%</div>
          <div className="text-xs text-gray-600">Win Rate</div>
        </div>
      </div>

      {/* Tab Navigation with Search and Filter */}
      <div className="cricket-card p-4 sm:p-6 mb-6 sm:mb-8 slide-up">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2 sm:space-x-4">
              <button
                onClick={() => setActiveTab("my-teams")}
                className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium rounded-lg transition-all duration-200 hover:scale-105 ${
                  activeTab === "my-teams"
                    ? "bg-cricket-green-100 text-cricket-green-800"
                    : "text-gray-600 hover:text-cricket-green-700"
                }`}
              >
                My Teams ({myTeams.length})
              </button>
              <button
                onClick={() => setActiveTab("discover")}
                className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium rounded-lg transition-all duration-200 hover:scale-105 ${
                  activeTab === "discover"
                    ? "bg-cricket-green-100 text-cricket-green-800"
                    : "text-gray-600 hover:text-cricket-green-700"
                }`}
              >
                Discover Teams
              </button>
            </div>
          </div>

          {/* Search and Filter Row */}
                    {/* Search and Filter Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cricket-green-500 text-sm sm:text-base touch-manipulation"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cricket-green-500 text-sm sm:text-base touch-manipulation"
              >
                <option value="all">All Teams</option>
                <option value="active">Active</option>
                <option value="recruiting">Recruiting</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner text="Loading teams" />
        </div>
      ) : activeTab === "my-teams" ? (
        <div className="space-y-6">
          {myTeams.length === 0 ? (
            <div className="text-center py-8 sm:py-12 fade-in">
              <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-600 mb-2">No teams yet</h3>
              <p className="text-sm sm:text-base text-gray-500 mb-4 px-4">Create your first team to get started</p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="cricket-btn-primary flex items-center space-x-2 mx-auto touch-manipulation active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Create Team</span>
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {myTeams.map((team, index) => (
                <div key={team.id} className="cricket-card-enhanced p-4 sm:p-6 hover-lift hover-glow scale-in group relative overflow-hidden" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-800 group-hover:text-cricket-green-700 transition-colors duration-200">{team.name}</h3>
                    <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-xs font-semibold px-2 sm:px-3 py-1 rounded-full border border-green-300 shadow-sm">
                      Captain
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 sm:mb-6 leading-relaxed line-clamp-2">{team.description || "No description provided"}</p>

                  {/* Team Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="p-2 sm:p-3 glassmorphism rounded-lg">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 cricket-gradient rounded-lg flex items-center justify-center shadow-md">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Members</div>
                          <div className="text-sm sm:text-base font-bold text-gray-800">{team.member_count || 1}/{team.max_players}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 sm:p-3 glassmorphism rounded-lg">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 cricket-gradient-alt rounded-lg flex items-center justify-center shadow-md">
                          <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Matches</div>
                          <div className="text-sm sm:text-base font-bold text-gray-800">12</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 sm:p-3 glassmorphism rounded-lg">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Location</div>
                          <div className="text-xs sm:text-sm font-bold text-gray-800 truncate">{team.location || "Not set"}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 sm:p-3 glassmorphism rounded-lg">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Win Rate</div>
                          <div className="text-sm sm:text-base font-bold text-gray-800">67%</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Team Strength Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm sm:text-base font-medium text-gray-700">Team Strength</span>
                      <span className="text-base sm:text-lg font-bold text-cricket-green-700">{((team.member_count || 1) / team.max_players * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 sm:h-3 shadow-inner overflow-hidden">
                      <div 
                        className="cricket-gradient h-3 sm:h-3 rounded-full shadow-sm transition-all duration-500 relative" 
                        style={{ width: `${((team.member_count || 1) / team.max_players) * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Mobile Optimized */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <button 
                      onClick={() => {
                        setSelectedTeam(team);
                        setShowFormationTool(true);
                      }}
                      className="flex flex-col items-center justify-center p-3 sm:p-2.5 rounded-xl sm:rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-2 border-blue-200 hover:border-blue-300 transition-all duration-200 shadow-md hover:shadow-lg touch-manipulation active:scale-95"
                    >
                      <Target className="w-5 h-5 sm:w-4 sm:h-4 text-blue-600 mb-1 sm:mb-0" />
                      <span className="text-xs font-semibold text-blue-700 sm:hidden">Formation</span>
                      <span className="hidden sm:inline text-sm font-semibold text-blue-700">Formation</span>
                    </button>
                    <button 
                      onClick={() => handleManageTeam(team)}
                      className="flex flex-col items-center justify-center p-3 sm:p-2.5 rounded-xl sm:rounded-lg cricket-gradient hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg touch-manipulation active:scale-95"
                    >
                      <Shield className="w-5 h-5 sm:w-4 sm:h-4 text-white mb-1 sm:mb-0" />
                      <span className="text-xs font-semibold text-white sm:hidden">Manage</span>
                      <span className="hidden sm:inline text-sm font-semibold text-white">Manage</span>
                    </button>
                    <button 
                      onClick={() => window.location.href = '/chat'}
                      className="flex flex-col items-center justify-center p-3 sm:p-2.5 rounded-xl sm:rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg touch-manipulation active:scale-95"
                    >
                      <MessageCircle className="w-5 h-5 sm:w-4 sm:h-4 text-white mb-1 sm:mb-0" />
                      <span className="text-xs font-semibold text-white sm:hidden">Chat</span>
                      <span className="hidden sm:inline text-sm font-semibold text-white">Chat</span>
                    </button>
                  </div>

                  {/* Quick Stats Bar - Mobile Optimized */}
                  <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                      <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Next Match</span>
                        <span className="text-sm font-semibold text-gray-800">Tomorrow</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
                      <BarChart3 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Total Wins</span>
                        <span className="text-sm font-semibold text-green-700">8 Wins</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 cricket-gradient rounded-full opacity-5 group-hover:scale-125 transition-transform duration-500"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {discoverTeams.map((team, index) => (
              <div key={team.id} className="cricket-card p-4 sm:p-6 hover-lift scale-in touch-manipulation" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="font-semibold text-base sm:text-lg text-gray-800">{team.name}</h3>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current flex-shrink-0" />
                    <span className="text-sm ml-1">4.5</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">{team.description}</p>

                <div className="space-y-2 mb-3 sm:mb-4">
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                    <span>{team.member_count}/{team.max_players} players</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{team.location}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Captain: {team.captain_name}</span>
                  </div>
                </div>

                {team.positions && (
                  <div className="mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Looking for:</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {team.positions.map(position => (
                        <span key={position} className="bg-cricket-blue-100 text-cricket-blue-800 text-xs px-2 py-1 rounded-full">
                          {position}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 sm:gap-0">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 sm:mr-4">
                    <div 
                      className="cricket-gradient-alt h-2 rounded-full" 
                      style={{ width: `${(team.member_count / team.max_players) * 100}%` }}
                    ></div>
                  </div>
                  <button 
                    onClick={() => handleJoinTeam(team)}
                    className="cricket-btn-primary text-xs sm:text-sm px-4 py-2.5 hover:scale-105 transition-transform duration-200 touch-manipulation active:scale-95 w-full sm:w-auto"
                  >
                    Request Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <CreateTeamModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onTeamCreated={handleTeamCreated}
      />

      <TeamManagementModal 
        isOpen={showManageModal}
        onClose={() => setShowManageModal(false)}
        team={selectedTeam}
      />

      <JoinTeamModal 
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        team={selectedTeam}
      />

      {showFormationTool && selectedTeam && (
        <TeamFormationTool
          teamId={selectedTeam.id}
          teamName={selectedTeam.name}
          players={mockPlayers}
          onClose={() => setShowFormationTool(false)}
        />
      )}
    </div>
  );
}
