import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const IsAddingPopup = ({ id }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm">
      <form className="ring-2 items-center py-16 px-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-44 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl text-black font-medium text-center mb-4">
          Adding to favorites...
        </h2>
      </form>
    </div>
  );
};

export default IsAddingPopup;
