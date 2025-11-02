import { useState } from "react";
import { TrendingUp, Trophy, Users, Target, Calendar, Award, BarChart3, Activity } from "lucide-react";

export default function Statistics() {
  const [activeTab, setActiveTab] = useState<"team" | "personal">("personal");

  // Mock data - in real app this would come from API
  const personalStats = {
    matchesPlayed: 45,
    wins: 28,
    losses: 17,
    winRate: 62,
    runsScored: 1234,
    wicketsTaken: 23,
    avgScore: 27.4,
    highestScore: 89,
    bestBowling: "4/25",
  };

  const teamStats = {
    totalMatches: 52,
    wins: 31,
    losses: 18,
    draws: 3,
    winRate: 59.6,
    totalRuns: 6543,
    totalWickets: 189,
    avgScore: 125.8,
  };

  const recentMatches = [
    { id: 1, opponent: "Lightning Stars", result: "Won", score: "185/7 vs 178/8", date: "Oct 28, 2025" },
    { id: 2, opponent: "Storm Riders", result: "Lost", score: "142/9 vs 145/4", date: "Oct 21, 2025" },
    { id: 3, opponent: "Thunder Kings", result: "Won", score: "201/6 vs 198/8", date: "Oct 14, 2025" },
    { id: 4, opponent: "Phoenix Blazers", result: "Won", score: "167/5 vs 163/9", date: "Oct 7, 2025" },
    { id: 5, opponent: "Royal Warriors", result: "Lost", score: "134/10 vs 138/6", date: "Sep 30, 2025" },
  ];

  const performanceTrend = [
    { month: "Jun", wins: 4, losses: 2 },
    { month: "Jul", wins: 5, losses: 3 },
    { month: "Aug", wins: 6, losses: 2 },
    { month: "Sep", wins: 7, losses: 4 },
    { month: "Oct", wins: 8, losses: 6 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 page-transition">
      <div className="mb-8 fade-in">
        <h1 className="font-heading text-3xl font-bold text-gray-800 mb-2">Statistics & Analytics</h1>
        <p className="text-gray-600">Track your performance and team progress</p>
      </div>

      {/* Tab Navigation */}
      <div className="cricket-card p-4 mb-8 slide-up">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("personal")}
            className={`flex items-center space-x-2 px-6 py-3 font-medium rounded-lg transition-all duration-200 ${
              activeTab === "personal"
                ? "bg-cricket-green-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-cricket-green-50"
            }`}
          >
            <Target className="w-5 h-5" />
            <span>Personal Stats</span>
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`flex items-center space-x-2 px-6 py-3 font-medium rounded-lg transition-all duration-200 ${
              activeTab === "team"
                ? "bg-cricket-blue-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-cricket-blue-50"
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Team Stats</span>
          </button>
        </div>
      </div>

      {activeTab === "personal" ? (
        <div className="space-y-8">
          {/* Personal Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="cricket-card p-6 hover-lift group">
              <div className="flex items-center justify-between mb-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🏏</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{personalStats.matchesPlayed}</div>
              <div className="text-sm text-gray-600">Matches Played</div>
            </div>

            <div className="cricket-card p-6 hover-lift group">
              <div className="flex items-center justify-between mb-3">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">{personalStats.winRate}%</div>
              <div className="text-sm text-gray-600">Win Rate</div>
              <div className="text-xs text-gray-500 mt-1">{personalStats.wins}W - {personalStats.losses}L</div>
            </div>

            <div className="cricket-card p-6 hover-lift group">
              <div className="flex items-center justify-between mb-3">
                <Activity className="w-8 h-8 text-cricket-blue-500" />
                <div className="w-12 h-12 bg-cricket-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🎯</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-cricket-blue-600 mb-1">{personalStats.runsScored}</div>
              <div className="text-sm text-gray-600">Total Runs</div>
              <div className="text-xs text-gray-500 mt-1">Avg: {personalStats.avgScore}</div>
            </div>

            <div className="cricket-card p-6 hover-lift group">
              <div className="flex items-center justify-between mb-3">
                <Target className="w-8 h-8 text-red-500" />
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🎳</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-red-600 mb-1">{personalStats.wicketsTaken}</div>
              <div className="text-sm text-gray-600">Wickets Taken</div>
              <div className="text-xs text-gray-500 mt-1">Best: {personalStats.bestBowling}</div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="cricket-card p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-cricket-green-600" />
              <span>Performance Trend</span>
            </h3>
            <div className="space-y-4">
              {performanceTrend.map((month) => (
                <div key={month.month}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{month.month}</span>
                    <span className="text-sm text-gray-500">{month.wins + month.losses} matches</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-end pr-2"
                        style={{ width: `${(month.wins / (month.wins + month.losses)) * 100}%` }}
                      >
                        <span className="text-white text-xs font-bold">{month.wins}W</span>
                      </div>
                      <div
                        className="absolute right-0 top-0 h-full bg-gradient-to-r from-red-400 to-red-500 flex items-center justify-start pl-2"
                        style={{ width: `${(month.losses / (month.wins + month.losses)) * 100}%` }}
                      >
                        <span className="text-white text-xs font-bold">{month.losses}L</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Highlights */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="cricket-card p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span>Career Best</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <span className="text-sm text-gray-600">Highest Score</span>
                  <span className="text-lg font-bold text-gray-800">{personalStats.highestScore} runs</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
                  <span className="text-sm text-gray-600">Best Bowling</span>
                  <span className="text-lg font-bold text-gray-800">{personalStats.bestBowling}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <span className="text-sm text-gray-600">Batting Average</span>
                  <span className="text-lg font-bold text-gray-800">{personalStats.avgScore}</span>
                </div>
              </div>
            </div>

            <div className="cricket-card p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-cricket-blue-600" />
                <span>Recent Matches</span>
              </h3>
              <div className="space-y-2">
                {recentMatches.slice(0, 5).map((match) => (
                  <div key={match.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-800">vs {match.opponent}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        match.result === "Won" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {match.result}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">{match.score}</div>
                    <div className="text-xs text-gray-400 mt-1">{match.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Team Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="cricket-card p-6 hover-lift group">
              <div className="flex items-center justify-between mb-3">
                <Trophy className="w-8 h-8 text-cricket-blue-500" />
                <div className="w-12 h-12 bg-cricket-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🏆</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{teamStats.totalMatches}</div>
              <div className="text-sm text-gray-600">Total Matches</div>
            </div>

            <div className="cricket-card p-6 hover-lift group">
              <div className="flex items-center justify-between mb-3">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📈</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">{teamStats.winRate.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Win Rate</div>
              <div className="text-xs text-gray-500 mt-1">{teamStats.wins}W - {teamStats.losses}L - {teamStats.draws}D</div>
            </div>

            <div className="cricket-card p-6 hover-lift group">
              <div className="flex items-center justify-between mb-3">
                <Activity className="w-8 h-8 text-orange-500" />
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">⚡</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-1">{teamStats.totalRuns}</div>
              <div className="text-sm text-gray-600">Total Runs</div>
              <div className="text-xs text-gray-500 mt-1">Avg: {teamStats.avgScore}</div>
            </div>

            <div className="cricket-card p-6 hover-lift group">
              <div className="flex items-center justify-between mb-3">
                <Target className="w-8 h-8 text-purple-500" />
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🎯</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">{teamStats.totalWickets}</div>
              <div className="text-sm text-gray-600">Total Wickets</div>
            </div>
          </div>

          {/* Team Match History */}
          <div className="cricket-card p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-cricket-blue-600" />
              <span>Match History</span>
            </h3>
            <div className="space-y-3">
              {recentMatches.map((match) => (
                <div key={match.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:border-cricket-blue-300 hover:shadow-md transition-all duration-200">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 mb-1">vs {match.opponent}</div>
                    <div className="text-sm text-gray-600">{match.score}</div>
                    <div className="text-xs text-gray-400 mt-1">{match.date}</div>
                  </div>
                  <div className={`px-4 py-2 rounded-full font-bold text-sm ${
                    match.result === "Won" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  }`}>
                    {match.result}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Performance Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="cricket-card p-6 text-center">
              <div className="text-4xl mb-2">🥇</div>
              <div className="text-2xl font-bold text-green-600 mb-1">{teamStats.wins}</div>
              <div className="text-sm text-gray-600">Victories</div>
            </div>
            <div className="cricket-card p-6 text-center">
              <div className="text-4xl mb-2">🔄</div>
              <div className="text-2xl font-bold text-gray-600 mb-1">{teamStats.draws}</div>
              <div className="text-sm text-gray-600">Draws</div>
            </div>
            <div className="cricket-card p-6 text-center">
              <div className="text-4xl mb-2">❌</div>
              <div className="text-2xl font-bold text-red-600 mb-1">{teamStats.losses}</div>
              <div className="text-sm text-gray-600">Defeats</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
