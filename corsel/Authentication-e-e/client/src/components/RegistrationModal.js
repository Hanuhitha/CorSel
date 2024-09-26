import React, { useRef } from "react";
import { Link } from "react-router-dom";

const RegistrationModal = ({ isOpen, closeModal, uniqueId }) => {
  const uniqueIdRef = useRef(null);

  const copyUniqueIdToClipboard = () => {
    if (uniqueIdRef.current) {
      uniqueIdRef.current.select();
      document.execCommand("copy");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-green-400">
              Registration Successful!
            </h3>
            <p className="text-s font-bold mb-4 text-red-500">
              NOTE: copy your Unique Id and do not share it with anyone!
            </p>
            <div className="mb-4 flex items-center">
              <strong>Unique ID:</strong>
              <input
                type="text"
                ref={uniqueIdRef}
                value={uniqueId}
                readOnly
                className="ml-2 p-1 border border-gray-300"
                style={{ width: "200px" }}
              />
              <button
                onClick={copyUniqueIdToClipboard}
                className="ml-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none"
              >
                Copy
              </button>
            </div>

            <div className="flex flex-row justify-between mt-6">
              <button
                onClick={closeModal}
                className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg focus:outline-none"
              >
                Close
              </button>
              <Link
                to={"/view-credentials"}
                className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none"
              >
                View Credentials
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegistrationModal;
