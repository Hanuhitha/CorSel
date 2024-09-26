import React, { useState } from "react";
import axios from "axios";
import RegistrationModal from "./RegistrationModal";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    dob: "",
    maidenName: "",
    elementarySchool: "",
    uniqueId: "",
    kbaHash: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", {
        name: formData.name,
        surname: formData.surname,
        dob: formData.dob,
        maiden_name: formData.maidenName,
        elementary_school: formData.elementarySchool,
      });
      setFormData({
        ...formData,
        uniqueId: response.data.uniqueId,
        kbaHash: response.data.kbaHash,
        showModal: true,
      });
    } catch (error) {
      console.error("Error registering student:", error.message);
    }
  };
  const closeModal = () => {
    setFormData({ ...formData, showModal: false });
  };
  return (
    <div className="flex flex-col items-center justify-center h-full pt-12 bg-slate-100">
      <h2 className="mb-12 text-5xl">Register Student</h2>
      <form
        className="flex flex-col w-[50%] bg-white p-8 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg outline-none"
          required
        />
        <label>Surname:</label>
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg outline-none"
          required
        />
        <label>Date of Birth:</label>
        <input
          type="text"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          placeholder="yyyy-mm-dd"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg outline-none"
          required
        />
        <label>Maiden Name:</label>
        <input
          type="text"
          name="maidenName"
          value={formData.maidenName}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg outline-none"
          required
        />
        <label>Elementary School:</label>
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
          Register
        </button>
      </form>

      <RegistrationModal
        isOpen={formData.showModal}
        closeModal={closeModal}
        uniqueId={formData.uniqueId}
      />
    </div>
  );
}

export default RegistrationForm;
