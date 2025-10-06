import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import API from "../api";

export default function SingleCourse() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await API.get(`/courses/${id}`);
        setCourse(data);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to load course");
      }
    };
    fetchCourse();
  }, [id]);

  const enroll = async () => {
    if (!token) {
      alert("Please login to enroll");
      return;
    }

    try {
      await API.post("/enrollments", { courseId: course._id });
      alert("Enrolled successfully! Complete payment using the QR code.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Enrollment failed");
    }
  };
  const handleEnroll = (courseId) => {
  // 👉 Save the selected courseId temporarily (you can also use context if needed)
  localStorage.setItem("selectedCourseId", courseId);
  navigate("/payment");
};


  if (!course) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto border rounded p-6 shadow mt-6">
      <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
      <p className="mb-2">{course.description}</p>
      <p><strong>Duration:</strong> {course.duration}</p>
      <p><strong>Price:</strong> ₹{course.price}</p>

      {course.qrCodeURL && (
        <div className="my-4 text-center">
          <h3 className="font-bold mb-2">Scan & Pay</h3>
          <img src={course.qrCodeURL} alt="QR Code" className="mx-auto w-48" />
        </div>
      )}

      <button
      onClick={() => handleEnroll(course._id)}
      className="bg-green-600 text-white px-3 py-1 rounded"
    >
      Enroll
    </button>
    </div>
  );
}
