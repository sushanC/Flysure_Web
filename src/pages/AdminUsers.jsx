import { useEffect, useState } from "react";
import API from "../api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin"; // ✅ Check role here

  // 🚫 Restrict access for non-admin users
  if (!isAdmin) {
    return (
      <p className="text-red-600 text-center mt-10">
        Access denied ❌
      </p>
    );
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get("/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(data);
      } catch (err) {
        console.error("Fetch users error:", err);
        alert(err.response?.data?.message || "Failed to fetch users");
      }
    };

    if (token) fetchUsers();
  }, [token]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">All Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Purchased Courses</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
                    <ul className="list-disc ml-5">
                      {user.enrolledCourses.map((course) => (
                        <li key={course._id}>{course.title}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500 italic">No purchases</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
