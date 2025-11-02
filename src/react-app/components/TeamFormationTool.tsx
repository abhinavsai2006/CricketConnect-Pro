import { useState } from "react";
import { X, Save, Share2, Users, TrendingUp, TrendingDown, Trophy, Target, List } from "lucide-react";

interface Player {
  id: number;
  name: string;
  role: "batsman" | "bowler" | "all-rounder" | "wicket-keeper";
  battingOrder?: number;
  bowlingOrder?: number;
}

interface FormationPlayer {
  id: number;
  name: string;
  role: string;
  position: { x: number; y: number };
}

interface TeamFormationProps {
  teamId: number;
  teamName: string;
  players: Player[];
  onClose: () => void;
}

export default function TeamFormationTool({ teamName, players, onClose }: TeamFormationProps) {
  const [activeTab, setActiveTab] = useState<"field" | "batting" | "bowling">("field");
  const [formationPlayers, setFormationPlayers] = useState<FormationPlayer[]>(
    players.slice(0, 11).map((p, i) => ({
      id: p.id,
      name: p.name,
      role: p.role,
      position: getDefaultPosition(i),
    }))
  );
  const [battingOrder, setBattingOrder] = useState<Player[]>(players.slice(0, 11));
  const [bowlingOrder, setBowlingOrder] = useState<Player[]>(
    players.slice(0, 11).filter(p => p.role === "bowler" || p.role === "all-rounder")
  );
  const [draggedPlayer, setDraggedPlayer] = useState<FormationPlayer | null>(null);
  const [savedFormations] = useState<string[]>(["4-3-3 Balanced", "3-4-4 Aggressive"]);

  function getDefaultPosition(index: number): { x: number; y: number } {
    // Default 4-3-4 formation positions (percentages)
    const positions = [
      { x: 50, y: 5 },   // Wicket-keeper
      { x: 30, y: 20 },  // Slip 1
      { x: 70, y: 20 },  // Slip 2
      { x: 15, y: 35 },  // Point
      { x: 85, y: 35 },  // Cover
      { x: 50, y: 40 },  // Mid-wicket
      { x: 30, y: 55 },  // Mid-on
      { x: 70, y: 55 },  // Mid-off
      { x: 10, y: 75 },  // Fine leg
      { x: 90, y: 75 },  // Third man
      { x: 50, y: 85 },  // Bowler
    ];
    return positions[index] || { x: 50, y: 50 };
  }

  const handleDragStart = (player: FormationPlayer) => {
    setDraggedPlayer(player);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedPlayer) return;

    const fieldRect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - fieldRect.left) / fieldRect.width) * 100;
    const y = ((e.clientY - fieldRect.top) / fieldRect.height) * 100;

    setFormationPlayers(prev =>
      prev.map(p =>
        p.id === draggedPlayer.id ? { ...p, position: { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) } } : p
      )
    );
    setDraggedPlayer(null);
  };

  const moveBattingOrder = (index: number, direction: "up" | "down") => {
    const newOrder = [...battingOrder];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
    setBattingOrder(newOrder);
  };

  const moveBowlingOrder = (index: number, direction: "up" | "down") => {
    const newOrder = [...bowlingOrder];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
    setBowlingOrder(newOrder);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "batsman":
        return "bg-blue-500";
      case "bowler":
        return "bg-red-500";
      case "all-rounder":
        return "bg-purple-500";
      case "wicket-keeper":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "batsman":
        return "🏏";
      case "bowler":
        return "⚾";
      case "all-rounder":
        return "⭐";
      case "wicket-keeper":
        return "🧤";
      default:
        return "👤";
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto animate-in fade-in duration-200">
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 p-4 sm:p-6 flex items-center justify-between sticky top-0 z-10 shadow-lg">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-2xl font-bold text-white mb-0 sm:mb-1 truncate">{teamName} - Formation</h2>
            <p className="text-sm sm:text-base text-white/80 hidden sm:block">Plan your team lineup and batting/bowling order</p>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-3">
            <button className="bg-white/20 hover:bg-white/30 active:bg-white/40 text-white px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1 sm:space-x-2 touch-manipulation">
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </button>
            <button className="hidden sm:flex bg-white/20 hover:bg-white/30 active:bg-white/40 text-white px-4 py-2 rounded-lg transition-all duration-200 items-center space-x-2 touch-manipulation">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200 touch-manipulation"
              aria-label="Close formation tool"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-3 sm:p-6 lg:p-12">
          {/* Tab Navigation */}
          <div className="flex space-x-1 sm:space-x-2 mb-4 sm:mb-6 border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab("field")}
              className={`px-3 sm:px-6 py-2 sm:py-3 font-medium transition-all duration-200 flex items-center space-x-1 sm:space-x-2 whitespace-nowrap touch-manipulation ${
                activeTab === "field"
                  ? "text-cricket-green-700 border-b-2 border-cricket-green-700"
                  : "text-gray-600 hover:text-cricket-green-600 active:text-cricket-green-700"
              }`}
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Field</span>
            </button>
            <button
              onClick={() => setActiveTab("batting")}
              className={`px-3 sm:px-6 py-2 sm:py-3 font-medium transition-all duration-200 flex items-center space-x-1 sm:space-x-2 whitespace-nowrap touch-manipulation ${
                activeTab === "batting"
                  ? "text-cricket-green-700 border-b-2 border-cricket-green-700"
                  : "text-gray-600 hover:text-cricket-green-600 active:text-cricket-green-700"
              }`}
            >
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Batting Order</span>
            </button>
            <button
              onClick={() => setActiveTab("bowling")}
              className={`px-6 py-3 font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === "bowling"
                  ? "text-cricket-green-700 border-b-2 border-cricket-green-700"
                  : "text-gray-600 hover:text-cricket-green-600"
              }`}
            >
              <Target className="w-5 h-5" />
              <span>Bowling Order</span>
            </button>
          </div>

          {/* Field Placement Tab */}
          {activeTab === "field" && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Cricket Field */}
              <div className="lg:col-span-2">
                <div className="cricket-card p-4">
                  <h3 className="font-semibold text-lg mb-4 text-gray-800">Drag players to position them on the field</h3>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="relative w-full aspect-[4/5] bg-gradient-to-b from-green-500 to-green-600 rounded-2xl shadow-inner overflow-hidden"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 50% 95%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                        linear-gradient(225deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                        linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                        linear-gradient(315deg, rgba(255,255,255,0.1) 25%, transparent 25%)
                      `,
                      backgroundSize: '100% 100%, 40px 40px, 40px 40px, 40px 40px, 40px 40px',
                      backgroundPosition: 'center, 0 0, 0 0, 0 0, 0 0',
                    }}
                  >
                    {/* Pitch */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-48 bg-yellow-100 border-4 border-white rounded-lg opacity-80"></div>
                    
                    {/* Wickets */}
                    <div className="absolute left-1/2 top-[40%] -translate-x-1/2 w-2 h-6 bg-white rounded-full"></div>
                    <div className="absolute left-1/2 top-[60%] -translate-x-1/2 w-2 h-6 bg-white rounded-full"></div>
                    
                    {/* Boundary */}
                    <div className="absolute inset-4 border-4 border-white/30 rounded-full"></div>
                    
                    {/* Players */}
                    {formationPlayers.map((player) => (
                      <div
                        key={player.id}
                        draggable
                        onDragStart={() => handleDragStart(player)}
                        style={{
                          left: `${player.position.x}%`,
                          top: `${player.position.y}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        className="absolute cursor-move group"
                      >
                        <div className={`${getRoleColor(player.role)} text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform duration-200 border-2 border-white`}>
                          <span className="text-xl">{getRoleIcon(player.role)}</span>
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                          {player.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Saved Formations & Legend */}
              <div className="space-y-6">
                {/* Saved Formations */}
                <div className="cricket-card p-4">
                  <h3 className="font-semibold text-lg mb-4 text-gray-800 flex items-center space-x-2">
                    <List className="w-5 h-5 text-cricket-green-600" />
                    <span>Saved Formations</span>
                  </h3>
                  <div className="space-y-2">
                    {savedFormations.map((formation, index) => (
                      <button
                        key={index}
                        className="w-full p-3 text-left bg-gradient-to-r from-cricket-green-50 to-cricket-blue-50 hover:from-cricket-green-100 hover:to-cricket-blue-100 rounded-lg transition-all duration-200 border border-cricket-green-200"
                      >
                        <div className="font-medium text-gray-800">{formation}</div>
                        <div className="text-xs text-gray-500 mt-1">Click to load</div>
                      </button>
                    ))}
                    <button className="w-full p-3 border-2 border-dashed border-cricket-green-300 hover:border-cricket-green-500 rounded-lg text-cricket-green-600 font-medium transition-all duration-200">
                      + Save Current Formation
                    </button>
                  </div>
                </div>

                {/* Role Legend */}
                <div className="cricket-card p-4">
                  <h3 className="font-semibold text-lg mb-4 text-gray-800">Player Roles</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-xl">🏏</div>
                      <span className="text-gray-700 font-medium">Batsman</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-xl">⚾</div>
                      <span className="text-gray-700 font-medium">Bowler</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-xl">⭐</div>
                      <span className="text-gray-700 font-medium">All-rounder</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl">🧤</div>
                      <span className="text-gray-700 font-medium">Wicket-keeper</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Batting Order Tab */}
          {activeTab === "batting" && (
            <div className="max-w-3xl mx-auto">
              <div className="cricket-card p-6">
                <h3 className="font-semibold text-lg mb-6 text-gray-800 flex items-center space-x-2">
                  <Trophy className="w-6 h-6 text-cricket-green-600" />
                  <span>Batting Order</span>
                </h3>
                <div className="space-y-2">
                  {battingOrder.map((player, index) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:border-cricket-green-300 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-cricket-green-600 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{player.name}</div>
                          <div className="text-sm text-gray-500 capitalize">{player.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => moveBattingOrder(index, "up")}
                          disabled={index === 0}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            index === 0
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-cricket-green-600 hover:bg-cricket-green-50"
                          }`}
                        >
                          <TrendingUp className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => moveBattingOrder(index, "down")}
                          disabled={index === battingOrder.length - 1}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            index === battingOrder.length - 1
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-cricket-green-600 hover:bg-cricket-green-50"
                          }`}
                        >
                          <TrendingDown className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bowling Order Tab */}
          {activeTab === "bowling" && (
            <div className="max-w-3xl mx-auto">
              <div className="cricket-card p-6">
                <h3 className="font-semibold text-lg mb-6 text-gray-800 flex items-center space-x-2">
                  <Target className="w-6 h-6 text-cricket-blue-600" />
                  <span>Bowling Order</span>
                </h3>
                <div className="space-y-2">
                  {bowlingOrder.map((player, index) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:border-cricket-blue-300 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-cricket-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{player.name}</div>
                          <div className="text-sm text-gray-500 capitalize">{player.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => moveBowlingOrder(index, "up")}
                          disabled={index === 0}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            index === 0
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-cricket-blue-600 hover:bg-cricket-blue-50"
                          }`}
                        >
                          <TrendingUp className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => moveBowlingOrder(index, "down")}
                          disabled={index === bowlingOrder.length - 1}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            index === bowlingOrder.length - 1
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-cricket-blue-600 hover:bg-cricket-blue-50"
                          }`}
                        >
                          <TrendingDown className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
