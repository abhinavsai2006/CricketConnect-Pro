import { useState } from "react";
import { Trophy, Plus, Calendar, Users, Target, Award, Clock, MapPin, X } from "lucide-react";

interface Tournament {
  id: number;
  name: string;
  format: string;
  startDate: string;
  endDate: string;
  teams: number;
  status: "upcoming" | "ongoing" | "completed";
  location: string;
  prize: string;
}

export default function Tournaments() {
  const [activeTab, setActiveTab] = useState<"all" | "my-tournaments">("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const tournaments: Tournament[] = [
    {
      id: 1,
      name: "Summer Cricket Championship 2025",
      format: "T20",
      startDate: "Nov 15, 2025",
      endDate: "Nov 30, 2025",
      teams: 8,
      status: "upcoming",
      location: "Central Stadium",
      prize: "$5,000",
    },
    {
      id: 2,
      name: "Cricket Premier League",
      format: "ODI",
      startDate: "Nov 1, 2025",
      endDate: "Nov 20, 2025",
      teams: 12,
      status: "ongoing",
      location: "Multiple Venues",
      prize: "$10,000",
    },
    {
      id: 3,
      name: "Weekend Warriors Cup",
      format: "T10",
      startDate: "Oct 10, 2025",
      endDate: "Oct 12, 2025",
      teams: 6,
      status: "completed",
      location: "Sports Complex",
      prize: "$2,500",
    },
  ];

  const pointsTable = [
    { team: "Thunder Bolts", played: 8, won: 7, lost: 1, nrr: "+1.45", points: 14 },
    { team: "Lightning Stars", played: 8, won: 6, lost: 2, nrr: "+0.98", points: 12 },
    { team: "Storm Riders", played: 8, won: 5, lost: 3, nrr: "+0.56", points: 10 },
    { team: "Phoenix Blazers", played: 8, won: 4, lost: 4, nrr: "-0.23", points: 8 },
    { team: "Royal Warriors", played: 8, won: 3, lost: 5, nrr: "-0.67", points: 6 },
    { team: "Thunder Kings", played: 8, won: 2, lost: 6, nrr: "-1.12", points: 4 },
  ];

  const upcomingMatches = [
    { id: 1, team1: "Thunder Bolts", team2: "Lightning Stars", date: "Nov 5", time: "10:00 AM", venue: "Central Ground" },
    { id: 2, team1: "Storm Riders", team2: "Phoenix Blazers", date: "Nov 5", time: "2:00 PM", venue: "Sports Complex" },
    { id: 3, team1: "Royal Warriors", team2: "Thunder Kings", date: "Nov 6", time: "11:00 AM", venue: "Victory Stadium" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 page-transition">
      <div className="mb-8 fade-in flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-800 mb-2">Tournaments</h1>
          <p className="text-gray-600">Create and manage cricket tournaments</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-cricket-green-600 hover:bg-cricket-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Create Tournament</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="cricket-card p-4 mb-8 slide-up">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-3 font-medium rounded-lg transition-all duration-200 ${
              activeTab === "all"
                ? "bg-cricket-green-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-cricket-green-50"
            }`}
          >
            All Tournaments
          </button>
          <button
            onClick={() => setActiveTab("my-tournaments")}
            className={`px-6 py-3 font-medium rounded-lg transition-all duration-200 ${
              activeTab === "my-tournaments"
                ? "bg-cricket-blue-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-cricket-blue-50"
            }`}
          >
            My Tournaments
          </button>
        </div>
      </div>

      {/* Tournaments Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {tournaments.map((tournament, index) => (
          <div
            key={tournament.id}
            className="cricket-card p-6 hover-lift scale-in group cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                tournament.status === "ongoing" 
                  ? "bg-green-100 text-green-700" 
                  : tournament.status === "upcoming"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}>
                {tournament.status.toUpperCase()}
              </div>
              <Trophy className={`w-6 h-6 ${
                tournament.status === "ongoing" ? "text-green-500" : "text-gray-400"
              } group-hover:scale-110 transition-transform duration-300`} />
            </div>

            <h3 className="font-bold text-lg text-gray-800 mb-3 group-hover:text-cricket-green-700 transition-colors duration-200">
              {tournament.name}
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Target className="w-4 h-4 mr-2" />
                <span>{tournament.format} Format</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>{tournament.teams} Teams</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{tournament.startDate} - {tournament.endDate}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{tournament.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-gray-800">{tournament.prize}</span>
              </div>
              <button 
                onClick={() => setSelectedTournament(tournament)}
                className="text-cricket-green-600 hover:text-cricket-green-700 font-medium text-sm hover:underline transition-all duration-200"
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ongoing Tournament Details */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Points Table */}
        <div className="cricket-card p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-cricket-green-600" />
            <span>Points Table</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Team</th>
                  <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">P</th>
                  <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">W</th>
                  <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">L</th>
                  <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">NRR</th>
                  <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Pts</th>
                </tr>
              </thead>
              <tbody>
                {pointsTable.map((team, index) => (
                  <tr
                    key={team.team}
                    className={`border-b border-gray-100 hover:bg-cricket-green-50 transition-colors duration-150 ${
                      index < 4 ? "bg-green-50/30" : ""
                    }`}
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-bold ${index < 4 ? "text-green-600" : "text-gray-400"}`}>
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-800">{team.team}</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-2 text-sm text-gray-600">{team.played}</td>
                    <td className="text-center py-3 px-2 text-sm font-semibold text-green-600">{team.won}</td>
                    <td className="text-center py-3 px-2 text-sm font-semibold text-red-600">{team.lost}</td>
                    <td className="text-center py-3 px-2 text-sm text-gray-600">{team.nrr}</td>
                    <td className="text-center py-3 px-2 text-sm font-bold text-gray-800">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-lg text-xs text-gray-600">
            <span className="font-semibold text-green-700">Top 4 teams</span> qualify for semi-finals
          </div>
        </div>

        {/* Upcoming Matches */}
        <div className="cricket-card p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <Clock className="w-6 h-6 text-cricket-blue-600" />
            <span>Upcoming Matches</span>
          </h3>
          <div className="space-y-4">
            {upcomingMatches.map((match) => (
              <div
                key={match.id}
                className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:border-cricket-blue-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1 text-center">
                    <div className="font-bold text-gray-800 mb-1">{match.team1}</div>
                    <div className="text-xs text-gray-500">vs</div>
                    <div className="font-bold text-gray-800 mt-1">{match.team2}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{match.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{match.time}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2">
                  <MapPin className="w-4 h-4" />
                  <span>{match.venue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tournament Details Modal - Full Screen */}
      {selectedTournament && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto animate-in fade-in duration-200">
          <div className="min-h-screen">
            <div className="bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 p-6 flex items-center justify-between sticky top-0 z-10 shadow-lg">
              <div className="flex items-center space-x-3">
                <Trophy className="w-8 h-8 text-white" />
                <h2 className="text-2xl font-bold text-white">{selectedTournament.name}</h2>
              </div>
              <button
                onClick={() => setSelectedTournament(null)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="max-w-6xl mx-auto p-6 sm:p-8 lg:p-12 space-y-8">
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                selectedTournament.status === "ongoing" 
                  ? "bg-green-100 text-green-700" 
                  : selectedTournament.status === "upcoming"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}>
                {selectedTournament.status.toUpperCase()}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Target className="w-5 h-5 text-cricket-green-600" />
                    <div>
                      <div className="text-sm text-gray-500">Format</div>
                      <div className="font-semibold">{selectedTournament.format}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Users className="w-5 h-5 text-cricket-blue-600" />
                    <div>
                      <div className="text-sm text-gray-500">Teams</div>
                      <div className="font-semibold">{selectedTournament.teams} Teams Participating</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <div>
                      <div className="text-sm text-gray-500">Prize Pool</div>
                      <div className="font-semibold text-yellow-600">{selectedTournament.prize}</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="font-semibold">{selectedTournament.startDate} - {selectedTournament.endDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="font-semibold">{selectedTournament.location}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-bold text-lg text-gray-800 mb-3">About Tournament</h3>
                <p className="text-gray-600 leading-relaxed">
                  Join us for an exciting cricket tournament featuring {selectedTournament.teams} competitive teams. 
                  This {selectedTournament.format} format tournament will showcase the best local cricket talent with 
                  matches scheduled from {selectedTournament.startDate} to {selectedTournament.endDate} at {selectedTournament.location}.
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-bold text-lg text-gray-800 mb-3">Tournament Rules</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-cricket-green-600 font-bold">•</span>
                    <span>Each match will be played in {selectedTournament.format} format</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-cricket-green-600 font-bold">•</span>
                    <span>Winning team gets 2 points, losing team gets 0 points</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-cricket-green-600 font-bold">•</span>
                    <span>Top 4 teams qualify for semi-finals</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-cricket-green-600 font-bold">•</span>
                    <span>Net run rate will be used as tie-breaker</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedTournament(null)}
                  className="px-8 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Close
                </button>
                {selectedTournament.status === "upcoming" && (
                  <button 
                    onClick={() => {
                      setShowRegistrationModal(true);
                    }}
                    className="px-8 py-3 bg-cricket-green-600 hover:bg-cricket-green-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Register Team
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Registration Modal - Full Screen */}
      {showRegistrationModal && selectedTournament && (
        <div className="fixed inset-0 bg-white z-[60] overflow-y-auto animate-in fade-in duration-200">
          <div className="min-h-screen">
            <div className="bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 p-6 flex items-center justify-between sticky top-0 z-10 shadow-lg">
              <div className="flex items-center space-x-3">
                <Trophy className="w-8 h-8 text-white" />
                <h2 className="text-2xl font-bold text-white">Register Your Team</h2>
              </div>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="max-w-3xl mx-auto p-6 sm:p-8 lg:p-12 space-y-8">
              <div className="bg-gradient-to-r from-cricket-green-50 to-cricket-blue-50 p-4 rounded-lg border border-cricket-green-200">
                <h3 className="font-bold text-gray-800 mb-1">{selectedTournament.name}</h3>
                <p className="text-sm text-gray-600">{selectedTournament.format} • {selectedTournament.startDate}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Team</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent">
                  <option value="">Choose a team...</option>
                  <option value="team1">Thunder Bolts</option>
                  <option value="team2">Lightning Stars</option>
                  <option value="team3">Storm Riders</option>
                  <option value="team4">Phoenix Blazers</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Captain</label>
                <input
                  type="text"
                  placeholder="Captain's name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="team@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  rows={3}
                  placeholder="Any special requirements or notes..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Award className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold mb-1">Registration Fee: $100</p>
                    <p>Payment details will be sent via email after registration.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-cricket-green-600 border-gray-300 rounded focus:ring-cricket-green-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the tournament rules and regulations
                </label>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-4">
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('Registration successful! You will receive a confirmation email shortly.');
                    setShowRegistrationModal(false);
                    setSelectedTournament(null);
                  }}
                  className="px-6 py-3 bg-cricket-green-600 hover:bg-cricket-green-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Complete Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Tournament Modal - Full Screen */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto animate-in fade-in duration-200">
          <div className="min-h-screen">
            <div className="bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 p-6 flex items-center justify-between sticky top-0 z-10 shadow-lg">
              <div className="flex items-center space-x-3">
                <Trophy className="w-8 h-8 text-white" />
                <h2 className="text-2xl font-bold text-white">Create Tournament</h2>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="max-w-4xl mx-auto p-6 sm:p-8 lg:p-12 space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tournament Name</label>
                <input
                  type="text"
                  placeholder="e.g., Summer Cricket Championship"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent">
                    <option value="t20">T20</option>
                    <option value="t10">T10</option>
                    <option value="odi">ODI</option>
                    <option value="test">Test</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Teams</label>
                  <input
                    type="number"
                    min="4"
                    max="16"
                    defaultValue="8"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="e.g., Central Stadium"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prize Pool</label>
                <input
                  type="text"
                  placeholder="e.g., $5,000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={4}
                  placeholder="Tournament description and rules..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-4 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button className="px-6 py-3 bg-cricket-green-600 hover:bg-cricket-green-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                  Create Tournament
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
