import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Trophy, Mail, Lock, Eye, EyeOff, User, Phone, MapPin, ArrowRight, Check, ArrowLeft } from "lucide-react";
import CricketLoadingSpinner from "../components/CricketLoadingSpinner";

type SignupStep = 'email' | 'otp' | 'password' | 'profile' | 'preferences';

interface ProfileData {
  // Basic Info (Step 1)
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  
  // Password (Step 2)
  password: string;
  confirmPassword: string;
  
  // Cricket Profile (Step 3)
  position: string;
  battingStyle: string;
  bowlingStyle: string;
  experience: string;
  location: string;
  bio: string;
  
  // Preferences (Step 4)
  preferredRole: string;
  availability: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<SignupStep>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  
  const [formData, setFormData] = useState<ProfileData>({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    position: "",
    battingStyle: "",
    bowlingStyle: "",
    experience: "",
    location: "",
    bio: "",
    preferredRole: "",
    availability: ""
  });
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // OTP Timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const validateEmailStep = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordStep = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateProfileStep = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.position) {
      newErrors.position = "Position is required";
    }
    
    if (!formData.experience) {
      newErrors.experience = "Experience level is required";
    }

    if (!formData.location) {
      newErrors.location = "Location is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendOtp = async () => {
    if (!validateEmailStep()) return;

    setIsLoading(true);
    setLoadingText('Sending OTP to your email...');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate random 6-digit OTP
    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setResendTimer(60);
    setCurrentStep('otp');
    setIsLoading(false);
    // In production, send email via backend
    console.log('OTP sent to email:', formData.email, 'OTP:', otp);
    alert(`Demo OTP: ${otp}\n\nIn production, this will be sent to your email.`);
  };

  const resendOtp = async () => {
    setIsLoading(true);
    setLoadingText('Resending OTP...');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setResendTimer(60);
    setIsLoading(false);
    
    console.log('New OTP:', otp);
    alert(`Demo OTP: ${otp}\n\nIn production, this will be sent to your email.`);
  };

  const verifyOtp = async () => {
    const enteredOtp = otp.join('');
    
    if (enteredOtp.length !== 6) {
      setErrors({ otp: 'Please enter complete OTP' });
      return;
    }

    if (enteredOtp !== generatedOtp) {
      setErrors({ otp: 'Invalid OTP. Please try again.' });
      return;
    }

    setIsLoading(true);
    setLoadingText('Verifying OTP...');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setErrors({});
    setCurrentStep('password');
    setIsLoading(false);
  };

  const handlePasswordSubmit = () => {
    if (!validatePasswordStep()) return;
    setCurrentStep('profile');
  };

  const handleProfileSubmit = () => {
    if (!validateProfileStep()) return;
    setCurrentStep('preferences');
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true);
    setLoadingText('Creating your account...');

    // Simulate account creation
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Create user session
    const fakeUser = {
      email: formData.email,
      google_user_data: {
        given_name: formData.fullName.split(' ')[0],
        name: formData.fullName,
        picture: `https://ui-avatars.com/api/?name=${formData.fullName.replace(' ', '+')}`
      },
      profile: formData
    };
    
    localStorage.setItem("user", JSON.stringify(fakeUser));
    sessionStorage.setItem('showDashboard', 'true');
    
    setLoadingText('Welcome to CricketConnect Pro!');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    navigate("/");
    window.location.reload();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Clear error when typing
    if (errors.otp) {
      setErrors({ ...errors, otp: '' });
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
    setOtp(newOtp.slice(0, 6));
  };

  const getProgressPercentage = () => {
    const steps: SignupStep[] = ['email', 'otp', 'password', 'profile', 'preferences'];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  // Loading overlay
  if (isLoading) {
    return <CricketLoadingSpinner size="lg" text={loadingText} fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cricket-green-50 via-white to-cricket-blue-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Logo and Header */}
        <div className="text-center mb-6 fade-in">
          <Link to="/" className="inline-block mb-4">
            <div className="w-16 h-16 cricket-gradient rounded-2xl flex items-center justify-center mx-auto shadow-xl bounce-in">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </Link>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cricket-green-700 to-cricket-blue-600 bg-clip-text text-transparent mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Join thousands of cricket enthusiasts on CricketConnect Pro</p>
        </div>

        {/* Progress Bar - Hidden on first step */}
        {currentStep !== 'email' && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2 text-xs sm:text-sm">
              <span className="text-gray-600 font-medium">Step {['email', 'otp', 'password', 'profile', 'preferences'].indexOf(currentStep) + 1} of 5</span>
              <span className="text-cricket-green-600 font-semibold">{Math.round(getProgressPercentage())}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Signup Form */}
        <div className="cricket-card p-6 sm:p-8 scale-in">
          {/* Step 1: Email and Basic Info */}
          {currentStep === 'email' && (
            <div className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Email and Phone in Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent transition-all duration-200`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent transition-all duration-200`}
                    placeholder="10-digit number"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location (Optional)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="City, State"
                />
              </div>
            </div>

            {/* Password and Confirm Password in Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Min. 6 characters"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Re-enter password"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 text-cricket-green-600 border-gray-300 rounded focus:ring-cricket-green-500 mt-1"
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-cricket-green-600 hover:text-cricket-green-700 font-medium">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-cricket-green-600 hover:text-cricket-green-700 font-medium">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.terms && (
                <p className="mt-1 text-sm text-red-500">{errors.terms}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={sendOtp}
              className="w-full cricket-btn-primary py-3 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 hover:scale-[1.02] transition-transform duration-200"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-cricket-green-600 hover:text-cricket-green-700 font-semibold">
                Sign in
              </Link>
            </div>
          </div>
          )}

          {/* Step 2: OTP Verification */}
          {currentStep === 'otp' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-cricket-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-10 h-10 text-cricket-green-600" />
                </div>
                <p className="text-gray-600 mb-6">Enter the 6-digit code sent to your email</p>
              </div>

              <div className="flex justify-center gap-2 sm:gap-3" onPaste={handleOtpPaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 ${
                      errors.otp ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:border-cricket-green-500 focus:ring-2 focus:ring-cricket-green-500 transition-all`}
                  />
                ))}
              </div>

              {errors.otp && (
                <p className="text-center text-sm text-red-500">{errors.otp}</p>
              )}

              <button
                onClick={verifyOtp}
                className="w-full cricket-btn-primary py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
              >
                <span>Verify OTP</span>
                <Check className="w-5 h-5" />
              </button>

              <div className="text-center">
                {resendTimer > 0 ? (
                  <p className="text-sm text-gray-600">Resend code in {resendTimer}s</p>
                ) : (
                  <button
                    onClick={resendOtp}
                    className="text-sm text-cricket-green-600 hover:text-cricket-green-700 font-semibold"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <button
                onClick={() => setCurrentStep('email')}
                className="w-full text-gray-600 hover:text-gray-800 font-medium text-sm flex items-center justify-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            </div>
          )}

          {/* Step 3: Password */}
          {currentStep === 'password' && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent`}
                    placeholder="Min. 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                <p className="mt-1 text-xs text-gray-500">Must contain uppercase, lowercase, and number</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent`}
                    placeholder="Re-enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep('otp')}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handlePasswordSubmit}
                  className="flex-1 cricket-btn-primary py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Cricket Profile */}
          {currentStep === 'profile' && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.position ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent`}
                >
                  <option value="">Select your position</option>
                  <option value="batsman">Batsman</option>
                  <option value="bowler">Bowler</option>
                  <option value="all-rounder">All-Rounder</option>
                  <option value="wicket-keeper">Wicket Keeper</option>
                </select>
                {errors.position && <p className="mt-1 text-sm text-red-500">{errors.position}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Batting Style</label>
                  <select
                    name="battingStyle"
                    value={formData.battingStyle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                  >
                    <option value="">Select batting style</option>
                    <option value="right-hand">Right Hand</option>
                    <option value="left-hand">Left Hand</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bowling Style</label>
                  <select
                    name="bowlingStyle"
                    value={formData.bowlingStyle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                  >
                    <option value="">Select bowling style</option>
                    <option value="fast">Fast</option>
                    <option value="medium">Medium</option>
                    <option value="spin">Spin</option>
                    <option value="none">Don't Bowl</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience *</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.experience ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent`}
                >
                  <option value="">Select experience level</option>
                  <option value="beginner">Beginner (0-2 years)</option>
                  <option value="intermediate">Intermediate (3-5 years)</option>
                  <option value="advanced">Advanced (6-10 years)</option>
                  <option value="professional">Professional (10+ years)</option>
                </select>
                {errors.experience && <p className="mt-1 text-sm text-red-500">{errors.experience}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent`}
                    placeholder="City, State"
                  />
                </div>
                {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio (Optional)</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent resize-none"
                  placeholder="Tell us about your cricket journey..."
                ></textarea>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep('password')}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleProfileSubmit}
                  className="flex-1 cricket-btn-primary py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Preferences */}
          {currentStep === 'preferences' && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Role</label>
                <select
                  name="preferredRole"
                  value={formData.preferredRole}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                >
                  <option value="">What are you looking for?</option>
                  <option value="player">Join teams as a player</option>
                  <option value="captain">Create and manage teams</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                >
                  <option value="">When can you play?</option>
                  <option value="weekends">Weekends Only</option>
                  <option value="weekdays">Weekdays Only</option>
                  <option value="anytime">Anytime</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div className="bg-cricket-green-50 rounded-lg p-4 border border-cricket-green-200">
                <div className="flex items-start space-x-3">
                  <Check className="w-6 h-6 text-cricket-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">All Set!</h4>
                    <p className="text-sm text-gray-700">You're about to join the largest cricket community platform.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep('profile')}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="flex-1 cricket-btn-primary py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <span>Create Account</span>
                  <Check className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
