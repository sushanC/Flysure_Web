import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleExplore = () => {
    navigate("/courses");
  };

  const handleEnroll = () => {
    if (isLoggedIn) {
      navigate("/enroll");
    } else {
      // Save the intended route in state so login can redirect back after success
      navigate("/login", { state: { from: "/enroll" } });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start max-w-4xl px-8 text-left">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg animate-fadeIn">
          Flysure Academy
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-6 animate-fadeIn delay-200">
          Empowering students with quality education ✨
        </p>

        <div className="flex space-x-4 mt-4 animate-fadeIn delay-400">
          <button
            onClick={handleExplore}
            className="px-6 py-3 rounded-lg bg-white hover:bg-gray-200 text-black font-semibold shadow-lg transition duration-300"
          >
            Explore Courses
          </button>

          <button
            onClick={handleEnroll}
            className="px-6 py-3 rounded-lg bg-black/70 hover:bg-black/90 text-white font-semibold shadow-lg transition duration-300"
          >
            Enroll Now
          </button>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}
