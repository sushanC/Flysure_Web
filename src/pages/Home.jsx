import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    // Trigger animations after component mount
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleExplore = () => {
    navigate("/courses");
  };

  const handleEnroll = () => {
    if (isLoggedIn) {
      navigate("/enroll");
    } else {
      navigate("/login", { state: { from: "/enroll" } });
    }
  };

  // Stats data
  const stats = [
    { number: "10K+", label: "Students Enrolled", icon: "👨‍🎓" },
    { number: "50+", label: "Expert Instructors", icon: "🏆" },
    { number: "100+", label: "Courses Available", icon: "📚" },
    { number: "98%", label: "Success Rate", icon: "🚀" }
  ];

  // Features data
  const features = [
    { icon: "🎯", text: "Career-Focused Curriculum" },
    { icon: "💻", text: "Hands-on Projects" },
    { icon: "👨‍🏫", text: "Expert Mentors" },
    { icon: "📱", text: "Flexible Learning" }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Animated Background Shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse animate-float-slow"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-bounce-slow"></div>
      <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-pink-400/30 rounded-full blur-lg animate-ping-slow"></div>
      <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl animate-spin-slow"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0">
          {/* Trust Badge with animation */}
          <div className={`inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          } hover:scale-105 hover:bg-white/20 cursor-pointer`}>
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-white/90 text-sm font-medium">🎓 Trusted by 10,000+ Students</span>
          </div>

          {/* Main Heading with staggered animation */}
          <div className={`transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-white leading-tight">
              <span className="block animate-typewriter">Flysure Academy</span>
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
                Academy
              </span>
            </h1>
          </div>

          {/* Description with fade-in */}
          <div className={`transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-4 leading-relaxed max-w-2xl">
              Empowering the next generation with{" "}
              <span className="font-semibold text-yellow-300 animate-pulse">quality education</span>, 
              cutting-edge technology, and real-world skills for a brighter future ✨
            </p>
          </div>

          <div className={`transform transition-all duration-1000 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl">
              Join our community of learners and unlock your potential with industry-expert 
              instructors, hands-on projects, and career-focused curriculum.
            </p>
          </div>

          {/* Features Grid */}
          <div className={`grid grid-cols-2 gap-4 mb-8 transform transition-all duration-1000 delay-800 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center space-x-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span className="text-xl">{feature.icon}</span>
                <span className="text-white/80 text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons with hover animations */}
          <div className={`flex flex-col sm:flex-row gap-4 mb-12 transform transition-all duration-1000 delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <button
              onClick={handleEnroll}
              className="group px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold text-base sm:text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                🚀 Start Learning Free
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>

            <button
              onClick={handleExplore}
              className="group px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center hover:shadow-lg hover:shadow-white/10"
            >
              <span className="flex items-center">
                📚 Browse Courses
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">✨</span>
              </span>
            </button>
          </div>

          {/* Stats Section with counter animation */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-2xl transform transition-all duration-1000 delay-1200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center lg:text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 animate-count">
                  {stat.number}
                </div>
                <div className="text-white/70 text-xs sm:text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Interactive Card */}
        <div className={`flex-1 flex justify-center lg:justify-end mt-8 lg:mt-0 transform transition-all duration-1000 delay-1400 ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
        }`}>
          <div className="relative group">
            <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center p-6 sm:p-8 shadow-2xl transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500">
              <div className="text-center">
                <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 animate-bounce">🎓</div>
                <h3 className="text-white font-bold text-lg sm:text-xl mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                  Interactive Learning
                </h3>
                <p className="text-white/70 text-xs sm:text-sm">
                  Live classes, hands-on projects, and personalized feedback
                </p>
                
                {/* Progress bar animation */}
                <div className="mt-4 w-full bg-white/20 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full animate-progress"></div>
                </div>
                <p className="text-white/60 text-xs mt-2 animate-pulse">Learning in progress...</p>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-20 sm:h-20 bg-green-400/20 rounded-2xl backdrop-blur-sm border border-green-400/30 flex items-center justify-center animate-float group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
              <span className="text-xl sm:text-2xl">⭐</span>
            </div>
            <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-10 h-10 sm:w-16 sm:h-16 bg-blue-400/20 rounded-2xl backdrop-blur-sm border border-blue-400/30 flex items-center justify-center animate-float-delayed group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
              <span className="text-lg sm:text-xl">💼</span>
            </div>
            
            {/* Connection line animation */}
            <div className="absolute top-1/2 left-0 w-4 h-0.5 bg-white/30 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator with animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-white/70 text-sm mb-2 animate-pulse">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        
        @keyframes count {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-typewriter {
          animation: typewriter 2s steps(20) 1s both;
          overflow: hidden;
          white-space: nowrap;
          border-right: 3px solid white;
        }
        
        .animate-gradient {
          background: linear-gradient(-45deg, #f59e0b, #f97316, #f59e0b, #f97316);
          background-size: 400% 400%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-progress {
          animation: progress 2s ease-in-out infinite alternate;
        }
        
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
        
        .animate-count {
          animation: count 1s ease-out;
        }
        
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 1.5s;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
        .delay-800 {
          animation-delay: 0.8s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-1200 {
          animation-delay: 1.2s;
        }
        .delay-1400 {
          animation-delay: 1.4s;
        }
      `}</style>
    </div>
  );
}