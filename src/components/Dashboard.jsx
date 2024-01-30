import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import upload from "../assets/upload.png";
import eks from "../assets/eks.png";
import uparrow from "../assets/uparrow.png";
import downarrow from "../assets/downarrow.png";
import UpgradePopup from "./UpgradePopup";
import DowngradePopup from "./DowngradePopup";
import DeletePopup from "./DeletePopup";
const Dashboard = () => {
  //TODO: Handle roles with Tokens

  const [users, setUsers] = useState([
    {
      id: 1,
      fullname: "John Mod",
      role: "MOD",
    },
    {
      id: 2,
      fullname: "John Admin",
      role: "ADMIN",
    },
    {
      id: 3,
      fullname: "John Normal",
      role: "NORMAL",
    },
  ]);

  const navigate = useNavigate();

  const [showDelete, setShowDelete] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showDowngrade, setShowDowngrade] = useState(false);

  const handleDelete = (e) => {
    setShowDelete(true);
    //TODO: Delete User from DB
  };
  const handleUpgrade = (e) => {
    setShowUpgrade(true);
    //TODO: Upgrade User from DB
  };
  const handleDowngrade = (e) => {
    setShowDowngrade(true);
    //TODO: Downgrade User from DB
  };

  return (
    <div className="container font-display w-full mx-auto px-4 items-center justify-center pt-20">
      <table className="w-full ">
        <tbody className="items-center">
          {users.map((user) => (
            <tr
              key={user.id}
              className={`ring-1 ${
                user.role == "ADMIN" ? "bg-gray-300" : "bg-white"
              }`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-2xl text-black font-semibold">
                  {user.fullname}
                </div>
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-2xl text-black font-regular">
                  {user.role}
                </div>
              </td> */}
              <td className="flex items-center px-6 py-4 whitespace-nowrap text-right">
                {user.role != "ADMIN" && (
                  <>
                    <button
                      onClick={() => handleDelete(user.fullname)}
                      className="flex items-center uppercase bg-red-600 text-white px-4 py-1 rounded-lg mx-2 space-x-2"
                    >
                      <h1 className="font-bold uppercase text-2xl">X</h1>
                      {showDelete && <DeletePopup fullname={user.fullname} />}
                    </button>
                    {user.role == "NORMAL" && (
                      <button
                        onClick={() => handleUpgrade(user.fullname)}
                        className="flex items-center uppercase bg-blue-400 text-white px-4 py-1 rounded-lg mx-2 space-x-2"
                      >
                        <img src={uparrow} className="w-6 h-6" />
                        {showUpgrade && (
                          <UpgradePopup fullname={user.fullname} />
                        )}
                      </button>
                    )}
                    {user.role == "MOD" && (
                      <button
                        onClick={() => handleDowngrade(user.fullname)}
                        className="flex items-center uppercase bg-red-600 text-white px-4 py-1 rounded-lg mx-2 space-x-2"
                      >
                        <img src={uparrow} className="rotate-180 w-6 h-6" />
                        {showDowngrade && (
                          <DowngradePopup fullname={user.fullname} />
                        )}
                      </button>
                    )}
                  </>
                )}
                {user.role == "ADMIN" && (
                  <h1 className="font-bold uppercase text-center w-full text-2xl">
                    /
                  </h1>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
