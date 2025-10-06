import { useEffect, useState } from "react";
import API from "../api"; // ✅ use new axios instance

export default function AdminDashboard() {
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return <p className="text-red-600 text-center mt-10">Access denied ❌</p>;
  }

  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", duration: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const { data } = await API.get("/courses");
      setCourses(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingId) {
        response = await API.put(`/courses/${editingId}`, form);
      } else {
        response = await API.post("/courses", form);
      }

      alert(editingId ? "Course updated!" : "Course added!");
      setForm({ title: "", description: "", duration: "", price: "" });
      setEditingId(null);
      fetchCourses(); // refresh list
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (course) => {
    setEditingId(course._id);
    setForm({
      title: course.title,
      description: course.description,
      duration: course.duration,
      price: course.price,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await API.delete(`/courses/${id}`);
      setCourses(courses.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Add / Edit Course Form */}
      <form onSubmit={handleSubmit} className="border p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {editingId ? "Edit Course" : "Add New Course"}
        </h2>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Course Title"
          className="border p-2 w-full mb-2"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full mb-2"
          required
        />
        <input
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration (e.g. 3 months)"
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 w-full mb-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Course" : "Add Course"}
        </button>
      </form>

      {/* Course List */}
      <h2 className="text-xl font-semibold mb-2">All Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div key={course._id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{course.title}</h3>
            <p>{course.description}</p>
            <p className="text-sm text-gray-600">Duration: {course.duration}</p>
            <p className="font-semibold mt-1">₹{course.price}</p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(course)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
