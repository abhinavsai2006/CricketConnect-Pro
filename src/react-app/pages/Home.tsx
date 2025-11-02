import { useAuth } from "@getmocha/users-service/react";
import { Trophy, Users, Calendar, MapPin, Star, TrendingUp, Mail, Activity, Target, Clock, Zap, Award, ArrowUpRight, PlayCircle, Menu } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { useScrollAnimation, useCountUpAnimation } from "@/react-app/hooks/useScrollAnimation";
import MobileSidebar from "@/react-app/components/MobileSidebar";

export default function Home() {
  const { user } = useAuth();
  const [showDashboard] = useState(
    sessionStorage.getItem('showDashboard') === 'true'
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize scroll animations
  useScrollAnimation();
  useCountUpAnimation();

  // Dashboard stats
  const [stats] = useState({
    totalPlayers: 24,
    activeTeams: 3,
    upcomingMatches: 5,
    groundsBooked: 12,
    winRate: 67,
    lastWeekMatches: 3,
    lastWeekWins: 2,
    totalMatches: 42,
    totalWins: 28
  });

  // No longer using fake login - redirecting to login page

  // Show landing page by default, dashboard only when explicitly requested
  if (!showDashboard) {
    return (
      <div className="min-h-screen particles-bg">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-cricket-green-50 to-white py-16 px-4 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-cricket-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-cricket-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="mb-12">
              <div className="w-24 h-24 cricket-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl bounce-in glow-pulse">
                <Trophy className="w-12 h-12 text-white swing" />
              </div>
              <h1 className="font-heading text-5xl md:text-7xl font-bold bg-gradient-to-r from-cricket-green-700 via-cricket-green-600 to-cricket-blue-600 bg-clip-text text-transparent mb-6 fade-in-down">
                CricketConnect Pro
              </h1>
              <p className="text-2xl text-gray-700 mb-4 max-w-3xl mx-auto fade-in-up stagger-1">
                The Complete Cricket Team Management Ecosystem
              </p>
              <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto fade-in-up stagger-2">
                Connect with players, build dream teams, book premium grounds, and manage everything from match scheduling to real-time team communication - all in one powerful platform.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center space-x-2 slide-in-left stagger-2 hover:scale-105 transition-transform duration-300">
                  <Users className="w-5 h-5 text-cricket-green-600 wiggle" />
                  <span className="text-gray-700">Perfect for Team Captains</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center space-x-2 slide-in-bottom stagger-3 hover:scale-105 transition-transform duration-300">
                  <Trophy className="w-5 h-5 text-cricket-green-600 bounce-slow" />
                  <span className="text-gray-700">Ideal for Club Managers</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center space-x-2 slide-in-right stagger-4 hover:scale-105 transition-transform duration-300">
                  <Calendar className="w-5 h-5 text-cricket-green-600 wiggle" />
                  <span className="text-gray-700">Great for Tournament Organizers</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link
                  to="/signup"
                  className="cricket-btn-primary text-lg px-8 py-4 rounded-xl font-semibold glow-pulse zoom-in stagger-3 flex items-center space-x-2 min-w-[200px] relative overflow-hidden group"
                >
                  <span className="relative z-10">Get Started Free</span>
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center relative z-10">
                    <Star className="w-4 h-4" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 group-hover:animate-[shimmer_0.8s]"></div>
                </Link>
                <a href="#demo-video" className="cricket-btn-secondary text-lg px-8 py-4 rounded-xl font-semibold zoom-in stagger-4 flex items-center space-x-2 min-w-[200px] hover:shadow-2xl transition-all duration-300">
                  <span>Watch Demo</span>
                  <div className="w-6 h-6 bg-cricket-green-100 rounded-full flex items-center justify-center">
                    <PlayCircle className="w-4 h-4 text-cricket-green-600" />
                  </div>
                </a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="cricket-card-dark p-6 text-center hover-lift hover-glow-strong transition-all duration-300 scroll-fade-in relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cricket-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-4xl font-bold text-cricket-green-600 mb-1 relative z-10">
                    <span className="counter-value" data-target="5000" data-suffix="+">0</span>
                  </div>
                  <div className="text-sm text-gray-600 relative z-10">Active Players</div>
                  <div className="text-xs text-cricket-green-600 mt-1 relative z-10">Growing Daily</div>
                  <div className="mt-2 text-xs bg-cricket-green-50 text-cricket-green-700 px-2 py-1 rounded-full inline-block relative z-10">
                    25% monthly growth
                  </div>
                </div>
                <div className="cricket-card-dark p-6 text-center hover-lift hover-glow-strong transition-all duration-300 scroll-fade-in relative overflow-hidden group" style={{transitionDelay: '0.1s'}}>
                  <div className="absolute inset-0 bg-gradient-to-br from-cricket-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-4xl font-bold text-cricket-blue-600 mb-1 relative z-10">
                    <span className="counter-value" data-target="750" data-suffix="+">0</span>
                  </div>
                  <div className="text-sm text-gray-600 relative z-10">Teams Formed</div>
                  <div className="text-xs text-cricket-blue-600 mt-1 relative z-10">Active Teams</div>
                  <div className="mt-2 text-xs bg-cricket-blue-50 text-cricket-blue-700 px-2 py-1 rounded-full inline-block relative z-10">
                    98% retention rate
                  </div>
                </div>
                <div className="cricket-card-dark p-6 text-center hover-lift hover-glow-strong transition-all duration-300 scroll-fade-in relative overflow-hidden group" style={{transitionDelay: '0.2s'}}>
                  <div className="absolute inset-0 bg-gradient-to-br from-cricket-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-4xl font-bold text-cricket-green-600 mb-1 relative z-10">
                    <span className="counter-value" data-target="200" data-suffix="+">0</span>
                  </div>
                  <div className="text-sm text-gray-600 relative z-10">Premium Grounds</div>
                  <div className="text-xs text-cricket-green-600 mt-1 relative z-10">Verified Venues</div>
                  <div className="mt-2 text-xs bg-cricket-green-50 text-cricket-green-700 px-2 py-1 rounded-full inline-block relative z-10">
                    4.8/5 avg rating
                  </div>
                </div>
                <div className="cricket-card-dark p-6 text-center hover-lift hover-glow-strong transition-all duration-300 scroll-fade-in relative overflow-hidden group" style={{transitionDelay: '0.3s'}}>
                  <div className="absolute inset-0 bg-gradient-to-br from-cricket-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-4xl font-bold text-cricket-blue-600 mb-1 relative z-10">
                    <span className="counter-value" data-target="2500" data-suffix="+">0</span>
                  </div>
                  <div className="text-sm text-gray-600 relative z-10">Matches Organized</div>
                  <div className="text-xs text-cricket-blue-600 mt-1 relative z-10">Successful Games</div>
                  <div className="mt-2 text-xs bg-cricket-blue-50 text-cricket-blue-700 px-2 py-1 rounded-full inline-block relative z-10">
                    100+ weekly games
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-8 mb-12">
                <Link
                  to="/signup"
                  className="cricket-btn-primary text-lg px-8 py-4 rounded-xl font-semibold pulse-glow scale-in flex items-center space-x-3 min-w-[200px]"
                  style={{animationDelay: '0.4s'}}
                >
                  <span>Start Free Trial</span>
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4" />
                  </div>
                </Link>
                <a href="#demo-video" className="cricket-btn-secondary text-lg px-8 py-4 rounded-xl font-semibold scale-in flex items-center space-x-3 min-w-[200px]">
                  <span>Watch Success Stories</span>
                  <div className="w-6 h-6 bg-cricket-green-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-cricket-green-600" />
                  </div>
                </a>
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="py-16 bg-gradient-to-br from-white to-cricket-green-50 rounded-3xl mb-16 px-8 relative overflow-hidden scroll-fade-in">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cricket-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-slow"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cricket-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-slow" style={{animationDelay: '1s'}}></div>
              
              <div className="text-center mb-12 relative z-10">
                <div className="inline-block bg-cricket-green-100 text-cricket-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 scroll-scale-in">
                  WHY CHOOSE US
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 scroll-fade-in">
                  The Ultimate Cricket Management Solution
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto scroll-fade-in">
                  Experience seamless team management with industry-leading tools designed specifically for cricket teams
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 relative z-10">
                <div className="cricket-card-light p-6 text-center hover-lift group scroll-slide-left relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cricket-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-16 h-16 bg-gradient-to-br from-cricket-green-500 to-cricket-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg glow-pulse">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 relative z-10">Advanced Player Search</h4>
                  <p className="text-sm text-gray-600 relative z-10">Filter by position, batting/bowling style, experience, rating & location</p>
                </div>
                <div className="cricket-card-light p-6 text-center hover-lift group scroll-fade-in relative overflow-hidden" style={{transitionDelay: '0.1s'}}>
                  <div className="absolute inset-0 bg-gradient-to-br from-cricket-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-16 h-16 bg-gradient-to-br from-cricket-blue-500 to-cricket-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg glow-pulse">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 relative z-10">Ground Booking System</h4>
                  <p className="text-sm text-gray-600 relative z-10">Real-time availability, secure payments & instant confirmation</p>
                </div>
                <div className="cricket-card-light p-6 text-center hover-lift group scroll-fade-in relative overflow-hidden" style={{transitionDelay: '0.2s'}}>
                  <div className="absolute inset-0 bg-gradient-to-br from-cricket-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-16 h-16 bg-gradient-to-br from-cricket-green-500 to-cricket-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg glow-pulse">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 relative z-10">Team Chat & Messaging</h4>
                  <p className="text-sm text-gray-600 relative z-10">Direct messages and team group chats with real-time communication</p>
                </div>
                <div className="cricket-card-light p-6 text-center hover-lift group scroll-slide-right relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cricket-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-16 h-16 bg-gradient-to-br from-cricket-blue-500 to-cricket-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg glow-pulse">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 relative z-10">Complete Team Management</h4>
                  <p className="text-sm text-gray-600 relative z-10">Create teams, manage rosters, handle join requests & track performance</p>
                </div>
              </div>
            </div>

            {/* Core Features Section */}
            <div className="py-16">
              <div className="text-center mb-12 scroll-fade-in">
                <div className="inline-block bg-cricket-blue-100 text-cricket-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  CORE FEATURES
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Powerful Features for Cricket Teams</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Everything you need to manage your cricket team effectively, all in one platform
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="cricket-card-dark p-8 hover-lift transition-all duration-300 scroll-slide-left">
                  <div className="w-16 h-16 cricket-gradient rounded-xl flex items-center justify-center mb-6">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-4">Player Discovery & Profiles</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-cricket-green-100 flex-shrink-0 flex items-center justify-center mt-1">
                        <Star className="w-3 h-3 text-cricket-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Multi-Filter Player Search</p>
                        <p className="text-sm text-gray-600">Search by position, batting/bowling style, experience level, rating, and location</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-cricket-green-100 flex-shrink-0 flex items-center justify-center mt-1">
                        <Star className="w-3 h-3 text-cricket-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Detailed Player Profiles</p>
                        <p className="text-sm text-gray-600">View complete profiles with bio, stats, playing style & rating history</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-cricket-green-100 flex-shrink-0 flex items-center justify-center mt-1">
                        <Star className="w-3 h-3 text-cricket-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Availability Status</p>
                        <p className="text-sm text-gray-600">Real-time availability indicators to find players ready to join</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="cricket-card-dark p-8 hover-lift transition-all duration-300 scroll-fade-in" style={{transitionDelay: '0.1s'}}>
                  <div className="w-16 h-16 cricket-gradient-alt rounded-xl flex items-center justify-center mb-6">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-4">Team Creation & Management</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-cricket-blue-100 flex-shrink-0 flex items-center justify-center mt-1">
                        <Star className="w-3 h-3 text-cricket-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Create & Customize Teams</p>
                        <p className="text-sm text-gray-600">Build teams with custom names, descriptions, locations & player limits</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-cricket-blue-100 flex-shrink-0 flex items-center justify-center mt-1">
                        <Star className="w-3 h-3 text-cricket-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Join Request Management</p>
                        <p className="text-sm text-gray-600">Review and approve player requests with detailed profiles & messages</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-cricket-blue-100 flex-shrink-0 flex items-center justify-center mt-1">
                        <Star className="w-3 h-3 text-cricket-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Team Discovery</p>
                        <p className="text-sm text-gray-600">Browse available teams and send join requests as a player</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="cricket-card-dark p-8 hover-lift transition-all duration-300 scroll-slide-right">
                  <div className="w-16 h-16 cricket-gradient rounded-xl flex items-center justify-center mb-6">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-4">Smart Ground Booking</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-cricket-green-100 flex-shrink-0 flex items-center justify-center mt-1">
                        <Star className="w-3 h-3 text-cricket-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Time Slot Booking System</p>
                        <p className="text-sm text-gray-600">Select date, time (9 AM - 9 PM) and duration for your matches</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-cricket-green-100 flex-shrink-0 flex items-center justify-center mt-1">
                        <Star className="w-3 h-3 text-cricket-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Venue Details & Amenities</p>
                        <p className="text-sm text-gray-600">View ratings, reviews, pricing, parking, WiFi, food court & security info</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-cricket-green-100 flex-shrink-0 flex items-center justify-center mt-1">
                        <Star className="w-3 h-3 text-cricket-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Booking History & Tracking</p>
                        <p className="text-sm text-gray-600">View all past and upcoming bookings with payment confirmations</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* How It Works Section */}
              <div className="mb-16 bg-gradient-to-br from-cricket-blue-50 to-white rounded-3xl p-12">
                <div className="text-center mb-12 scroll-fade-in">
                  <div className="inline-block bg-cricket-green-100 text-cricket-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    HOW IT WORKS
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get Started in 3 Simple Steps</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Start managing your cricket team like a pro in minutes
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                  {/* Connection Line */}
                  <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-cricket-green-200 via-cricket-blue-200 to-cricket-green-200" style={{zIndex: 0}}></div>
                  
                  <div className="relative z-10 scroll-scale-in">
                    <div className="cricket-card-dark p-8 text-center hover-lift">
                      <div className="w-20 h-20 bg-gradient-to-br from-cricket-green-500 to-cricket-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-xl">
                        1
                      </div>
                      <h3 className="font-bold text-xl mb-3">Create Your Profile</h3>
                      <p className="text-gray-600 mb-4">Sign up and build your cricket profile with position, batting/bowling style, experience & location</p>
                      <div className="flex items-center justify-center space-x-2 text-sm text-cricket-green-600">
                        <Star className="w-4 h-4" />
                        <span className="font-medium">Quick 2-minute setup</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 scroll-scale-in" style={{transitionDelay: '0.1s'}}>
                    <div className="cricket-card-dark p-8 text-center hover-lift">
                      <div className="w-20 h-20 bg-gradient-to-br from-cricket-blue-500 to-cricket-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-xl">
                        2
                      </div>
                      <h3 className="font-bold text-xl mb-3">Build or Join Teams</h3>
                      <p className="text-gray-600 mb-4">Create your own team and recruit players, or browse teams looking for members and send join requests</p>
                      <div className="flex items-center justify-center space-x-2 text-sm text-cricket-blue-600">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">Connect with 5000+ players</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 scroll-scale-in" style={{transitionDelay: '0.2s'}}>
                    <div className="cricket-card-dark p-8 text-center hover-lift">
                      <div className="w-20 h-20 bg-gradient-to-br from-cricket-green-500 to-cricket-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-xl">
                        3
                      </div>
                      <h3 className="font-bold text-xl mb-3">Book Grounds & Communicate</h3>
                      <p className="text-gray-600 mb-4">Reserve grounds with real-time slots, coordinate via team chats, and track all your bookings</p>
                      <div className="flex items-center justify-center space-x-2 text-sm text-cricket-green-600">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">200+ grounds available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Features Section */}
              <div className="mb-16">
                <div className="text-center mb-12 scroll-fade-in">
                  <div className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    ⭐ PREMIUM FEATURES
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Unlock Advanced Capabilities</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Take your team management to the next level with our premium features
                  </p>
                </div>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="cricket-card p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-cricket-green-200 scroll-fade-in">
                    <div className="w-16 h-16 bg-gradient-to-br from-cricket-green-500 to-cricket-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Advanced Player Filters</h4>
                    <p className="text-sm text-gray-600 mb-3">Sort by rating, experience, style & custom criteria</p>
                    <div className="text-xs bg-cricket-green-50 text-cricket-green-700 px-3 py-1 rounded-full inline-block">
                      Find Perfect Match
                    </div>
                  </div>
                  <div className="cricket-card p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-cricket-blue-200 scroll-fade-in" style={{transitionDelay: '0.1s'}}>
                    <div className="w-16 h-16 bg-gradient-to-br from-cricket-blue-500 to-cricket-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Real-Time Messaging</h4>
                    <p className="text-sm text-gray-600 mb-3">Team chats, direct messages & instant notifications</p>
                    <div className="text-xs bg-cricket-blue-50 text-cricket-blue-700 px-3 py-1 rounded-full inline-block">
                      Stay Connected
                    </div>
                  </div>
                  <div className="cricket-card p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-cricket-green-200 scroll-fade-in" style={{transitionDelay: '0.2s'}}>
                    <div className="w-16 h-16 bg-gradient-to-br from-cricket-green-500 to-cricket-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Ground Favorites</h4>
                    <p className="text-sm text-gray-600 mb-3">Save & quick-book your preferred venues</p>
                    <div className="text-xs bg-cricket-green-50 text-cricket-green-700 px-3 py-1 rounded-full inline-block">
                      Quick Access
                    </div>
                  </div>
                  <div className="cricket-card p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-cricket-blue-200 scroll-fade-in" style={{transitionDelay: '0.3s'}}>
                    <div className="w-16 h-16 bg-gradient-to-br from-cricket-blue-500 to-cricket-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Multi-Team Management</h4>
                    <p className="text-sm text-gray-600 mb-3">Captain multiple teams simultaneously</p>
                    <div className="text-xs bg-cricket-blue-50 text-cricket-blue-700 px-3 py-1 rounded-full inline-block">
                      For Captains
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials Section */}
              <div className="mb-16 bg-gradient-to-br from-cricket-green-50 to-white rounded-3xl p-12">
                <div className="text-center mb-12 scroll-fade-in">
                  <div className="inline-block bg-cricket-blue-100 text-cricket-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    TESTIMONIALS
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Loved by Cricket Teams Worldwide</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    See what team captains and players are saying about CricketConnect Pro
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="cricket-card-dark p-8 hover-lift scroll-fade-in">
                    <div className="flex items-center mb-4">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">"CricketConnect Pro transformed how we manage our club. Finding players and booking grounds has never been easier!"</p>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cricket-green-400 to-cricket-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        RK
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">Rahul Kumar</div>
                        <div className="text-sm text-gray-600">Team Captain, Mumbai Warriors</div>
                      </div>
                    </div>
                  </div>

                  <div className="cricket-card-dark p-8 hover-lift scroll-fade-in" style={{transitionDelay: '0.1s'}}>
                    <div className="flex items-center mb-4">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">"The analytics feature helped us identify our strengths and weaknesses. We've won 80% of our matches this season!"</p>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cricket-blue-400 to-cricket-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        PS
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">Priya Sharma</div>
                        <div className="text-sm text-gray-600">Club Manager, Delhi Strikers</div>
                      </div>
                    </div>
                  </div>

                  <div className="cricket-card-dark p-8 hover-lift scroll-fade-in" style={{transitionDelay: '0.2s'}}>
                    <div className="flex items-center mb-4">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">"As a player, I love how easy it is to find teams and manage my availability. Highly recommend!"</p>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cricket-green-400 to-cricket-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        AM
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">Amit Mehta</div>
                        <div className="text-sm text-gray-600">All-Rounder, Bangalore Blasters</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mb-16 bg-gradient-to-br from-white via-cricket-blue-50 to-cricket-green-50 rounded-3xl p-8 md:p-12 shadow-xl">
                <div className="text-center mb-12 scroll-fade-in">
                  <div className="inline-block bg-cricket-green-100 text-cricket-green-700 px-5 py-2 rounded-full text-sm font-bold mb-6 shadow-md">
                    ❓ FAQ
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Everything you need to know about CricketConnect Pro
                  </p>
                </div>

                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
                  <div className="cricket-card p-7 hover-lift hover:shadow-2xl transition-all duration-300 border-l-4 border-cricket-green-500 group scroll-fade-in">
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-cricket-green-500 to-cricket-green-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-lg text-gray-800 group-hover:text-cricket-green-700 transition-colors duration-200">
                        How do I create and manage a team?
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed ml-11">
                      After creating your player profile, go to the Teams page and click "Create Team". Set your team name, location, max players, and description. You can then manage join requests, view team members, and coordinate through team chat.
                    </p>
                  </div>

                  <div className="cricket-card p-7 hover-lift hover:shadow-2xl transition-all duration-300 border-l-4 border-cricket-blue-500 group scroll-fade-in" style={{transitionDelay: '0.1s'}}>
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-cricket-blue-500 to-cricket-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-lg text-gray-800 group-hover:text-cricket-blue-700 transition-colors duration-200">
                        How does ground booking work?
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed ml-11">
                      Browse grounds by location and price, check ratings and amenities (parking, WiFi, food, security), select your preferred date and time slot (9 AM - 9 PM), choose duration, and complete secure payment. View booking history anytime.
                    </p>
                  </div>

                  <div className="cricket-card p-7 hover-lift hover:shadow-2xl transition-all duration-300 border-l-4 border-cricket-green-500 group scroll-fade-in" style={{transitionDelay: '0.2s'}}>
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-cricket-green-500 to-cricket-green-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-lg text-gray-800 group-hover:text-cricket-green-700 transition-colors duration-200">
                        How do I find players for my team?
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed ml-11">
                      Use our advanced player search to filter by position (batsman, bowler, all-rounder, wicket-keeper), batting/bowling style, experience level, rating, and location. View detailed profiles with bios and stats before sending invitations.
                    </p>
                  </div>

                  <div className="cricket-card p-7 hover-lift hover:shadow-2xl transition-all duration-300 border-l-4 border-cricket-blue-500 group scroll-fade-in" style={{transitionDelay: '0.3s'}}>
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-cricket-blue-500 to-cricket-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-lg text-gray-800 group-hover:text-cricket-blue-700 transition-colors duration-200">
                        Can I communicate with my team?
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed ml-11">
                      Yes! Each team has a dedicated group chat for coordination. You can also send direct messages to individual players. All messages are real-time with unread counters and timestamps.
                    </p>
                  </div>

                  <div className="cricket-card p-7 hover-lift hover:shadow-2xl transition-all duration-300 border-l-4 border-cricket-green-500 group scroll-fade-in" style={{transitionDelay: '0.4s'}}>
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-cricket-green-500 to-cricket-green-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Trophy className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-lg text-gray-800 group-hover:text-cricket-green-700 transition-colors duration-200">
                        What information is in player profiles?
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed ml-11">
                      Player profiles include name, position, batting style (left/right-hand), bowling style (fast, medium, spin), experience years, rating (out of 5), location, bio, and current availability status.
                    </p>
                  </div>

                  <div className="cricket-card p-7 hover-lift hover:shadow-2xl transition-all duration-300 border-l-4 border-cricket-blue-500 group scroll-fade-in" style={{transitionDelay: '0.5s'}}>
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-cricket-blue-500 to-cricket-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-lg text-gray-800 group-hover:text-cricket-blue-700 transition-colors duration-200">
                        Can I be part of multiple teams?
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed ml-11">
                      Absolutely! You can captain multiple teams, be a member of different teams, and switch between them easily. Manage all your teams from one dashboard.
                    </p>
                  </div>
                </div>

                {/* Additional Help Section */}
                <div className="mt-12 text-center">
                  <div className="cricket-card-light p-6 max-w-2xl mx-auto hover:shadow-xl transition-all duration-300">
                    <h4 className="font-bold text-lg text-gray-800 mb-3">Still have questions?</h4>
                    <p className="text-gray-600 mb-4">
                      Our support team is here to help you get started and answer any questions you may have.
                    </p>
                    <a 
                      href="mailto:support@cricketconnect.pro" 
                      className="cricket-btn-primary px-8 py-3 rounded-xl inline-flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Contact Support</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Final CTA Section */}
              <div className="max-w-4xl mx-auto text-center p-12 scroll-scale-in bg-gradient-to-br from-cricket-green-600 to-cricket-blue-600 rounded-3xl shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cricket-green-500 to-cricket-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 float-slow"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 float-slow" style={{animationDelay: '1.5s'}}></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 bounce-slow glow-pulse">
                    <Trophy className="w-10 h-10 text-white swing" />
                  </div>
                  <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-white fade-in-up">Ready to Transform Your Cricket Team?</h2>
                  <p className="text-xl text-white mb-8 max-w-2xl mx-auto fade-in-up stagger-1">
                    Join 5,000+ active players and 750+ teams already using CricketConnect Pro to manage their games and achieve success.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <Link
                      to="/signup"
                      className="bg-white text-cricket-green-600 hover:bg-cricket-green-50 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-110 shadow-xl flex items-center space-x-2 min-w-[220px] justify-center zoom-in stagger-2 relative overflow-hidden group/btn hover:shadow-2xl"
                    >
                      <span className="relative z-10">Start Free Trial</span>
                      <Star className="w-5 h-5 relative z-10 group-hover/btn:rotate-180 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-r from-cricket-green-50 to-cricket-blue-50 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                    <a 
                      href="mailto:support@cricketconnect.pro" 
                      className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 border-2 border-white/30 flex items-center space-x-2 min-w-[220px] justify-center zoom-in stagger-3 hover:scale-105 hover:border-white/50"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Contact Sales</span>
                    </a>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-8 text-white text-sm">
                    <div className="flex items-center space-x-2 fade-in-up stagger-4">
                      <Star className="w-4 h-4 text-white bounce-slow" />
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center space-x-2 fade-in-up stagger-5">
                      <Trophy className="w-4 h-4 text-white bounce-slow" />
                      <span>14-day free trial</span>
                    </div>
                    <div className="flex items-center space-x-2 fade-in-up stagger-6">
                      <Users className="w-4 h-4 text-white bounce-slow" />
                      <span>Cancel anytime</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Section */}
              <div className="mt-20 bg-gradient-to-br from-gray-50 to-cricket-green-50 rounded-3xl p-12">
                {/* Contact Info */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center mb-6">
                    <a 
                      href="mailto:support@cricketconnect.pro" 
                      className="cricket-card-light px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 inline-flex items-center space-x-3 group"
                    >
                      <Mail className="w-6 h-6 text-cricket-green-600 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-cricket-green-600 hover:text-cricket-green-700 font-bold text-xl">
                        support@cricketconnect.pro
                      </span>
                    </a>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
                    <a 
                      href="#" 
                      className="cricket-card-light px-6 py-3 rounded-xl text-gray-700 hover:text-cricket-green-600 hover:shadow-lg transition-all duration-300 font-semibold hover:-translate-y-1"
                    >
                      Twitter
                    </a>
                    <span className="text-gray-300 mx-2">•</span>
                    <a 
                      href="#" 
                      className="cricket-card-light px-6 py-3 rounded-xl text-gray-700 hover:text-cricket-green-600 hover:shadow-lg transition-all duration-300 font-semibold hover:-translate-y-1"
                    >
                      Facebook
                    </a>
                    <span className="text-gray-300 mx-2">•</span>
                    <a 
                      href="#" 
                      className="cricket-card-light px-6 py-3 rounded-xl text-gray-700 hover:text-cricket-green-600 hover:shadow-lg transition-all duration-300 font-semibold hover:-translate-y-1"
                    >
                      Instagram
                    </a>
                    <span className="text-gray-300 mx-2">•</span>
                    <a 
                      href="#" 
                      className="cricket-card-light px-6 py-3 rounded-xl text-gray-700 hover:text-cricket-green-600 hover:shadow-lg transition-all duration-300 font-semibold hover:-translate-y-1"
                    >
                      LinkedIn
                    </a>
                  </div>

                  {/* Features List */}
                  <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                    <div className="flex items-center space-x-2 bg-white/70 px-4 py-2 rounded-full">
                      <div className="w-2 h-2 bg-cricket-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">Available worldwide</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/70 px-4 py-2 rounded-full">
                      <div className="w-2 h-2 bg-cricket-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">24/7 Support</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/70 px-4 py-2 rounded-full">
                      <div className="w-2 h-2 bg-cricket-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">Regular Updates</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/70 px-4 py-2 rounded-full">
                      <div className="w-2 h-2 bg-cricket-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">Secure & Reliable</span>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    <div className="cricket-card p-5 flex flex-col items-center justify-center space-y-3 hover-lift hover:shadow-xl transition-all duration-300 group">
                      <div className="w-14 h-14 bg-gradient-to-br from-cricket-green-500 to-cricket-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Star className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-gray-800">Trusted by 750+</div>
                        <div className="text-xs text-gray-600">Active Teams</div>
                      </div>
                    </div>
                    
                    <div className="cricket-card p-5 flex flex-col items-center justify-center space-y-3 hover-lift hover:shadow-xl transition-all duration-300 group">
                      <div className="w-14 h-14 bg-gradient-to-br from-cricket-blue-500 to-cricket-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Trophy className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-gray-800">Performance</div>
                        <div className="text-xs text-gray-600">Driven Platform</div>
                      </div>
                    </div>
                    
                    <div className="cricket-card p-5 flex flex-col items-center justify-center space-y-3 hover-lift hover:shadow-xl transition-all duration-300 group">
                      <div className="w-14 h-14 bg-gradient-to-br from-cricket-green-500 to-cricket-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-gray-800">Community</div>
                        <div className="text-xs text-gray-600">Focused Support</div>
                      </div>
                    </div>
                    
                    <div className="cricket-card p-5 flex flex-col items-center justify-center space-y-3 hover-lift hover:shadow-xl transition-all duration-300 group">
                      <div className="w-14 h-14 bg-gradient-to-br from-cricket-blue-500 to-cricket-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <MapPin className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-gray-800">Global Network</div>
                        <div className="text-xs text-gray-600">Worldwide Access</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-600">
                    © 2025 CricketConnect Pro. All rights reserved. Built with ❤️ for cricket enthusiasts worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard view - only shown after user clicks "Get Started Free"
  return (
    <>
      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-20 md:pb-8 page-transition">
        {/* Hamburger Menu Button - Mobile Only */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="w-10 h-10 cricket-gradient rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 touch-manipulation"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Header Section */}
        <div className="mb-6 sm:mb-8 fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                Welcome back, {user?.google_user_data?.given_name || user?.email || "Demo"}!
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">Manage your cricket journey from your dashboard</p>
            </div>
            <div className="mt-3 sm:mt-0 flex items-center space-x-2">
              <div className="bg-gradient-to-r from-cricket-green-50 to-cricket-blue-50 px-3 py-1.5 rounded-full flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-gray-700">Online</span>
              </div>
            </div>
          </div>
        </div>

      {/* Quick Actions - Only 4 Important Cards - 2x2 on mobile, 4 cols on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <Link to="/players" className="cricket-card-enhanced p-4 sm:p-6 hover-lift hover-glow scale-in group relative overflow-hidden" style={{animationDelay: '0.1s'}}>
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 cricket-gradient rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex items-center space-x-1 bg-green-50 px-1.5 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3 text-green-600" />
              <span className="text-xs font-bold text-green-600">+12%</span>
            </div>
          </div>
          <h3 className="font-bold text-sm sm:text-base mb-1 text-gray-800">Discover Players</h3>
          <p className="text-xs text-gray-600 mb-2 sm:mb-3">Find talented cricketers</p>
          <div className="text-2xl sm:text-3xl font-bold text-cricket-green-700">{stats.totalPlayers}+</div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cricket-green-500 to-cricket-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </Link>

        <Link to="/teams" className="cricket-card-enhanced p-4 sm:p-6 hover-lift hover-glow scale-in group relative overflow-hidden" style={{animationDelay: '0.2s'}}>
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 cricket-gradient-alt rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex items-center space-x-1 bg-blue-50 px-1.5 py-0.5 rounded-full">
              <Activity className="w-3 h-3 text-blue-600" />
              <span className="text-xs font-bold text-blue-600">Active</span>
            </div>
          </div>
          <h3 className="font-bold text-sm sm:text-base mb-1 text-gray-800">My Teams</h3>
          <p className="text-xs text-gray-600 mb-2 sm:mb-3">Manage cricket teams</p>
          <div className="text-2xl sm:text-3xl font-bold text-cricket-blue-700">{stats.activeTeams}</div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cricket-blue-500 to-cricket-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </Link>

        <Link to="/grounds" className="cricket-card-enhanced p-4 sm:p-6 hover-lift hover-glow scale-in group relative overflow-hidden" style={{animationDelay: '0.3s'}}>
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex items-center space-x-1 bg-green-50 px-1.5 py-0.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-bold text-green-600">Live</span>
            </div>
          </div>
          <h3 className="font-bold text-sm sm:text-base mb-1 text-gray-800">Book Grounds</h3>
          <p className="text-xs text-gray-600 mb-2 sm:mb-3">Reserve premium venues</p>
          <div className="text-2xl sm:text-3xl font-bold text-orange-700">{stats.groundsBooked}</div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </Link>

        <Link to="/profile" className="cricket-card-enhanced p-4 sm:p-6 hover-lift hover-glow scale-in group relative overflow-hidden" style={{animationDelay: '0.4s'}}>
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex items-center space-x-1 bg-purple-50 px-1.5 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3 text-purple-600" />
              <span className="text-xs font-bold text-purple-600">Pro</span>
            </div>
          </div>
          <h3 className="font-bold text-sm sm:text-base mb-1 text-gray-800">My Profile</h3>
          <p className="text-xs text-gray-600 mb-2 sm:mb-3">Stats & achievements</p>
          <div className="text-2xl sm:text-3xl font-bold text-purple-700">{stats.winRate}%</div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 cricket-card-enhanced p-4 sm:p-6 slide-up" style={{animationDelay: '0.9s'}}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-800">Recent Activity</h3>
            <Link to="/feed" className="text-xs sm:text-sm text-cricket-green-600 hover:text-cricket-green-700 font-medium flex items-center space-x-1">
              <span>View All</span>
              <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <Link to="/teams" className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 glassmorphism rounded-xl hover-lift group cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 cricket-gradient rounded-lg sm:rounded-xl flex items-center justify-center pulse-glow group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm sm:text-base text-gray-800 group-hover:text-cricket-green-700 transition-colors duration-200 truncate">New player joined your team</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">2 hours ago • Thunder Bolts</p>
              </div>
              <div className="w-2 h-2 bg-cricket-green-500 rounded-full animate-pulse flex-shrink-0"></div>
            </Link>
            
            <Link to="/grounds" className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 glassmorphism rounded-xl hover-lift group cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 cricket-gradient-alt rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm sm:text-base text-gray-800 group-hover:text-cricket-blue-700 transition-colors duration-200 truncate">Match scheduled for this weekend</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">5 hours ago • Central Ground</p>
              </div>
            </Link>

            <Link to="/grounds" className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 glassmorphism rounded-xl hover-lift group cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm sm:text-base text-gray-800 group-hover:text-orange-700 transition-colors duration-200 truncate">Tournament registration open</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">1 day ago • Summer Championship</p>
              </div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse flex-shrink-0"></div>
            </Link>

            <Link to="/profile" className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 glassmorphism rounded-xl hover-lift group cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm sm:text-base text-gray-800 group-hover:text-purple-700 transition-colors duration-200 truncate">Achievement unlocked: Team Captain</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">2 days ago</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="cricket-card-enhanced p-4 sm:p-6 slide-up" style={{animationDelay: '1s'}}>
          <h3 className="font-heading font-bold text-lg sm:text-xl mb-4 sm:mb-6 text-gray-800">Performance</h3>
          <div className="space-y-4 sm:space-y-5">
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-700">Match Win Rate</span>
                <span className="text-sm sm:text-base font-bold text-cricket-green-700">{stats.winRate}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cricket-green-500 to-cricket-green-600 rounded-full transition-all duration-1000 ease-out"
                  style={{width: `${stats.winRate}%`}}
                ></div>
              </div>
            </div>

            <div className="p-3 sm:p-4 glassmorphism rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-700">Total Matches</span>
                <div className="flex items-center space-x-1">
                  <PlayCircle className="w-3 h-3 sm:w-4 sm:h-4 text-cricket-blue-600" />
                  <span className="text-base sm:text-lg font-bold text-gray-800">{stats.totalMatches}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Wins: {stats.totalWins}</span>
                <span>Loss: {stats.totalMatches - stats.totalWins}</span>
              </div>
            </div>

            <div className="p-3 sm:p-4 glassmorphism rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 cricket-gradient rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-gray-700">This Week</div>
                    <div className="text-xs text-gray-600">{stats.lastWeekMatches} matches</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base sm:text-lg font-bold text-gray-800">{stats.lastWeekWins}/{stats.lastWeekMatches}</div>
                  <div className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    <span>Won</span>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/profile" className="block w-full cricket-btn-primary text-sm sm:text-base py-2.5 sm:py-3 rounded-lg font-semibold hover-lift flex items-center justify-center space-x-2">
              <span>View Full Profile</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Upcoming Matches Section */}
      <div className="mt-6 sm:mt-8 cricket-card-enhanced p-4 sm:p-6 slide-up" style={{animationDelay: '1.1s'}}>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-800">Upcoming Matches</h3>
          <Link to="/teams" className="text-xs sm:text-sm text-cricket-green-600 hover:text-cricket-green-700 font-medium flex items-center space-x-1">
            <span>View All</span>
            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-4 glassmorphism rounded-xl hover-lift group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-cricket-green-100 text-cricket-green-700 text-xs px-2 py-1 rounded-full font-medium">Tomorrow</div>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <h4 className="font-bold text-sm sm:text-base mb-1 text-gray-800">Thunder Bolts vs Lightning</h4>
            <p className="text-xs text-gray-600 mb-2">Central Cricket Ground</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">10:00 AM</span>
              <span className="text-cricket-green-600 font-medium">T20 Match</span>
            </div>
          </div>

          <div className="p-4 glassmorphism rounded-xl hover-lift group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-cricket-blue-100 text-cricket-blue-700 text-xs px-2 py-1 rounded-full font-medium">Sat, Nov 4</div>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <h4 className="font-bold text-sm sm:text-base mb-1 text-gray-800">Practice Session</h4>
            <p className="text-xs text-gray-600 mb-2">City Sports Complex</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">6:00 PM</span>
              <span className="text-cricket-blue-600 font-medium">Net Practice</span>
            </div>
          </div>

          <div className="p-4 glassmorphism rounded-xl hover-lift group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium">Sun, Nov 5</div>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <h4 className="font-bold text-sm sm:text-base mb-1 text-gray-800">Warriors vs Strikers</h4>
            <p className="text-xs text-gray-600 mb-2">Stadium Arena</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">2:00 PM</span>
              <span className="text-orange-600 font-medium">ODI Match</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links - Only on Desktop */}
      <div className="hidden lg:grid grid-cols-4 gap-4 mt-8 slide-up" style={{animationDelay: '1.2s'}}>
        <Link to="/tournaments" className="cricket-card p-4 text-center hover-lift group">
          <div className="w-12 h-12 cricket-gradient rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-sm mb-1 text-gray-800">Tournaments</h4>
          <p className="text-xs text-gray-600">Join competitions</p>
        </Link>
        
        <Link to="/feed" className="cricket-card p-4 text-center hover-lift group">
          <div className="w-12 h-12 cricket-gradient-alt rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-sm mb-1 text-gray-800">Activity Feed</h4>
          <p className="text-xs text-gray-600">Latest updates</p>
        </Link>
        
        <Link to="/chat" className="cricket-card p-4 text-center hover-lift group">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-sm mb-1 text-gray-800">Team Chat</h4>
          <p className="text-xs text-gray-600">Stay connected</p>
        </Link>
        
        <Link to="/profile" className="cricket-card p-4 text-center hover-lift group">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-sm mb-1 text-gray-800">Achievements</h4>
          <p className="text-xs text-gray-600">Track progress</p>
        </Link>
      </div>
    </div>
    </>
  );
}
