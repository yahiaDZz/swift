import React from "react";

const DowngradePopup = ({ fullname }) => {
  const handleDowngrade = () => {
    //TODO: Downgrade user from database
    console.log("Downgrade confirmed!");
  };

  const handleCancel = () => {
    window.location.reload();
    console.log("Downgrade cancelled.");
  };
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm">
      <form className="ring-2 items-center py-16 px-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl text-black font-medium text-center mb-4">
          Confirm Downgrade of <span className="underline">{fullname}</span>
        </h2>
        <div className="flex items-center justify-between">
          <button
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:ring-4 focus:ring-red-200 text-2xl"
            type="button"
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 text-2xl"
            type="button"
            onClick={() => handleDowngrade()}
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default DowngradePopup;
