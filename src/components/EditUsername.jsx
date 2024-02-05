import React, { useState } from "react";

const EditUsername = ({ username }) => {
  const [newUsername, setNewUsername] = useState("");
  const handleConfirm = () => {
    //TODO: Upgrade user in database
    console.log("Change confirmed!");
    console.log(newUsername);
    window.location.reload();
  };
  const handleInputChange = (event) => {
    setNewUsername(event.target.value);
  };
  const handleCancel = () => {
    window.location.reload();
    console.log("Upgrade cancelled.");
  };
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm">
      <form className="ring-2 items-center py-4 px-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-52 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl text-black font-medium text-center mb-4">
          Change username of <span className="underline">{username}</span>
        </h2>
        <label htmlFor="username" className="block font-bold text-black">
          New Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={newUsername}
          onChange={handleInputChange}
          className="mb-4 border border-black rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
        />
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
            onClick={() => handleConfirm()}
          >
            confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUsername;
