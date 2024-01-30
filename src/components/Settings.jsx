import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import upload from "../assets/upload.png";
import edit from "../assets/edit.png";
import EditUsername from "./EditUsername";
import EditPassword from "./EditPassword";
const Settings = () => {
  const [articles, setArticles] = useState([
    {
      title: "Article 1.pdf",
    },
    {
      title: "Article 2.pdf",
    },
    {
      title: "Article 3.pdf",
    },
  ]);
  const [editFullname, setEditFullname] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("John Doe");
  return (
    <div className="text-white font-primary container font-display w-full mx-auto px-4 items-center justify-center pt-20">
      <table className="w-full ">
        <tbody className="items-center">
          <tr className="">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="uppercase text-2xl font-semibold">Fullname</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-2xl font-semibold ">{username}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              <button
                onClick={() => setEditFullname(true)}
                className="flex space-x-2 items-center uppercase bg-primary text-white px-4 py-1 rounded-lg mx-2"
              >
                <img src={edit} className="w-3 h-3" />
                <h1 className="font-bold uppercase">edit</h1>
              </button>
            </td>
          </tr>
          {editFullname && <EditUsername username={username} />}
          <tr className="">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="uppercase text-2xl  font-semibold">password</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-2xl  font-semibold uppercase">
                xxxxxxxxxx
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              <button
                onClick={() => setEditPassword(true)}
                className="flex space-x-2 items-center uppercase bg-primary text-white px-4 py-1 rounded-lg mx-2"
              >
                <img src={edit} className="w-4 h-4" />
                <h1 className="font-bold uppercase">edit</h1>
              </button>
            </td>
          </tr>

          {editPassword && <EditPassword />}
        </tbody>
      </table>
    </div>
  );
};

export default Settings;
