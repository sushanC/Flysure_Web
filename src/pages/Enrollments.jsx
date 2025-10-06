import { useEffect, useState } from "react";
import API from "../api"; // ✅ updated import path

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const { data } = await API.get("/enrollments/my"); // ✅ backend route
        setEnrollments(data);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to fetch enrollments");
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Enrollments</h1>
      {enrollments.map((enrollment) => (
  <div key={enrollment._id} className="border p-4 rounded shadow">
    {enrollment.course ? (
  <>
    <h2 className="font-bold">{enrollment.course.title}</h2>
    <p>{enrollment.course.description}</p>
    <p className="mt-2 text-sm text-gray-600">
      Enrolled on: {new Date(enrollment.createdAt).toLocaleDateString()}
    </p>
  </>
) : (
  <p className="text-yellow-600 italic">
    ⚠️ This course is no longer available.
  </p>
)}
  </div>
))}
    </div>
  );
}
