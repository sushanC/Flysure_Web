import { useEffect, useState } from "react";
import API from "../api";

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/feedback", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbacks(res.data);
      } catch (err) {
        console.error(err);
        alert(
          err.response?.data?.message || "Failed to fetch feedbacks. Check console."
        );
      }
      setLoading(false);
    };
    fetchFeedbacks();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">User Feedback</h2>
      {feedbacks.length === 0 && <p>No feedbacks yet.</p>}
      {feedbacks.map((f) => (
        <div
          key={f._id}
          className="border p-4 rounded mb-3 shadow-sm bg-gray-50"
        >
          <h4 className="font-semibold">
            {f.name} - {f.course}
          </h4>
          <p>{f.message}</p>
          <small className="text-gray-500">
            {new Date(f.date).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}
