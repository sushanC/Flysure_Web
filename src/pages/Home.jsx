import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

export default function HeroSection() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Check login status & trigger animations
  useEffect(() => {
    try {
      setIsLoggedIn(!!localStorage.getItem("token"));
    } catch (error) {
      console.warn("localStorage access error:", error);
      setIsLoggedIn(false);
    }
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Callbacks for navigation
  const handleExplore = useCallback(() => navigate("/courses"), [navigate]);
  const handleEnroll = useCallback(() => {
    if (isLoggedIn) {
      navigate("/enroll");
    } else {
      navigate("/login", { state: { from: "/enroll" } });
    }
  }, [isLoggedIn, navigate]);
  const handleFeedback = useCallback(() => navigate("/feedback"), [navigate]);

  const trustedImages = ["/pic1.jpg", "/pic2.jpg", "/pic3.jpg", "/pic4.jpg", "/pic5.jpg"];

  // Global animations
  const globalStyles = `
    @keyframes float {0%,100%{transform:translateY(0px) rotate(0deg);}50%{transform:translateY(-20px) rotate(5deg);}}
    @keyframes scroll-float {0%,100%{transform:translateX(0) translateY(0px) rotate(0deg);}25%{transform:translateX(-10px) translateY(-10px) rotate(2deg);}50%{transform:translateX(0) translateY(-20px) rotate(5deg);}75%{transform:translateX(10px) translateY(-10px) rotate(2deg);}}
    @keyframes bounce {0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
    @keyframes swing-left {0%,100% { transform: rotate(-3deg); }50% { transform: rotate(3deg); }}
    @keyframes swing-right {0%,100% { transform: rotate(3deg); }50% { transform: rotate(-3deg); }}
    .animate-swing-left {animation: swing-left 4s ease-in-out infinite; transform-origin: top center;}
    .animate-swing-right {animation: swing-right 4s ease-in-out infinite; transform-origin: top center;}
    .animate-float{animation:float 6s ease-in-out infinite;}
    .animate-scroll-float{animation:scroll-float 8s ease-in-out infinite;}
    .animate-bounce{animation:bounce 2s infinite;}
    .fade-slide-up { opacity: 0; transform: translateY(40px); transition: all 0.8s ease-out; }
    .fade-slide-up.visible { opacity: 1; transform: translateY(0); }
  `;

  // IntersectionObserver for fade-slide-up elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll(".fade-slide-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">

        {/* Hero Text */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mt-8 px-4 sm:px-6 lg:px-8">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white leading-tight transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <span className="block animate-typewriter">Flysure Academy</span>
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
              Empowering Students
            </span>
          </h1>

          <p className={`text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            Empowering the next generation with <span className="font-semibold text-yellow-300 animate-pulse">quality education</span>, cutting-edge technology, and real-world skills for a brighter future ✨
          </p>

          {/* Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <button onClick={handleEnroll} className="group px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold text-base sm:text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                🚀 Start Learning Free
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </button>

            <button onClick={handleExplore} className="group px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-base sm:text-lg shadow transition-all duration-300 transform hover:scale-105 flex items-center justify-center relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                🔎 Explore Courses
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </button>

            <button onClick={handleFeedback} className="group px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-base sm:text-lg shadow transition-all duration-300 transform hover:scale-105 flex items-center justify-center relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                📝 Give Feedback
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </button>
          </div>
        </div>

        {/* Trusted Badge */}
        <div className={`z-20 mt-6 mb-12 inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} hover:scale-105 hover:bg-white/20 cursor-pointer`}>
          <span className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse" aria-hidden="true"></span>
          <span className="text-white/90 text-sm font-medium">🎓 Trusted by 10,000+ Students</span>
        </div>

        {/* Hanging Images */}
        <div className="relative flex justify-center gap-12 sm:gap-20 w-full z-0">
          {trustedImages.map((imgSrc, i) => {
            let ropeHeight = i === 1 || i === 3 ? "h-96" : i === 2 ? "h-48" : "h-64";
            return (
              <div key={i} className="relative flex flex-col items-center">
                <div className={`w-0.5 ${ropeHeight} bg-white/50`} />
                <img src={imgSrc} alt={`Hanging image ${i + 1}`} className={`w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shadow-lg border-2 border-white/30 bg-white/10 ${i % 2 === 0 ? "animate-swing-left" : "animate-swing-right"}`} style={{ animationDelay: `${i * 0.5}s` }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
              </div>
            );
          })}
        </div>

        {/* Floating light dots */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute w-2 h-2 bg-white/20 rounded-full animate-float" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s` }} />
          ))}
        </div>

      </div>
    </>
  );
}
