import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi"; // Hamburger icons

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setToken(localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    setToken(null);
    navigate("/");
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center relative shadow-md">
      {/* Logo + Title */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="/logo22.jpg"
          alt="Flysure Logo"
          className="h-10 w-10 mr-2 rounded-full object-cover"
        />
        <span className="text-xl font-bold">Flysure Academy</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-4">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>

        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/enrollments">My Courses</Link>

            {role === "admin" && (
              <>
                <Link
                  to="/admin"
                  className="text-white hover:text-amber-400 px-3"
                >
                  Admin Dashboard
                </Link>
                <Link
                  to="/admin/users"
                  className="text-white hover:text-amber-400 px-3"
                >
                  Users
                </Link>
              </>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded ml-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu}>
          {menuOpen ? (
            <HiX className="h-6 w-6" />
          ) : (
            <HiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-blue-600 flex flex-col items-start p-4 space-y-2 md:hidden z-20">
          <Link onClick={toggleMenu} to="/">Home</Link>
          <Link onClick={toggleMenu} to="/courses">Courses</Link>

          {token ? (
            <>
              <Link onClick={toggleMenu} to="/dashboard">Dashboard</Link>
              <Link onClick={toggleMenu} to="/enrollments">My Courses</Link>

              {role === "admin" && (
                <>
                  <Link onClick={toggleMenu} to="/admin">Admin Dashboard</Link>
                  <Link onClick={toggleMenu} to="/admin/users">Users</Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link onClick={toggleMenu} to="/login">Login</Link>
              <Link onClick={toggleMenu} to="/register">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
