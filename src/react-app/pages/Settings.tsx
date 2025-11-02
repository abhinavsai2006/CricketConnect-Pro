import { useState } from "react";
import { useAuth } from "@getmocha/users-service/react";
import { useNavigate } from "react-router";
import { 
  User, Bell, Lock, Globe, Moon, Sun, HelpCircle, 
  LogOut, ChevronRight, Shield, Mail, Phone, Edit,
  Trash2, Download, Share2, CreditCard, X, Check
} from "lucide-react";

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  
  // Modal states
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showChangePhone, setShowChangePhone] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showBillingHistory, setShowBillingHistory] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [showDownloadData, setShowDownloadData] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showContactSupport, setShowContactSupport] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Form states
  const [profileName, setProfileName] = useState(user?.google_user_data?.name || "Demo User");
  const [email, setEmail] = useState(user?.email || "user@example.com");
  const [phone, setPhone] = useState("+91 XXXXXXXXXX");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  
  const handleLogout = async () => {
    sessionStorage.removeItem('showDashboard');
    localStorage.removeItem('user');
    await logout();
    navigate('/');
    window.location.reload();
  };
  
  const handleSaveProfile = () => {
    // Save profile logic here
    setShowEditProfile(false);
    alert('Profile updated successfully!');
  };
  
  const handleSaveEmail = () => {
    // Save email logic here
    setShowChangeEmail(false);
    alert('Email updated successfully!');
  };
  
  const handleSavePhone = () => {
    // Save phone logic here
    setShowChangePhone(false);
    alert('Phone number updated successfully!');
  };
  
  const handleChangePassword = () => {
    // Change password logic here
    setShowChangePassword(false);
    alert('Password changed successfully!');
  };
  
  const handleDeleteAccount = () => {
    // Delete account logic here
    setShowDeleteAccount(false);
    alert('Account deletion initiated. Please check your email.');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 p-4 sm:p-6 shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Settings</h1>
        <p className="text-white/80 text-sm sm:text-base mt-1">Manage your account and preferences</p>
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Account Settings */}
        <div className="cricket-card p-4 sm:p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-cricket-green-600" />
            Account Settings
          </h2>
          
          <div className="space-y-3">
            <button 
              onClick={() => setShowEditProfile(true)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors touch-manipulation"
            >
              <div className="flex items-center space-x-3">
                <Edit className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Edit Profile</p>
                  <p className="text-xs text-gray-500">Update your personal information</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button 
              onClick={() => setShowChangeEmail(true)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors touch-manipulation"
            >
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Email Address</p>
                  <p className="text-xs text-gray-500">{email}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button 
              onClick={() => setShowChangePhone(true)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors touch-manipulation"
            >
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Phone Number</p>
                  <p className="text-xs text-gray-500">{phone}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button 
              onClick={() => setShowChangePassword(true)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors touch-manipulation"
            >
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Change Password</p>
                  <p className="text-xs text-gray-500">Update your password</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="cricket-card p-4 sm:p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-cricket-blue-600" />
            Notifications
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-xs text-gray-500">Receive push notifications</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifications ? 'bg-cricket-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-xs text-gray-500">Receive email updates</p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  emailNotifications ? 'bg-cricket-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  emailNotifications ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">SMS Notifications</p>
                <p className="text-xs text-gray-500">Receive text messages</p>
              </div>
              <button
                onClick={() => setSmsNotifications(!smsNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  smsNotifications ? 'bg-cricket-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  smsNotifications ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="cricket-card p-4 sm:p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-purple-600" />
            Preferences
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center space-x-3">
                {darkMode ? <Moon className="w-5 h-5 text-gray-400" /> : <Sun className="w-5 h-5 text-gray-400" />}
                <div>
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-xs text-gray-500">Toggle dark theme</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  darkMode ? 'bg-cricket-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <button 
              onClick={() => setShowLanguage(true)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Language</p>
                  <p className="text-xs text-gray-500">{selectedLanguage}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Payment & Billing */}
        <div className="cricket-card p-4 sm:p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-green-600" />
            Payment & Billing
          </h2>
          
          <div className="space-y-3">
            <button 
              onClick={() => setShowPaymentMethods(true)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors touch-manipulation"
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Payment Methods</p>
                  <p className="text-xs text-gray-500">Manage your payment methods</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button 
              onClick={() => setShowBillingHistory(true)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors touch-manipulation"
            >
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Billing History</p>
                  <p className="text-xs text-gray-500">View past transactions</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="cricket-card p-4 sm:p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-red-600" />
            Privacy & Security
          </h2>
          
          <div className="space-y-3">
            <button 
              onClick={() => setShowPrivacyPolicy(true)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors touch-manipulation"
            >
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Privacy Policy</p>
                  <p className="text-xs text-gray-500">View our privacy policy</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button 
              onClick={() => setShowTwoFactor(true)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors touch-manipulation"
            >
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-xs text-gray-500">Add extra security</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button 
              onClick={() => setShowDownloadData(true)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors touch-manipulation"
            >
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Download My Data</p>
                  <p className="text-xs text-gray-500">Export your data</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="cricket-card p-4 sm:p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <HelpCircle className="w-5 h-5 mr-2 text-orange-600" />
            Help & Support
          </h2>
          
          <div className="space-y-3">
            <button 
              onClick={() => setShowHelpCenter(true)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors touch-manipulation"
            >
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Help Center</p>
                  <p className="text-xs text-gray-500">FAQs and guides</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button 
              onClick={() => setShowContactSupport(true)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors touch-manipulation"
            >
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Contact Support</p>
                  <p className="text-xs text-gray-500">Get help from our team</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button 
              onClick={() => setShowFeedback(true)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors touch-manipulation"
            >
              <div className="flex items-center space-x-3">
                <Share2 className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Send Feedback</p>
                  <p className="text-xs text-gray-500">Share your thoughts</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="cricket-card p-4 sm:p-6 border-2 border-red-200">
          <h2 className="text-lg font-bold text-red-600 mb-4 flex items-center">
            <Trash2 className="w-5 h-5 mr-2" />
            Danger Zone
          </h2>
          
          <div className="space-y-3">
            <button 
              onClick={() => setShowDeleteAccount(true)}
              className="w-full flex items-center justify-between p-3 hover:bg-red-50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Trash2 className="w-5 h-5 text-red-500" />
                <div className="text-left">
                  <p className="font-medium text-red-600">Delete Account</p>
                  <p className="text-xs text-red-500">Permanently delete your account</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </div>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="w-full cricket-card p-4 flex items-center justify-center space-x-3 hover:bg-red-50 transition-colors border-2 border-red-200 touch-manipulation"
        >
          <LogOut className="w-5 h-5 text-red-600" />
          <span className="font-semibold text-red-600">Logout</span>
        </button>

        {/* App Info */}
        <div className="text-center text-sm text-gray-500 py-4">
          <p>CricketConnect Pro</p>
          <p className="text-xs mt-1">Version 1.0.0</p>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-3xl md:rounded-xl max-w-md w-full p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
              <button onClick={() => setShowEditProfile(false)} className="p-2 hover:bg-gray-100 rounded-lg touch-manipulation">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 cricket-btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Email Modal */}
      {showChangeEmail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-3xl md:rounded-xl max-w-md w-full p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Change Email</h3>
              <button onClick={() => setShowChangeEmail(false)} className="p-2 hover:bg-gray-100 rounded-lg touch-manipulation">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowChangeEmail(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEmail}
                  className="flex-1 cricket-btn-primary"
                >
                  Update Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Phone Modal */}
      {showChangePhone && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-3xl md:rounded-xl max-w-md w-full p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Change Phone Number</h3>
              <button onClick={() => setShowChangePhone(false)} className="p-2 hover:bg-gray-100 rounded-lg touch-manipulation">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowChangePhone(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePhone}
                  className="flex-1 cricket-btn-primary"
                >
                  Update Phone
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-3xl md:rounded-xl max-w-md w-full p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
              <button onClick={() => setShowChangePassword(false)} className="p-2 hover:bg-gray-100 rounded-lg touch-manipulation">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowChangePassword(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={handleChangePassword}
                  className="flex-1 cricket-btn-primary"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Language Selection Modal */}
      {showLanguage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-3xl md:rounded-xl max-w-md w-full p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Select Language</h3>
              <button onClick={() => setShowLanguage(false)} className="p-2 hover:bg-gray-100 rounded-lg touch-manipulation">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Kannada', 'Malayalam', 'Gujarati', 'Punjabi'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setShowLanguage(false);
                  }}
                  className={`w-full p-3 rounded-lg text-left flex items-center justify-between touch-manipulation ${
                    selectedLanguage === lang ? 'bg-cricket-green-50 border-2 border-cricket-green-500' : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <span className="font-medium">{lang}</span>
                  {selectedLanguage === lang && <Check className="w-5 h-5 text-cricket-green-600" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteAccount && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-3xl md:rounded-xl max-w-md w-full p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-red-600">Delete Account</h3>
              <button onClick={() => setShowDeleteAccount(false)} className="p-2 hover:bg-gray-100 rounded-lg touch-manipulation">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">
                  <strong>Warning:</strong> This action cannot be undone. All your data, including teams, bookings, and profile information will be permanently deleted.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type "DELETE" to confirm
                </label>
                <input
                  type="text"
                  placeholder="DELETE"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowDeleteAccount(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 touch-manipulation"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Methods Modal */}
      {showPaymentMethods && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-3xl md:rounded-xl max-w-md w-full p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Payment Methods</h3>
              <button onClick={() => setShowPaymentMethods(false)} className="p-2 hover:bg-gray-100 rounded-lg touch-manipulation">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-center py-8">
                <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">No payment methods added</p>
                <p className="text-gray-500 text-sm mt-2">Add a credit or debit card to make bookings easier</p>
                <button className="cricket-btn-primary mt-4">
                  Add Payment Method
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Billing History Modal */}
      {showBillingHistory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-3xl md:rounded-xl max-w-md w-full p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Billing History</h3>
              <button onClick={() => setShowBillingHistory(false)} className="p-2 hover:bg-gray-100 rounded-lg touch-manipulation">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-center py-8">
                <Download className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">No transactions yet</p>
                <p className="text-gray-500 text-sm mt-2">Your billing history will appear here</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-3xl md:rounded-xl max-w-2xl w-full p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Privacy Policy</h3>
              <button onClick={() => setShowPrivacyPolicy(false)} className="p-2 hover:bg-gray-100 rounded-lg touch-manipulation">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="prose prose-sm max-w-none space-y-4 text-gray-700">
              <p className="text-sm"><strong>Last Updated:</strong> November 2, 2025</p>
              <h4 className="font-bold text-gray-900 mt-4">1. Information We Collect</h4>
              <p className="text-sm">We collect information you provide directly to us, including name, email, phone number, and cricket preferences.</p>
              <h4 className="font-bold text-gray-900 mt-4">2. How We Use Your Information</h4>
              <p className="text-sm">We use your information to provide, maintain, and improve our services, including team management, ground bookings, and match scheduling.</p>
              <h4 className="font-bold text-gray-900 mt-4">3. Information Sharing</h4>
              <p className="text-sm">We do not sell your personal information. We may share information with team members and ground owners as necessary for bookings.</p>
              <h4 className="font-bold text-gray-900 mt-4">4. Data Security</h4>
              <p className="text-sm">We implement appropriate technical and organizational measures to protect your personal information.</p>
              <h4 className="font-bold text-gray-900 mt-4">5. Your Rights</h4>
              <p className="text-sm">You have the right to access, update, or delete your personal information at any time through your account settings.</p>
            </div>
          </div>
        </div>
      )}

      {/* Two-Factor Authentication Modal */}
      {showTwoFactor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-3xl md:rounded-xl max-w-md w-full p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Two-Factor Authentication</h3>
              <button onClick={() => setShowTwoFactor(false)} className="p-2 hover:bg-gray-100 rounded-lg touch-manipulation">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Enhance your security:</strong> Two-factor authentication adds an extra layer of protection to your account.
                </p>
              </div>
              <div className="text-center py-4">
                <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Two-Factor Authentication is currently disabled</p>
                <p className="text-gray-500 text-sm mt-2">Enable 2FA to secure your account with an additional verification step</p>
                <button className="cricket-btn-primary mt-4">
                  Enable Two-Factor Auth
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Data Modal */}
      {showDownloadData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-3xl md:rounded-xl max-w-md w-full p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Download My Data</h3>
              <button onClick={() => setShowDownloadData(false)} className="p-2 hover:bg-gray-100 rounded-lg touch-manipulation">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">Request a copy of your personal data, including profile information, teams, bookings, and match history.</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Data export may take up to 24 hours. You'll receive an email with a download link when ready.
                </p>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowDownloadData(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowDownloadData(false);
                    alert('Data export request submitted! You will receive an email when your data is ready.');
                  }}
                  className="flex-1 cricket-btn-primary"
                >
                  Request Export
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Center Modal */}
      {showHelpCenter && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-3xl md:rounded-xl max-w-2xl w-full p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Help Center</h3>
              <button onClick={() => setShowHelpCenter(false)} className="p-2 hover:bg-gray-100 rounded-lg touch-manipulation">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="cricket-card p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <h4 className="font-bold text-gray-900 mb-2">How do I create a team?</h4>
                <p className="text-sm text-gray-600">Go to the Teams page and click "Create New Team". Fill in your team details and invite players.</p>
              </div>
              <div className="cricket-card p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <h4 className="font-bold text-gray-900 mb-2">How do I book a ground?</h4>
                <p className="text-sm text-gray-600">Navigate to Grounds, select your preferred venue, choose date and time, and confirm your booking.</p>
              </div>
              <div className="cricket-card p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <h4 className="font-bold text-gray-900 mb-2">How do I join a team?</h4>
                <p className="text-sm text-gray-600">You can join a team by accepting an invitation from the team captain or searching for open teams.</p>
              </div>
              <div className="cricket-card p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <h4 className="font-bold text-gray-900 mb-2">How do I edit my profile?</h4>
                <p className="text-sm text-gray-600">Go to Settings and click "Edit Profile" to update your personal information and cricket preferences.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Support Modal */}
      {showContactSupport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-3xl md:rounded-xl max-w-md w-full p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Contact Support</h3>
              <button onClick={() => setShowContactSupport(false)} className="p-2 hover:bg-gray-100 rounded-lg touch-manipulation">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="What do you need help with?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Describe your issue..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent resize-none"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowContactSupport(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowContactSupport(false);
                    alert('Support ticket submitted! Our team will respond within 24 hours.');
                  }}
                  className="flex-1 cricket-btn-primary"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-3xl md:rounded-xl max-w-md w-full p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Send Feedback</h3>
              <button onClick={() => setShowFeedback(false)} className="p-2 hover:bg-gray-100 rounded-lg touch-manipulation">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent">
                  <option>Feature Request</option>
                  <option>Bug Report</option>
                  <option>General Feedback</option>
                  <option>Complaint</option>
                  <option>Compliment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Feedback</label>
                <textarea
                  rows={5}
                  placeholder="Share your thoughts..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent resize-none"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowFeedback(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowFeedback(false);
                    alert('Thank you for your feedback! We appreciate your input.');
                  }}
                  className="flex-1 cricket-btn-primary"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
