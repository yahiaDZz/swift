import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const CharactersModified = ({ id, n_chars_modified, patch }) => {
  useEffect(() => {
    console.log("PATCH:", patch);
  }, []);
  const handleSave = async () => {
    await axios
      .patch(
        `http://127.0.0.1:8000/api/articles/${id}/`,
        {
          title: patch.title,
          resume: patch.resume,
          body: patch.body,
        },
        {
          headers: { Authorization: `Bearer ${Cookies.get("_auth")}` },
          "Content-Type": "application/json",
        }
      )
      .then((res) => {
        alert("Saved with success");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        alert("Couldn't Save article! check console");
      });
  };

  const handleCancel = () => {
    window.location.reload();
    console.log("Save cancelled.");
  };
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm">
      <form className="ring-2 items-center py-16 px-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl text-black font-medium text-center mb-4">
          Confirm Saving?<br></br> modified: {n_chars_modified} characters
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
            onClick={() => handleSave()}
          >
            confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default CharactersModified;
