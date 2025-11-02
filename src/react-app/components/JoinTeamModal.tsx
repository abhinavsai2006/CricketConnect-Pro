import { useState } from "react";
import { X, Users, Send, MessageSquare, Trophy } from "lucide-react";

interface Team {
  id: number;
  name: string;
  description: string | null;
  captain_name?: string;
  location: string | null;
  max_players: number;
  member_count?: number;
  positions?: string[];
}

interface JoinTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: Team | null;
}

export default function JoinTeamModal({ isOpen, onClose, team }: JoinTeamModalProps) {
  const [message, setMessage] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [sending, setSending] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const positions = [
    "Batsman", "Bowler", "All-rounder", "Wicket-keeper",
    "Opening Batsman", "Middle Order", "Finisher", "Spinner", "Fast Bowler"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!team || sending) return;

    setSending(true);
    try {
      const response = await fetch("/api/teams/join-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team_id: team.id,
          position: selectedPosition,
          message: message.trim() || null,
        }),
      });

      if (response.ok) {
        setRequestSent(true);
      }
    } catch (error) {
      console.error("Error sending join request:", error);
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    setMessage("");
    setSelectedPosition("");
    setRequestSent(false);
    onClose();
  };

  if (!isOpen || !team) return null;

  if (requestSent) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto fade-in">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 cricket-gradient rounded-full flex items-center justify-center mx-auto mb-4 bounce-in">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Request Sent!</h3>
            <p className="text-gray-600 mb-6">
              Your join request has been sent to the team captain. You'll be notified when they respond.
            </p>
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
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Join Team</h3>
                <p className="text-white/80">{team.name}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 sm:p-8 lg:p-12">
          {/* Team Info */}
          <div className="cricket-card-dark p-4 mb-6">
            <h4 className="font-semibold mb-3">{team.name}</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Captain:</span>
                <span className="font-medium">{team.captain_name || "Unknown"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Location:</span>
                <span className="font-medium">{team.location || "Not specified"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Team Size:</span>
                <span className="font-medium">{team.member_count || 1}/{team.max_players} players</span>
              </div>
            </div>
            {team.description && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-700">{team.description}</p>
              </div>
            )}
          </div>

          {/* Position Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-1" />
              Your Position *
            </label>
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="">Select your position</option>
              {positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
          </div>

          {/* Looking for specific positions */}
          {team.positions && team.positions.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Team is looking for:</p>
              <div className="flex flex-wrap gap-2">
                {team.positions.map(position => (
                  <span 
                    key={position} 
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedPosition === position
                        ? 'bg-cricket-green-100 text-cricket-green-800 border-2 border-cricket-green-300'
                        : 'bg-cricket-blue-100 text-cricket-blue-800'
                    }`}
                  >
                    {position}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-1" />
              Message (Optional)
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Tell the team captain why you'd like to join and what you can bring to the team..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={sending || !selectedPosition}
              className="flex-1 cricket-btn-primary disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {sending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
