import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import upload from "../assets/upload.png";
import edit from "../assets/edit.png";
import EditUsername from "./EditUsername";
import EditPassword from "./EditPassword";
const Settings = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Article 1.pdf",
    },
    { id: 2, title: "Article 2.pdf" },
    { id: 3, title: "Article 3.pdf" },
  ]);
  useEffect(() => {
    //TODO: LOAD PREFERRED ARTICLES FROM DB AND SET TO ARTICLES OBJ
  });
  const [editFullname, setEditFullname] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("Johndoe123@");
  const handleDelete = (article) => {
    let id = article.id;
    console.log("Deleting article with id:", id);
    //TODO: DELETE ARTICLE FROM DB
  };
  return (
    <div className="text-white font-primary container font-display w-full mx-auto px-4 items-center justify-center pt-20">
      <div className="w-full">
        <div className="items-center ">
          <div className="lg:flex items-center justify-around">
            <div className="px-6 whitespace-nowrap">
              <div className="uppercase text-2xl font-semibold">Fullname</div>
            </div>
            <div className="px-6 py-4 whitespace-nowrap">
              <div className="text-2xl font-semibold ">{username}</div>
            </div>
            <div className="px-6 py-4 whitespace-nowrap text-right">
              <button
                onClick={() => setEditFullname(true)}
                className="flex space-x-2 items-center uppercase bg-primary text-white px-4 py-1 rounded-lg mx-2"
              >
                <img src={edit} className="w-3 h-3" />
                <h1 className="font-bold uppercase">edit</h1>
              </button>
            </div>
          </div>
          {editFullname && <EditUsername username={username} />}
          <div className="lg:flex items-center justify-around">
            <div className="px-6 py-4 whitespace-nowrap">
              <div className="uppercase text-2xl  font-semibold">password</div>
            </div>
            <div className="px-6 py-4 whitespace-nowrap">
              <div className="text-2xl  font-semibold uppercase">xxxxxxxx</div>
            </div>
            <div className="px-6 py-4 whitespace-nowrap text-right">
              <button
                onClick={() => setEditPassword(true)}
                className="flex space-x-2 items-center uppercase bg-primary text-white px-4 py-1 rounded-lg mx-2"
              >
                <img src={edit} className="w-4 h-4" />
                <h1 className="font-bold uppercase">edit</h1>
              </button>
            </div>
          </div>
          {editPassword && <EditPassword />}
        </div>
      </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="p-4">Preferred Articles</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((item, index) => (
            <tr key={index}>
              <td className="p-4 underline">
                <Link to="/articles" target="_blank">
                  {item.title}
                </Link>
              </td>
              <td className="p-4">
                <button
                  className="flex items-center justify-center px-2 py-1 text-white bg-red-600 rounded-md hover:bg-red-700 focus:ring-4 focus:ring-red-200 text-lg"
                  type="button"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Settings;
