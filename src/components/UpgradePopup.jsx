import React, { useState } from "react";
import axios from "axios";
const UpgradePopup = ({ id }) => {
  const handleUpgrade = async () => {
    const info = {
      is_staff: true,
    };
    await axios
      .patch(`http://127.0.0.1:8000/api/users/${id}`, info, {
        headers: {
          Authorization: `Bearer ${Cookies.get("_auth")}`,
        },
      })
      .then((res) => {
        alert("Upgraded with success");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        alert("Couldn't upgrade user! check console");
      });
  };

  const handleCancel = () => {
    window.location.reload();
    console.log("Upgrade cancelled.");
  };
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm">
      <form className="ring-2 items-center py-16 px-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-44 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl text-black font-medium text-center mb-4">
          Confirm Upgrade
        </h2>
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
      </form>
    </div>
  );
};

export default UpgradePopup;
