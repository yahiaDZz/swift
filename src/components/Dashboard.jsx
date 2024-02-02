import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import upload from "../assets/upload.png";
import eks from "../assets/eks.png";
import uparrow from "../assets/uparrow.png";
import downarrow from "../assets/downarrow.png";
import UpgradePopup from "./UpgradePopup";
import DowngradePopup from "./DowngradePopup";
import DeletePopup from "./DeletePopup";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import axios from "axios";

const Dashboard = ({ isAdmin }) => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    if (!isAuthenticated() || !isAdmin) {
      navigate("/", { replace: true }); // Replace current entry in history
    }
  }, [isAuthenticated, navigate]);
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
  useEffect(() => {
    //FETCH USERS INFO FROM DB
    axios
      .get("http://localhost:8000/api/users", {
        headers: {
          Authorization: `Bearer ${Cookies.get("_auth")}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Could not fetch users!");
        navigate("/");
      });
  });
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
      <h1 className="text-white text-center text-2xl font-semibold mb-4">
        User Management
      </h1>
      <table className="w-full ">
        <tbody className="items-center">
          {users.map((user, index) => (
            <tr
              key={index}
              className={`ring-1 ${user.is_admin ? "bg-gray-300" : "bg-white"}`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-2xl text-black font-semibold">
                  {user.username}
                </div>
              </td>
              <td className="flex items-center px-6 py-4 whitespace-nowrap text-right">
                {!user.is_admin && (
                  <>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="flex items-center uppercase bg-red-600 text-white px-4 py-1 rounded-lg mx-2 space-x-2"
                    >
                      <h1 className="font-bold uppercase text-2xl">X</h1>
                      {showDelete && <DeletePopup id={user.id} />}
                    </button>
                    {user.role == "NORMAL" && (
                      <button
                        onClick={() => handleUpgrade(user.id)}
                        className="flex items-center uppercase bg-blue-400 text-white px-4 py-1 rounded-lg mx-2 space-x-2"
                      >
                        <img src={uparrow} className="w-6 h-6" />
                        {showUpgrade && <UpgradePopup id={user.id} />}
                      </button>
                    )}
                    {user.is_staff && (
                      <button
                        onClick={() => handleDowngrade(user.id)}
                        className="flex items-center uppercase bg-red-600 text-white px-4 py-1 rounded-lg mx-2 space-x-2"
                      >
                        <img src={uparrow} className="rotate-180 w-6 h-6" />
                        {showDowngrade && <DowngradePopup id={user.id} />}
                      </button>
                    )}
                  </>
                )}
                {user.is_admin && (
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
