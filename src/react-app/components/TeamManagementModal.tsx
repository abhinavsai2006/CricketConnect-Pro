import { useState, useEffect } from "react";
import { X, Users, UserPlus, Mail, Trophy, Shield, MessageSquare } from "lucide-react";

interface Team {
  id: number;
  name: string;
  description: string | null;
  captain_id: string;
  location: string | null;
  max_players: number;
  member_count?: number;
  created_at: string;
}

interface TeamMember {
  id: number;
  player_id: number;
  player_name: string;
  position: string | null;
  joined_at: string;
  is_active: boolean;
  email?: string;
  profile_photo?: string;
}

interface JoinRequest {
  id: number;
  player_id: number;
  player_name: string;
  position: string;
  message: string | null;
  status: string;
  created_at: string;
  profile_photo?: string;
  email?: string;
}

interface TeamManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: Team | null;
}

export default function TeamManagementModal({ isOpen, onClose, team }: TeamManagementModalProps) {
  // Expanded sections state
  const [expandedSection, setExpandedSection] = useState<null | 'edit' | 'invite' | 'stats' | 'achievements' | 'schedule' | 'announcements'>(null);

  // Toggle section expansion
  const toggleSection = (section: 'edit' | 'invite' | 'stats' | 'achievements' | 'schedule' | 'announcements') => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Render expanded section content inline
  const renderExpandedSection = () => {
    if (!expandedSection) return null;
    let title = '';
    let content = null;
    if (expandedSection === 'edit') {
      title = 'Edit Team Details';
      content = (
        <div className="space-y-4">
          <div className="cricket-card-dark p-4">
            <h5 className="font-semibold mb-3">Basic Information</h5>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Team Name</label>
                <input type="text" className="w-full p-2 border rounded" defaultValue={team?.name} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Location</label>
                <input type="text" className="w-full p-2 border rounded" defaultValue={team?.location || ''} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Max Players</label>
                <input type="number" className="w-full p-2 border rounded" defaultValue={team?.max_players} />
              </div>
            </div>
          </div>
          <div className="cricket-card-dark p-4">
            <h5 className="font-semibold mb-3">Team Description</h5>
            <textarea 
              className="w-full p-2 border rounded" 
              rows={4}
              defaultValue={team?.description || ''}
              placeholder="Describe your team..."
            />
          </div>
          <button className="cricket-btn-primary w-full">Save Changes (Demo)</button>
        </div>
      );
    } else if (expandedSection === 'invite') {
      title = 'Invite Players';
      content = (
        <div className="space-y-4">
          <div className="cricket-card-dark p-4">
            <h5 className="font-semibold mb-3">Share Team Link</h5>
            <div className="flex space-x-2">
              <input 
                className="flex-1 p-2 border rounded bg-gray-50" 
                value={`https://cricketconnect.pro/teams/${team?.id}/join`} 
                readOnly 
              />
              <button className="cricket-btn-secondary px-4">Copy</button>
            </div>
          </div>
          <div className="cricket-card-dark p-4">
            <h5 className="font-semibold mb-3">Email Invitation</h5>
            <div className="space-y-3">
              <input 
                type="email" 
                className="w-full p-2 border rounded"
                placeholder="Enter email address"
              />
              <textarea 
                className="w-full p-2 border rounded"
                rows={3}
                defaultValue={`Join our cricket team "${team?.name}"! We're looking for passionate players.`}
              />
              <button className="cricket-btn-primary w-full">Send Invitation (Demo)</button>
            </div>
          </div>
        </div>
      );
    } else if (expandedSection === 'stats') {
      title = 'Team Statistics';
      content = (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="cricket-card-dark p-4 text-center">
              <div className="text-2xl font-bold text-cricket-green-600">15</div>
              <div className="text-sm text-gray-600">Matches Played</div>
            </div>
            <div className="cricket-card-dark p-4 text-center">
              <div className="text-2xl font-bold text-cricket-green-600">10</div>
              <div className="text-sm text-gray-600">Wins</div>
            </div>
            <div className="cricket-card-dark p-4 text-center">
              <div className="text-2xl font-bold text-cricket-green-600">67%</div>
              <div className="text-sm text-gray-600">Win Rate</div>
            </div>
          </div>
          <div className="cricket-card-dark p-4">
            <h5 className="font-semibold mb-3">Recent Performance</h5>
            <div className="flex space-x-2">
              {['W', 'W', 'L', 'W', 'W'].map((result, i) => (
                <div 
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    result === 'W' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {result}
                </div>
              ))}
            </div>
          </div>
          <div className="cricket-card-dark p-4">
            <h5 className="font-semibold mb-3">Team Rankings</h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Local League</span>
                <span className="font-medium">#2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Regional</span>
                <span className="font-medium">#5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">National</span>
                <span className="font-medium">#25</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (expandedSection === 'achievements') {
      title = 'Team Achievements';
      content = (
        <div className="space-y-4">
          <div className="cricket-card-dark p-4">
            <h5 className="font-semibold mb-3">Recent Trophies</h5>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 cricket-gradient rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">Local League Champions</div>
                  <div className="text-sm text-gray-600">2025 Summer Season</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 cricket-gradient rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">Regional Cup Runner-up</div>
                  <div className="text-sm text-gray-600">2025 Spring Tournament</div>
                </div>
              </div>
            </div>
          </div>
          <div className="cricket-card-dark p-4">
            <h5 className="font-semibold mb-3">Team Records</h5>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Highest Team Score</span>
                <span className="font-medium">245/6</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Best Bowling Figures</span>
                <span className="font-medium">6/25</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Longest Win Streak</span>
                <span className="font-medium">7 matches</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (expandedSection === 'schedule') {
      title = 'Team Schedule';
      content = (
        <div className="space-y-4">
          <div className="cricket-card-dark p-4">
            <h5 className="font-semibold mb-3">Upcoming Matches</h5>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <div>
                  <div className="font-medium">vs Thunder Knights</div>
                  <div className="text-sm text-gray-600">Local League Match</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">Nov 5, 2025</div>
                  <div className="text-sm text-gray-600">2:00 PM</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <div>
                  <div className="font-medium">vs Royal Strikers</div>
                  <div className="text-sm text-gray-600">Regional Cup Quarter-final</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">Nov 12, 2025</div>
                  <div className="text-sm text-gray-600">3:30 PM</div>
                </div>
              </div>
            </div>
          </div>
          <div className="cricket-card-dark p-4">
            <h5 className="font-semibold mb-3">Practice Sessions</h5>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Net Practice</span>
                <span className="text-gray-600">Every Tuesday, 6 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Fielding Session</span>
                <span className="text-gray-600">Every Thursday, 5 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Team Meeting</span>
                <span className="text-gray-600">Every Sunday, 11 AM</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (expandedSection === 'announcements') {
      title = 'Team Announcements';
      content = (
        <div className="space-y-4">
          <div className="cricket-card-dark p-4">
            <div className="flex justify-between items-start mb-4">
              <h5 className="font-semibold">New Announcements</h5>
              <button className="cricket-btn-secondary px-3 py-1 text-sm">+ Add New</button>
            </div>
            <div className="space-y-3">
              <div className="border-l-4 border-cricket-green-500 pl-3 py-1">
                <div className="font-medium">New Team Kit Arrival</div>
                <div className="text-sm text-gray-600 mt-1">
                  The new team kits have arrived! All players are required to collect their kit this weekend.
                </div>
                <div className="text-xs text-gray-500 mt-2">Posted 2 days ago</div>
              </div>
              <div className="border-l-4 border-cricket-blue-500 pl-3 py-1">
                <div className="font-medium">Change in Practice Schedule</div>
                <div className="text-sm text-gray-600 mt-1">
                  Due to ground maintenance, this week's practice will be held on Wednesday instead of Tuesday.
                </div>
                <div className="text-xs text-gray-500 mt-2">Posted 5 days ago</div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
        {content}
      </div>
    );
  };
  // Delete team handler
  const handleDeleteTeam = async () => {
    if (!team) return;
    if (!window.confirm(`Are you sure you want to delete the team "${team.name}"? This action cannot be undone.`)) return;
    try {
      const response = await fetch(`/api/teams/${team.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Team deleted successfully!');
        onClose();
        // Optionally: trigger a refresh of the teams list in parent component
      } else {
        alert('Failed to delete team.');
      }
    } catch (error) {
      alert('Error deleting team.');
      console.error(error);
    }
  };
  // Mock data for team members
  const mockMembers: TeamMember[] = [
    { id: 1, player_id: 1, player_name: "Virat Sharma", position: "Batsman", joined_at: "2025-01-15T10:00:00Z", is_active: true, email: "virat@example.com", profile_photo: "https://ui-avatars.com/api/?name=Virat+Sharma&background=10b981&color=fff" },
    { id: 2, player_id: 2, player_name: "Rohit Patel", position: "Opening Batsman", joined_at: "2025-01-20T11:30:00Z", is_active: true, email: "rohit@example.com", profile_photo: "https://ui-avatars.com/api/?name=Rohit+Patel&background=3b82f6&color=fff" }
  ];

  // Mock data for join requests
  const mockJoinRequests: JoinRequest[] = [
    { id: 1, player_id: 3, player_name: "Jasprit Kumar", position: "Fast Bowler", message: "I would love to join your team. I specialize in yorkers and have 6 years of experience.", status: "pending", created_at: "2025-10-28T09:00:00Z", profile_photo: "https://ui-avatars.com/api/?name=Jasprit+Kumar&background=f59e0b&color=fff", email: "jasprit@example.com" },
    { id: 2, player_id: 4, player_name: "Ravindra Singh", position: "All-rounder", message: "Experienced all-rounder looking for an active team.", status: "pending", created_at: "2025-10-30T14:30:00Z", profile_photo: "https://ui-avatars.com/api/?name=Ravindra+Singh&background=8b5cf6&color=fff", email: "ravindra@example.com" }
  ];

  const [activeTab, setActiveTab] = useState<"members" | "requests" | "settings">("members");
  const [members, setMembers] = useState<TeamMember[]>(mockMembers);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>(mockJoinRequests);
  const [loading] = useState(false);

  useEffect(() => {
    if (isOpen && team) {
      // Using mock data, no need to fetch
      setMembers(mockMembers);
      setJoinRequests(mockJoinRequests);
    }
  }, [isOpen, team]);

  // fetchTeamData intentionally omitted; using mock data

  const handleRequestAction = (requestId: number, action: 'approve' | 'reject') => {
    const request = joinRequests.find(r => r.id === requestId);
    if (!request) return;

    if (action === 'approve') {
      // Add to members
      const newMember: TeamMember = {
        id: members.length + 1,
        player_id: request.player_id,
        player_name: request.player_name,
        position: request.position,
        joined_at: new Date().toISOString(),
        is_active: true,
        email: request.email,
        profile_photo: request.profile_photo
      };
      setMembers([...members, newMember]);
    }

    // Update request status
    setJoinRequests(joinRequests.map(r => 
      r.id === requestId ? { ...r, status: action === 'approve' ? 'approved' : 'rejected' } : r
    ));
  };

  const removeMember = (memberId: number) => {
    if (!window.confirm('Are you sure you want to remove this member from the team?')) return;
    setMembers(members.filter(m => m.id !== memberId));
  };

  if (!isOpen || !team) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-cricket-green-50 via-white to-cricket-blue-50 z-50 overflow-y-auto">
      <div className="min-h-screen pb-20">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white shadow-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 cricket-gradient rounded-xl flex items-center justify-center pulse-glow shadow-lg">
                  <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">{team.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600">Team Management Dashboard</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-2 sm:space-x-4 overflow-x-auto py-4">
              <button
                onClick={() => setActiveTab("members")}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap flex items-center space-x-2 ${
                  activeTab === "members"
                    ? "bg-cricket-green-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-cricket-green-50 hover:text-cricket-green-700"
                }`}
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Members ({members.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("requests")}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-200 relative whitespace-nowrap flex items-center space-x-2 ${
                  activeTab === "requests"
                    ? "bg-cricket-green-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-cricket-green-50 hover:text-cricket-green-700"
                }`}
              >
                <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Join Requests</span>
                {joinRequests.filter(r => r.status === 'pending').length > 0 && (
                  <span className="w-5 h-5 sm:w-6 sm:h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center bounce-in">
                    {joinRequests.filter(r => r.status === 'pending').length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap flex items-center space-x-2 ${
                  activeTab === "settings"
                    ? "bg-cricket-green-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-cricket-green-50 hover:text-cricket-green-700"
                }`}
              >
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-cricket-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading team data...</p>
            </div>
          ) : (
            <>
              {/* Members Tab */}
              {activeTab === "members" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg">Team Members</h4>
                    <div className="text-sm text-gray-600">
                      {members.length}/{team.max_players} players
                    </div>
                  </div>
                  
                  {members.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No team members yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {members.map((member, index) => (
                        <div 
                          key={member.id} 
                          className="cricket-card p-4 hover-lift scale-in"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              {member.profile_photo ? (
                                <img
                                  src={member.profile_photo}
                                  alt={member.player_name}
                                  className="w-12 h-12 rounded-full border-2 border-cricket-green-200"
                                />
                              ) : (
                                <div className="w-12 h-12 cricket-gradient rounded-full flex items-center justify-center">
                                  <Users className="w-6 h-6 text-white" />
                                </div>
                              )}
                              <div>
                                <h5 className="font-semibold text-gray-800">{member.player_name}</h5>
                                <div className="flex items-center space-x-3 text-sm text-gray-600">
                                  <span>{member.position || "No position set"}</span>
                                  <span>•</span>
                                  <span>Joined {new Date(member.joined_at).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-cricket-blue-600 hover:bg-cricket-blue-100 rounded-lg transition-colors duration-200">
                                <Mail className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-cricket-green-600 hover:bg-cricket-green-100 rounded-lg transition-colors duration-200">
                                <MessageSquare className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => removeMember(member.id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Join Requests Tab */}
              {activeTab === "requests" && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Join Requests</h4>
                  
                  {joinRequests.length === 0 ? (
                    <div className="text-center py-8">
                      <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No join requests</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {joinRequests.map((request, index) => (
                        <div 
                          key={request.id} 
                          className="cricket-card p-4 hover-lift scale-in"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              {request.profile_photo ? (
                                <img
                                  src={request.profile_photo}
                                  alt={request.player_name}
                                  className="w-12 h-12 rounded-full border-2 border-cricket-green-200"
                                />
                              ) : (
                                <div className="w-12 h-12 cricket-gradient rounded-full flex items-center justify-center">
                                  <Users className="w-6 h-6 text-white" />
                                </div>
                              )}
                              <div>
                                <h5 className="font-semibold text-gray-800">{request.player_name}</h5>
                                <div className="flex items-center space-x-3 text-sm text-gray-600">
                                  <span>{request.position}</span>
                                  <span>•</span>
                                  <span>{new Date(request.created_at).toLocaleDateString()}</span>
                                </div>
                                {request.message && (
                                  <p className="text-sm text-gray-600 mt-1 italic">"{request.message}"</p>
                                )}
                              </div>
                            </div>
                            
                            {request.status === 'pending' ? (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleRequestAction(request.id, 'approve')}
                                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleRequestAction(request.id, 'reject')}
                                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                                >
                                  Decline
                                </button>
                              </div>
                            ) : (
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                request.status === 'approved'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {request.status === 'approved' ? 'Accepted' : 'Declined'}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-lg">Team Settings</h4>
                    <div className="text-sm text-gray-600">ID: #{team.id}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="cricket-card-dark p-4 col-span-2">
                      <h5 className="font-semibold mb-3">Quick Overview</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-sm text-gray-600">Members</div>
                          <div className="text-xl font-semibold text-cricket-green-700">
                            {members.length}/{team.max_players}
                          </div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-sm text-gray-600">Join Requests</div>
                          <div className="text-xl font-semibold text-cricket-blue-700">
                            {joinRequests.filter(r => r.status === 'pending').length}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="cricket-card-dark p-4 col-span-2">
                      <h5 className="font-semibold mb-3">Team Information</h5>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Team Name</span>
                          <span className="font-medium">{team.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Location</span>
                          <span className="font-medium">{team.location || "Not set"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Created</span>
                          <span className="font-medium">{new Date(team.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Captain</span>
                          <span className="font-medium">
                            {members.find(m => m.player_id.toString() === team.captain_id)?.player_name || "Not set"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-3">
                      <h5 className="font-semibold text-sm text-gray-600 uppercase tracking-wider mb-4">Team Management</h5>
                      <button
                        className={`w-full py-3 text-left px-4 flex items-center justify-between space-x-2 rounded-lg transition-all duration-200 ${
                          expandedSection === 'edit' 
                            ? 'bg-cricket-green-600 text-white shadow-lg' 
                            : 'bg-white hover:bg-cricket-green-50 text-gray-700 shadow-md hover:shadow-lg border border-gray-200'
                        }`}
                        onClick={() => toggleSection('edit')}
                      >
                        <div className="flex items-center space-x-2">
                          <Shield className="w-5 h-5" />
                          <span className="font-medium">Edit Team Details</span>
                        </div>
                        <span className="text-sm">{expandedSection === 'edit' ? '▼' : '▶'}</span>
                      </button>
                      <button
                        className={`w-full py-3 text-left px-4 flex items-center justify-between space-x-2 rounded-lg transition-all duration-200 ${
                          expandedSection === 'invite' 
                            ? 'bg-cricket-green-600 text-white shadow-lg' 
                            : 'bg-white hover:bg-cricket-green-50 text-gray-700 shadow-md hover:shadow-lg border border-gray-200'
                        }`}
                        onClick={() => toggleSection('invite')}
                      >
                        <div className="flex items-center space-x-2">
                          <UserPlus className="w-5 h-5" />
                          <span className="font-medium">Invite Players</span>
                        </div>
                        <span className="text-sm">{expandedSection === 'invite' ? '▼' : '▶'}</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-semibold text-sm text-gray-600 uppercase tracking-wider mb-4">Team Performance</h5>
                      <button
                        className={`w-full py-3 text-left px-4 flex items-center justify-between space-x-2 rounded-lg transition-all duration-200 ${
                          expandedSection === 'stats' 
                            ? 'bg-cricket-green-600 text-white shadow-lg' 
                            : 'bg-white hover:bg-cricket-green-50 text-gray-700 shadow-md hover:shadow-lg border border-gray-200'
                        }`}
                        onClick={() => toggleSection('stats')}
                      >
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-5 h-5" />
                          <span className="font-medium">Team Statistics</span>
                        </div>
                        <span className="text-sm">{expandedSection === 'stats' ? '▼' : '▶'}</span>
                      </button>
                      <button
                        className={`w-full py-3 text-left px-4 flex items-center justify-between space-x-2 rounded-lg transition-all duration-200 ${
                          expandedSection === 'achievements' 
                            ? 'bg-cricket-green-600 text-white shadow-lg' 
                            : 'bg-white hover:bg-cricket-green-50 text-gray-700 shadow-md hover:shadow-lg border border-gray-200'
                        }`}
                        onClick={() => toggleSection('achievements')}
                      >
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-5 h-5" />
                          <span className="font-medium">View Achievements</span>
                        </div>
                        <span className="text-sm">{expandedSection === 'achievements' ? '▼' : '▶'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-6">
                    <div className="space-y-3">
                      <h5 className="font-semibold text-sm text-gray-600 uppercase tracking-wider mb-4">Communication</h5>
                      <button
                        className={`w-full py-3 text-left px-4 flex items-center justify-between space-x-2 rounded-lg transition-all duration-200 ${
                          expandedSection === 'announcements' 
                            ? 'bg-cricket-green-600 text-white shadow-lg' 
                            : 'bg-white hover:bg-cricket-green-50 text-gray-700 shadow-md hover:shadow-lg border border-gray-200'
                        }`}
                        onClick={() => toggleSection('announcements')}
                      >
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="w-5 h-5" />
                          <span className="font-medium">Team Announcements</span>
                        </div>
                        <span className="text-sm">{expandedSection === 'announcements' ? '▼' : '▶'}</span>
                      </button>
                      <button
                        className={`w-full py-3 text-left px-4 flex items-center justify-between space-x-2 rounded-lg transition-all duration-200 ${
                          expandedSection === 'schedule' 
                            ? 'bg-cricket-green-600 text-white shadow-lg' 
                            : 'bg-white hover:bg-cricket-green-50 text-gray-700 shadow-md hover:shadow-lg border border-gray-200'
                        }`}
                        onClick={() => toggleSection('schedule')}
                      >
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="w-5 h-5" />
                          <span className="font-medium">Schedule & Events</span>
                        </div>
                        <span className="text-sm">{expandedSection === 'schedule' ? '▼' : '▶'}</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-semibold text-sm text-gray-600 uppercase tracking-wider mb-4">Danger Zone</h5>
                      <button
                        className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 text-left px-4 flex items-center space-x-2 shadow-md hover:shadow-lg font-medium"
                        onClick={handleDeleteTeam}
                      >
                        <X className="w-5 h-5" />
                        <span>Delete Team</span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Section Content */}
                  {expandedSection && (
                    <div className="mt-6 cricket-card p-6 slide-up">
                      {renderExpandedSection()}
                    </div>
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
