import React, { useState } from "react";
import axios from "axios";
import ViewStudentModal from "./ViewStudentModal";

function ViewStudentForm() {
  const [formData, setFormData] = useState({
    uniqueId: "",
    dob: "",
    maidenName: "",
    elementarySchool: "",
    studentInfo: null,
    showModal: false,
    errorMessage: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/view_student", {
        uniqueId: formData.uniqueId,
        kba_info: {
          dob: formData.dob,
          maiden_name: formData.maidenName,
          elementary_school: formData.elementarySchool,
        },
      });
      if (response.data.message === "Record not found") {
        setFormData({
          ...formData,
          studentInfo: null,
          errorMessage: "Student Record Not Found",
          showModal: true,
        });
      } else {
        setFormData({
          ...formData,
          studentInfo: response.data,
          errorMessage: "",
          showModal: true,
        });
      }
    } catch (error) {
      console.error("Error viewing student:", error.message);
      setFormData({
        ...formData,
        studentInfo: null,
        errorMessage: "Error fetching student information",
        showModal: true,
      });
    }
  };

  const closeModal = () => {
    setFormData({ ...formData, showModal: false });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full pt-12 bg-slate-100">
      <h2 className="mb-12 text-5xl">View Student Record</h2>
      <form
        className="flex flex-col w-[50%] bg-white p-8 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <label className="mb-2">Unique ID:</label>
        <input
          type="text"
          name="uniqueId"
          value={formData.uniqueId}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg outline-none"
          required
        />
        <label className="mb-2">Date of Birth:</label>
        <input
          type="text"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg outline-none"
          required
        />
        <label className="mb-2">Maiden Name:</label>
        <input
          type="text"
          name="maidenName"
          value={formData.maidenName}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg outline-none"
          required
        />
        <label className="mb-2">Elementary School:</label>
        <input
          type="text"
          name="elementarySchool"
          value={formData.elementarySchool}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg outline-none"
          required
        />
        <button
          className="w-full mb-6 px-4 py-2 mt-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          type="submit"
        >
          View Record
        </button>
      </form>

      <ViewStudentModal
        isOpen={formData.showModal}
        closeModal={closeModal}
        studentInfo={formData.studentInfo}
        errorMessage={formData.errorMessage}
      />
    </div>
  );
}

export default ViewStudentForm;
