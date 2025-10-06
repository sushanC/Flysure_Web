import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // ✅ use axios instance

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const { data } = await API.get("/courses"); // ✅ relative path
      setCourses(data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to fetch courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Enroll in a course
  const handleEnroll = (courseId) => {
  // 👉 Save the selected courseId temporarily (you can also use context if needed)
  localStorage.setItem("selectedCourseId", courseId);
  navigate("/payment");
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course._id} className="border p-4 rounded shadow">
  <h2 className="text-lg font-semibold">{course.title}</h2>
  <p>{course.description}</p>
  <p className="font-bold mt-2">₹{course.price}</p>

  <div className="mt-3 space-x-2">
    {/* Enroll button → goes to payment page */}
    <button
      onClick={() => handleEnroll(course._id)}
      className="bg-green-600 text-white px-3 py-1 rounded"
    >
      Enroll
    </button>

    {/* View this course → goes to SingleCourse.jsx */}
    <button
      onClick={() => navigate(`/courses/${course._id}`)}
      className="bg-blue-600 text-white px-3 py-1 rounded"
    >
      View this course
    </button>
  </div>
</div>

        ))}
      </div>
    </div>
  );
}
