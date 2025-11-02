import { useState, useEffect } from "react";
import { X, ChevronRight, ChevronLeft, Check, Users, MapPin, Calendar, Trophy, Target } from "lucide-react";
import { useLocation } from "react-router";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  tip: string;
}

export default function OnboardingFlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Only show on dashboard (when showDashboard is true in sessionStorage)
    const showDashboard = sessionStorage.getItem('showDashboard') === 'true';
    const isOnHomePage = location.pathname === '/';
    
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding");
    
    // Show onboarding only on dashboard, not on landing page
    if (!hasCompletedOnboarding && isOnHomePage && showDashboard) {
      // Show onboarding after a short delay
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }
  }, [location.pathname]);

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Welcome to CricketConnect Pro!",
      description: "Your one-stop platform for managing cricket teams, booking grounds, and connecting with players. Let's take a quick tour!",
      icon: <Trophy className="w-12 h-12 text-yellow-500" />,
      tip: "Complete this tour to unlock all features",
    },
    {
      id: 2,
      title: "Discover Players",
      description: "Browse through our extensive player database. Use advanced filters to find players by role, skill level, and availability.",
      icon: <Users className="w-12 h-12 text-cricket-green-600" />,
      tip: "Click on any player to view their detailed profile",
    },
    {
      id: 3,
      title: "Create & Manage Teams",
      description: "Build your dream cricket team! Invite players, manage rosters, and use our formation tool to plan your strategy.",
      icon: <Calendar className="w-12 h-12 text-cricket-blue-600" />,
      tip: "Use drag-and-drop to arrange your field placements",
    },
    {
      id: 4,
      title: "Book Cricket Grounds",
      description: "Find and book premium cricket grounds near you. Check real-time availability with our interactive calendar.",
      icon: <MapPin className="w-12 h-12 text-red-600" />,
      tip: "Peak hours and weekends have premium pricing",
    },
    {
      id: 5,
      title: "Join Tournaments",
      description: "Participate in exciting tournaments! Track points tables, match schedules, and compete for glory.",
      icon: <Trophy className="w-12 h-12 text-purple-600" />,
      tip: "Create your own tournaments and invite teams",
    },
    {
      id: 6,
      title: "You're All Set!",
      description: "That's it! Start exploring CricketConnect Pro. You can access this tour anytime from your profile settings.",
      icon: <Target className="w-12 h-12 text-green-600" />,
      tip: "Happy cricketing! 🏏",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = () => {
    localStorage.setItem("hasCompletedOnboarding", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-cricket-green-100 to-cricket-blue-100 p-3 rounded-full">
              {currentStepData.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{currentStepData.title}</h2>
              <p className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
          </div>
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-gray-600 transition-colors touch-manipulation"
            aria-label="Skip onboarding"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">{currentStepData.description}</p>

          {/* Tip Box */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-r-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-500 text-white rounded-full p-1 flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Pro Tip</h4>
                <p className="text-sm text-gray-700">{currentStepData.tip}</p>
              </div>
            </div>
          </div>

          {/* Visual Guide - different for each step */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            {currentStep === 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <Users className="w-8 h-8 mx-auto mb-2 text-cricket-green-600" />
                  <p className="text-xs font-medium text-gray-700">Players</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-cricket-blue-600" />
                  <p className="text-xs font-medium text-gray-700">Teams</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-red-600" />
                  <p className="text-xs font-medium text-gray-700">Grounds</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-xs font-medium text-gray-700">Tournaments</p>
                </div>
              </div>
            )}
            {currentStep === 1 && (
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-2 bg-gray-100 rounded w-24"></div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 text-center">Sample player card preview</p>
              </div>
            )}
            {currentStep === 2 && (
              <div className="bg-gradient-to-br from-cricket-green-50 to-cricket-blue-50 p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <div key={i} className="bg-white rounded-full w-8 h-8 mx-auto flex items-center justify-center text-xs font-bold text-gray-700">
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-600 text-center">Interactive field formation editor</p>
              </div>
            )}
            {currentStep === 3 && (
              <div className="space-y-2">
                <div className="grid grid-cols-7 gap-1">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="aspect-square bg-white rounded text-xs flex items-center justify-center font-medium text-gray-700">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-600 text-center">Calendar view with time slots</p>
              </div>
            )}
            {currentStep === 4 && (
              <div className="space-y-2">
                <div className="bg-white p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-bold text-gray-700">Team A vs Team B</div>
                    <div className="text-xs text-gray-500">Today 5:00 PM</div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 w-3/4"></div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 text-center">Tournament match schedule</p>
              </div>
            )}
            {currentStep === 5 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to play! 🏏</h3>
                <p className="text-sm text-gray-600">Start exploring CricketConnect Pro</p>
              </div>
            )}
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center space-x-2 mb-6">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "bg-cricket-green-600 w-8"
                    : index < currentStep
                    ? "bg-cricket-green-400"
                    : "bg-gray-300"
                }`}
                aria-label={`Go to step ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              currentStep === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-200 active:bg-gray-300"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <button
            onClick={handleSkip}
            className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
          >
            Skip Tour
          </button>

          <button
            onClick={handleNext}
            className="cricket-btn-primary flex items-center space-x-2 px-6 py-2"
          >
            <span>{currentStep === steps.length - 1 ? "Get Started" : "Next"}</span>
            {currentStep === steps.length - 1 ? (
              <Check className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
