import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

export default function HeroSection() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

  const handleExplore = useCallback(() => {
    navigate("/courses");
  }, [navigate]);

  const handleEnroll = useCallback(() => {
    if (isLoggedIn) {
      navigate("/enroll");
    } else {
      navigate("/login", { state: { from: "/enroll" } });
    }
  }, [isLoggedIn, navigate]);

  const trustedImages = ["/pic1.jpg", "/pic2.jpg", "/pic3.jpg", "/pic4.jpg", "/pic5.jpg"];

  const globalStyles = `
    @keyframes float { 0%,100%{transform:translateY(0px) rotate(0deg);}50%{transform:translateY(-20px) rotate(5deg);} }
    @keyframes scroll-float { 0%,100%{transform:translateX(0) translateY(0px) rotate(0deg);}25%{transform:translateX(-10px) translateY(-10px) rotate(2deg);}50%{transform:translateX(0) translateY(-20px) rotate(5deg);}75%{transform:translateX(10px) translateY(-10px) rotate(2deg);} }
    @keyframes bounce { 0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }

    @keyframes swing-left {
      0%, 100% { transform: rotate(-3deg); }
      50% { transform: rotate(3deg); }
    }
    @keyframes swing-right {
      0%, 100% { transform: rotate(3deg); }
      50% { transform: rotate(-3deg); }
    }
    .animate-swing-left {
      animation: swing-left 4s ease-in-out infinite;
      transform-origin: top center;
    }
    .animate-swing-right {
      animation: swing-right 4s ease-in-out infinite;
      transform-origin: top center;
    }

    .animate-float{animation:float 6s ease-in-out infinite;}
    .animate-scroll-float{animation:scroll-float 8s ease-in-out infinite;}
    .animate-bounce{animation:bounce 2s infinite;}
    .fade-slide-up { opacity: 0; transform: translateY(40px); transition: all 0.8s ease-out; }
    .fade-slide-up.visible { opacity: 1; transform: translateY(0); }
  `;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
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

        {/* Hero Text and Buttons */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mt-8 px-4 sm:px-6 lg:px-8">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white leading-tight transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <span className="block animate-typewriter">Flysure Academy</span>
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-gradient">Empowering Students</span>
          </h1>

          <p className={`text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            Empowering the next generation with <span className="font-semibold text-yellow-300 animate-pulse">quality education</span>, cutting-edge technology, and real-world skills for a brighter future ✨
          </p>

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
          </div>
        </div>

        {/* Trusted Badge */}
        <div className={`z-20 mt-6 mb-12 inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} hover:scale-105 hover:bg-white/20 cursor-pointer`}>
          <span className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse" aria-hidden="true"></span>
          <span className="text-white/90 text-sm font-medium">🎓 Trusted by 10,000+ Students</span>
        </div>

        {/* Hanging Images - moved below title and buttons */}
        <div className="relative flex justify-center gap-12 sm:gap-20 w-full z-0">
          {trustedImages.map((imgSrc, i) => {
            let ropeHeight = "h-64";
            if (i === 0 || i === 4) ropeHeight = "h-64";
            else if (i === 1 || i === 3) ropeHeight = "h-96";
            else if (i === 2) ropeHeight = "h-48";
            return (
              <div key={i} className="relative flex flex-col items-center">
                <div className={`w-0.5 ${ropeHeight} bg-white/50`} />
                <img
                  src={imgSrc}
                  alt={`Hanging image ${i + 1}`}
                  className={`w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shadow-lg border-2 border-white/30 bg-white/10 ${i % 2 === 0 ? "animate-swing-left" : "animate-swing-right"}`}
                  style={{ animationDelay: `${i * 0.5}s` }}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              </div>
            );
          })}
        </div>

        {/* Floating light dots */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
          {[
            { icon: "🎯", title: "Career-Focused Curriculum", desc: "Courses aligned with industry requirements to help you succeed in your career." },
            { icon: "💻", title: "Hands-on Projects", desc: "Gain practical experience with real-world projects to boost your skills." },
            { icon: "👨‍🏫", title: "Expert Mentors", desc: "Learn from experienced instructors who guide you personally." },
            { icon: "📱", title: "Flexible Learning", desc: "Study anytime, anywhere with our flexible online learning modules." },
          ].map((item, i) => (
            <div key={i} className="bg-white/10 p-6 rounded-lg shadow transition-transform duration-300 hover:-translate-y-2 cursor-default">
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-white/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Exam Categories Section */}
      <div className="bg-gradient-to-r from-purple-100 via-blue-50 to-pink-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">Exam Categories</h2>
          <p className="text-center text-gray-700 mb-12">
            Flysure Academy is preparing students for 35+ exam categories. Scroll down to find the one you are preparing for.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* NEET */}
            <div className="bg-gradient-to-r from-green-200 to-green-300 rounded-lg shadow p-6 hover:scale-105 transition-transform duration-300 flex flex-col items-start">
              <div className="text-4xl mb-2">🩺</div>
              <h3 className="font-semibold text-xl mb-2 text-gray-800">NEET</h3>
              <ul className="text-gray-700 mb-2 space-y-1">
                <li>Class 11</li>
                <li>Class 12</li>
                <li>Dropper</li>
              </ul>
              <p className="text-gray-700 text-sm">Comprehensive coaching for NEET with strong conceptual clarity and practice.</p>
            </div>

            {/* IIT JEE */}
            <div className="bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-lg shadow p-6 hover:scale-105 transition-transform duration-300 flex flex-col items-start">
              <div className="text-4xl mb-2">🧪</div>
              <h3 className="font-semibold text-xl mb-2 text-gray-800">IIT JEE</h3>
              <ul className="text-gray-700 mb-2 space-y-1">
                <li>Class 11</li>
                <li>Class 12</li>
                <li>Dropper</li>
              </ul>
              <p className="text-gray-700 text-sm">Expert guidance and problem-solving strategies to excel in IIT JEE.</p>
            </div>

            {/* School Preparation */}
            <div className="bg-gradient-to-r from-purple-200 to-purple-300 rounded-lg shadow p-6 hover:scale-105 transition-transform duration-300 flex flex-col items-start">
              <div className="text-4xl mb-2">🏫</div>
              <h3 className="font-semibold text-xl mb-2 text-gray-800">School Preparation</h3>
              <ul className="text-gray-700 mb-2 space-y-1">
                <li>Class 6</li>
                <li>Class 7</li>
                <li>Class 8</li>
              </ul>
              <p className="text-gray-700 text-sm">Strong foundation for school exams and advanced learning for higher grades.</p>
            </div>

            {/* UPSC */}
            <div className="bg-gradient-to-r from-indigo-200 to-indigo-300 rounded-lg shadow p-6 hover:scale-105 transition-transform duration-300 flex flex-col items-start">
              <div className="text-4xl mb-2">📜</div>
              <h3 className="font-semibold text-xl mb-2 text-gray-800">UPSC</h3>
              <p className="text-gray-700 text-sm">Complete preparation for UPSC exams with expert faculty and study material.</p>
            </div>

            {/* Defence */}
            <div className="bg-gradient-to-r from-red-200 to-red-300 rounded-lg shadow p-6 hover:scale-105 transition-transform duration-300 flex flex-col items-start">
              <div className="text-4xl mb-2">🪖</div>
              <h3 className="font-semibold text-xl mb-2 text-gray-800">Defence</h3>
              <ul className="text-gray-700 mb-2 space-y-1">
                <li>NDA</li>
                <li>CDS</li>
                <li>AFCAT</li>
                <li>Agniveer</li>
              </ul>
              <p className="text-gray-700 text-sm">Guidance and preparation for entrance exams to defence services.</p>
            </div>

            {/* KCET */}
            <div className="bg-gradient-to-r from-pink-200 to-pink-300 rounded-lg shadow p-6 hover:scale-105 transition-transform duration-300 flex flex-col items-start">
              <div className="text-4xl mb-2">🎓</div>
              <h3 className="font-semibold text-xl mb-2 text-gray-800">KCET</h3>
              <ul className="text-gray-700 mb-2 space-y-1">
                <li>Class 11</li>
                <li>Class 12</li>
              </ul>
              <p className="text-gray-700 text-sm">Targeted coaching for KCET to secure admissions in top colleges in Karnataka.</p>
            </div>

            {/* Aviation Placement */}
            <div className="bg-gradient-to-r from-cyan-200 to-blue-300 rounded-lg shadow p-6 hover:scale-105 transition-transform duration-300 flex flex-col items-start">
              <div className="text-4xl mb-2">✈</div>
              <h3 className="font-semibold text-xl mb-2 text-gray-800">Aviation Placement Training</h3>
              <p className="text-gray-700 text-sm">Specialized coaching for airline cabin crew, ground staff, and ticketing roles.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Job-Oriented Courses Section */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-white">Aviation Job-Oriented Courses</h2>
          <p className="text-center text-white/80 mb-12">
            Build a career in aviation with practical, industry-ready training for cabin crew, ground operations, customer service and more.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🛫", title: "Airline Cabin Crew", desc: "Comprehensive training for cabin crew roles: safety, service, grooming and SOPs." },
              { icon: "🛬", title: "Airport Ground Staff", desc: "Hands-on training in ground handling, check-in, boarding and turnaround operations." },
              { icon: "🎫", title: "Ticketing & Reservation", desc: "GDS basics, PNR management, fare construction and customer bookings." },
              { icon: "💬", title: "Aviation Customer Service", desc: "Effective communication, conflict resolution and passenger handling skills." },
              { icon: "🧰", title: "Ramp & Baggage Handling", desc: "Ramp safety, cargo/baggage procedures and coordination with operations teams." },
              { icon: "🛠", title: "Aircraft Line Maintenance (Intro)", desc: "Fundamentals of aircraft systems, inspections and maintenance support roles." },
              { icon: "🆘", title: "Cabin Safety & Emergency Procedures", desc: "Emergency protocols, first aid basics and evacuation drills for onboard safety." },
              { icon: "🔒", title: "Aviation Security & Customer Handling", desc: "Security screening basics, threat awareness and calm passenger management." }
            ].map((course, i) => (
              <div key={i} className="fade-slide-up relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-left shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-300/50 cursor-pointer overflow-hidden">
                <div className="text-4xl mb-4">{course.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{course.title}</h3>
                <p className="text-white/80">{course.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white text-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold">About Flysure Academy</h2>
          <p className="text-gray-800 max-w-3xl mx-auto">
            Flysure Academy is a premier educational institution dedicated to empowering students to achieve their dreams.
            We offer specialized training for aviation placement, NEET, JEE, KCET, CET, and other competitive exams. Our
            expert mentors provide hands-on learning and career-focused guidance to help students excel academically and
            professionally.
          </p>
          <p className="text-gray-600">© 2025 Flysure Academy. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}