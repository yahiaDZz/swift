import React, { useState } from "react";

const EditPassword = ({ fullname }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleConfirm = () => {
    // TODO: Check old password
    // TODO IF OK: Change it to new password
    console.log("Password changed successfully!");
    window.location.reload();
  };

  const handleCancel = () => {
    window.location.reload();
    console.log("Upgrade cancelled.");
  };
  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="ring-2 items-center py-2 px-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-72 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl text-black font-medium text-center mb-4">
          Change password
        </h2>
        <div className="mb-4">
          <label
            htmlFor="oldPassword"
            className="block font-bold mb-1 text-black"
          >
            Old Password:
          </label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block font-bold mb-1 text-black"
          >
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="flex items-center justify-center px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:ring-4 focus:ring-red-200 text-xl"
            type="button"
            onClick={() => handleCancel()}
          >
            cancel
          </button>
          <button
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 text-2xl"
            type="button"
            onClick={() => handleUpgrade()}
          >
            confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPassword;
