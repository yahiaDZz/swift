import axios from "axios";
import React, { useState } from "react";

const DeletePopup = ({ id }) => {
  const handleDelete = async () => {
    await axios
      .delete(`http://127.0.0.1:8000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("_auth")}`,
        },
      })
      .then((res) => {
        alert("Deleted with success");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        alert("Couldn't delete user! check console");
      });
  };

  const handleCancel = () => {
    window.location.reload();
    console.log("Delete cancelled.");
  };
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm">
      <form className="ring-2 items-center py-16 px-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-44 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-medium text-center text-black mb-4">
          Confirm Delete
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
            onClick={() => handleDelete()}
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeletePopup;
