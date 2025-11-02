import { useState, useEffect } from "react";
import { useAuth } from "@getmocha/users-service/react";
import { User, Edit, Save, X, Trophy, Star, Award, TrendingUp, Target, Zap, Calendar, BarChart3, Shield, Users } from "lucide-react";
import LoadingSpinner from "@/react-app/components/LoadingSpinner";

interface PlayerProfile {
  id: number;
  name: string;
  position: string;
  batting_style: string | null;
  bowling_style: string | null;
  experience_years: number;
  location: string | null;
  bio: string | null;
  rating: number;
}

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    batting_style: "",
    bowling_style: "",
    experience_years: 0,
    location: "",
    bio: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/players/me");
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setHasProfile(true);
        setFormData({
          name: data.name || "",
          position: data.position || "",
          batting_style: data.batting_style || "",
          bowling_style: data.bowling_style || "",
          experience_years: data.experience_years || 0,
          location: data.location || "",
          bio: data.bio || "",
        });
      } else if (response.status === 404) {
        setHasProfile(false);
        setIsEditing(true);
        setFormData({
          name: user?.google_user_data?.name || "",
          position: "",
          batting_style: "",
          bowling_style: "",
          experience_years: 0,
          location: "",
          bio: "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newProfile = await response.json();
        setProfile(newProfile);
        setHasProfile(true);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasProfile && profile) {
      setFormData({
        name: profile.name,
        position: profile.position,
        batting_style: profile.batting_style || "",
        bowling_style: profile.bowling_style || "",
        experience_years: profile.experience_years,
        location: profile.location || "",
        bio: profile.bio || "",
      });
    }
    setIsEditing(false);
  };

  const positions = [
    "Batsman", "Bowler", "All-rounder", "Wicket-keeper",
    "Opening Batsman", "Middle Order", "Finisher", "Spinner", "Fast Bowler"
  ];

  const battingStyles = ["Right-handed", "Left-handed"];
  const bowlingStyles = ["Right-arm Fast", "Left-arm Fast", "Right-arm Spin", "Left-arm Spin", "Wicket-keeper"];

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner text="Loading profile" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-20 md:pb-8 page-transition">
      {/* Profile Header Card */}
      <div className="cricket-card-enhanced p-4 sm:p-8 fade-in mb-6 sm:mb-8 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 cricket-gradient opacity-10"></div>
        
        {/* Header */}
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-0">
            {user?.google_user_data?.picture ? (
              <img
                src={user.google_user_data.picture}
                alt="Profile"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-cricket-green-200 shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 cricket-gradient rounded-full flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            )}
            <div>
              <h1 className="font-heading text-xl sm:text-3xl font-bold text-gray-800">
                {hasProfile ? formData.name || "Player Profile" : "Create Your Profile"}
              </h1>
              <p className="text-sm text-gray-600">{user?.email}</p>
              {hasProfile && (
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">Pro Player</span>
                </div>
              )}
            </div>
          </div>

          {hasProfile && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="cricket-btn-primary flex items-center space-x-2 py-2 px-4 text-sm sm:text-base"
            >
              <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        {/* Quick Stats - 2x2 on mobile */}
        {hasProfile && !isEditing && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 glassmorphism rounded-xl hover-lift">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 cricket-gradient rounded-lg flex items-center justify-center">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-800">{profile?.rating || 4.5}</div>
              <div className="text-xs text-gray-600">Player Rating</div>
            </div>

            <div className="p-3 sm:p-4 glassmorphism rounded-xl hover-lift">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 cricket-gradient-alt rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-800">42</div>
              <div className="text-xs text-gray-600">Matches Played</div>
            </div>

            <div className="p-3 sm:p-4 glassmorphism rounded-xl hover-lift">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-800">67%</div>
              <div className="text-xs text-gray-600">Win Rate</div>
            </div>

            <div className="p-3 sm:p-4 glassmorphism rounded-xl hover-lift">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-800">3</div>
              <div className="text-xs text-gray-600">Teams</div>
            </div>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Main Profile Form */}
        <div className="lg:col-span-2 cricket-card p-4 sm:p-6 fade-in"  style={{animationDelay: '0.1s'}}>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-gray-800 mb-6">
            {isEditing ? "Edit Profile Information" : "Profile Information"}
          </h2>

          {/* Form */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent disabled:bg-gray-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position *
            </label>
            <select
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent disabled:bg-gray-50"
              required
            >
              <option value="">Select position</option>
              {positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batting Style
            </label>
            <select
              value={formData.batting_style}
              onChange={(e) => setFormData({ ...formData, batting_style: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent disabled:bg-gray-50"
            >
              <option value="">Select batting style</option>
              {battingStyles.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bowling Style
            </label>
            <select
              value={formData.bowling_style}
              onChange={(e) => setFormData({ ...formData, bowling_style: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent disabled:bg-gray-50"
            >
              <option value="">Select bowling style</option>
              {bowlingStyles.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience (years)
            </label>
            <input
              type="number"
              min="0"
              value={formData.experience_years}
              onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) || 0 })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              disabled={!isEditing}
              placeholder="City, State/Country"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                disabled={!isEditing}
                placeholder="Tell others about your cricket journey, achievements, and playing style..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent disabled:bg-gray-50 text-sm"
              />
            </div>
          </div>

          {/* Action buttons */}
          {isEditing && (
            <div className="flex justify-end space-x-3 sm:space-x-4 mt-6 sm:mt-8">
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-4 sm:px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 text-sm"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !formData.name || !formData.position}
                className="cricket-btn-primary flex items-center space-x-2 disabled:opacity-50 text-sm"
              >
                {saving ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{saving ? "Saving..." : "Save Profile"}</span>
              </button>
            </div>
          )}
        </div>

        {/* Sidebar - Achievements & Performance */}
        <div className="space-y-6">
          {/* Achievements Card */}
          <div className="cricket-card p-4 sm:p-6 fade-in" style={{animationDelay: '0.2s'}}>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span>Achievements</span>
            </h3>
            <div className="space-y-3">
              <div className="p-3 glassmorphism rounded-lg hover-lift cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-800">Century Maker</div>
                    <div className="text-xs text-gray-600">Scored 100+ runs</div>
                  </div>
                </div>
              </div>

              <div className="p-3 glassmorphism rounded-lg hover-lift cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-800">Hat-trick Hero</div>
                    <div className="text-xs text-gray-600">3 wickets in 3 balls</div>
                  </div>
                </div>
              </div>

              <div className="p-3 glassmorphism rounded-lg hover-lift cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-800">Team Captain</div>
                    <div className="text-xs text-gray-600">Led team to victory</div>
                  </div>
                </div>
              </div>

              <div className="p-3 glassmorphism rounded-lg hover-lift cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-800">MVP Award</div>
                    <div className="text-xs text-gray-600">Man of the Match</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="cricket-card p-4 sm:p-6 fade-in" style={{animationDelay: '0.3s'}}>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-cricket-green-600" />
              <span>Recent Activity</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-cricket-green-500 mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-medium text-gray-800">Joined Thunder Bolts</div>
                  <div className="text-xs text-gray-500">2 days ago</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-medium text-gray-800">Completed match stats</div>
                  <div className="text-xs text-gray-500">5 days ago</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-medium text-gray-800">Unlocked new achievement</div>
                  <div className="text-xs text-gray-500">1 week ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          {hasProfile && !isEditing && (
            <div className="cricket-card p-4 sm:p-6 fade-in" style={{animationDelay: '0.4s'}}>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <span>Performance</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Batting</span>
                    <span className="font-bold text-orange-600">85%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Bowling</span>
                    <span className="font-bold text-cricket-blue-600">72%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cricket-blue-500 to-cricket-blue-600 rounded-full" style={{width: '72%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Fielding</span>
                    <span className="font-bold text-cricket-green-600">90%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cricket-green-500 to-cricket-green-600 rounded-full" style={{width: '90%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
