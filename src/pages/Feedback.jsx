import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    message: "",
  });

  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Feedback
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/feedback`,
        formData
      );

      if (response.status === 201) {
        alert("Thank you for your feedback!");
        navigate("/"); // Redirect to Home
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">User Feedback</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full border px-3 py-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="course"
            placeholder="Your Course"
            className="w-full border px-3 py-2 rounded"
            value={formData.course}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full border px-3 py-2 rounded"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
