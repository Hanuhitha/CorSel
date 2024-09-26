import React, { useState } from "react";

const ViewStudentModal = ({
  isOpen,
  closeModal,
  studentInfo,
  errorMessage,
}) => {
  const [displayRecord, setDisplayRecord] = useState(false);

  const handleDisplay = () => {
    setDisplayRecord(true);
  };

  const handleDownload = () => {
    // Handle downloading the record as a file
    if (studentInfo) {
      const recordData = JSON.stringify(studentInfo, null, 2);
      const blob = new Blob([recordData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "student_record.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {studentInfo && !errorMessage && (
              <>
                <h3 className="text-2xl font-bold mb-4 text-green-400">
                  Student Record Found!
                </h3>
                <div className="flex justify-between mb-4 gap-2">
                  <button
                    onClick={handleDisplay}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none"
                  >
                    Display Record
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg focus:outline-none"
                  >
                    Download Record
                  </button>
                </div>
                {displayRecord && (
                  <div>
                    <p>
                      <strong>Name:</strong> {studentInfo.name}
                    </p>
                    <p>
                      <strong>Surname:</strong> {studentInfo.surname}
                    </p>
                    <p>
                      <strong>DOB:</strong> {studentInfo.dob}
                    </p>
                  </div>
                )}
              </>
            )}
            {!studentInfo && errorMessage && (
              <div>
                <h3 className="text-2xl font-bold mb-4 text-red-500">
                  Student Record Not Found
                </h3>
                <p>please verify your Unique Id and KBA Info!</p>
              </div>
            )}
            <button
              onClick={closeModal}
              className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewStudentModal;
