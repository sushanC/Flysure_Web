import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // axios instance

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/auth/login", { email, password });

      // ✅ Store token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("userName", data.user.name);

      // ✅ Force a small delay to ensure any global state or routes re-render properly
      setTimeout(() => {
        navigate("/"); // or navigate("/dashboard") if that's your main page
      }, 100);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 w-full mb-3"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </form>
      {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
    </div>
  );
}


