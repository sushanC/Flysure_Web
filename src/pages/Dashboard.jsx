import { useEffect, useState } from "react";
import API from "../api"; // ✅ use axios instance

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/auth/profile"); // ✅ backend profile route
        setUser(data);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user ? (
        <div className="p-4 bg-gray-100 rounded shadow">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
