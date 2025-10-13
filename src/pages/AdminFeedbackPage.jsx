import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/feedback`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFeedbacks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-xl font-bold mb-4">User Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {feedbacks.map((f) => (
            <div key={f._id} className="border p-3 rounded shadow-sm">
              <p><strong>Name:</strong> {f.name}</p>
              <p><strong>Course:</strong> {f.course}</p>
              <p><strong>Message:</strong> {f.message}</p>
              <p className="text-gray-500 text-sm">{new Date(f.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
