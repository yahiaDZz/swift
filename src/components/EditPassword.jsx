import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";

const EditPassword = ({ fullname }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const passwordStrengthRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const signOut = useSignOut();
  const navigate = useNavigate();
  const handleConfirm = async () => {
    if (!passwordStrengthRegex.test(newPassword)) {
      alert("Weak Passowrd, enter a stronger one!");
      return;
    } else if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }
    await axios
      .post(
        "http://127.0.0.1:8000/api/user/reset",
        {
          old_password: oldPassword,
          new_password: newPassword,
          confirm_new_password: confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_auth")}`,
          },
        }
      )
      .then((res) => {
        alert("Password changed successfully!");
        signOut();
        navigate("/login");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        alert(
          "Could not change password, please try again later! check console"
        );
        navigate("/");
      });
  };

  const handleCancel = () => {
    window.location.reload();
    console.log("Password reset cancelled.");
  };
  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="ring-2 items-center py-2 px-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-100 rounded-lg shadow-md">
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
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block font-bold mb-1 text-black"
          >
            Confirm New Password:
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
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
            onClick={() => handleConfirm()}
          >
            confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPassword;
