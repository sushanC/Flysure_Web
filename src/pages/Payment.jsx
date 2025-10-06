import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Payment() {
  const navigate = useNavigate();

  const handleConfirmPayment = async () => {
    const courseId = localStorage.getItem("selectedCourseId");
    if (!courseId) return alert("No course selected.");

    try {
      await API.post("/enrollments", { courseId });
      alert("Payment confirmed! You are enrolled.");
      localStorage.removeItem("selectedCourseId");
      navigate("/enrollments");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Enrollment failed");
    }
  };

  // 👇 Admin bank details
  const adminDetails = {
    accountName: "MR SUPRABH BILLAVA",
    accountNumber: "520101256940579",
    ifsc: "UBIN0901784",
    mobile: "+91 80887 97190",
    whatsapp: "+91 80887 97190",
  };

  return (
    <div className="p-6 max-w-md mx-auto border rounded shadow bg-gray-50 text-center">
      <h1 className="text-2xl font-bold mb-4">Payment Instructions</h1>
      <p className="mb-4 text-gray-700">
        Please transfer the course fee to the following bank account:
      </p>

      <div className="text-left mb-4">
        <p><span className="font-semibold">Account Name:</span> {adminDetails.accountName}</p>
        <p><span className="font-semibold">Account Number:</span> {adminDetails.accountNumber}</p>
        <p><span className="font-semibold">IFSC Code:</span> {adminDetails.ifsc}</p>
        <p><span className="font-semibold">Mobile Number:</span> {adminDetails.mobile}</p>
      </div>

      <p className="mb-4">
        After transferring, please take a screenshot of your payment and send it via WhatsApp to confirm:
      </p>

      <a
        href={`https://wa.me/message/Y7QI3IDM2ZMHG1`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
      >
        Send Screenshot on WhatsApp
      </a>

      <p className="text-gray-600 mb-4">Once confirmed, click the button below to complete your enrollment.</p>

      <button
        onClick={handleConfirmPayment}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        I Have Paid ✅
      </button>
    </div>
  );
}
