import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem("role") || "user");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole("user");
    navigate("/login");
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, []);

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Flysure</Link>

      {/* Hamburger menu for mobile */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      <ul className={`md:flex md:items-center gap-4 ${menuOpen ? "block" : "hidden"}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/feedback">Feedback</Link></li> {/* Visible to all users */}

        {role === "admin" && (
          <>
            <li><Link to="/admin/feedbacks">Admin Feedback</Link></li>
            <li><Link to="/admin">Admin Dashboard</Link></li>
            <li><Link to="/admin/users">Users</Link></li>
          </>
        )}

        {localStorage.getItem("token") ? (
          <li>
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
              Logout
            </button>
          </li>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
