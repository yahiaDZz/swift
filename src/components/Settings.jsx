import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import upload from "../assets/upload.png";
import edit from "../assets/edit.png";
import EditUsername from "./EditUsername";
import EditPassword from "./EditPassword";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import axios from "axios";
import Cookies from "js-cookie";

const Settings = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/", { replace: true }); // Replace current entry in history
    }
  }, [isAuthenticated, navigate]);
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
    axios
      .get("http://127.0.0.1:8000/api/user", {
        headers: { Authorization: `Bearer ${Cookies.get("_auth")}` },
      })
      .then((res) => {
        console.log(res.data);
        setArticles(res.data.favorites);
      })
      .catch((err) => {
        console.error(err);
        alert("Could not fetch preferred articles! check the console");
      });
  }, []);
  const [editFullname, setEditFullname] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [username, setUsername] = useState("Johndoe123@");
  const handleDelete = async (article) => {
    let id = article.id;
    console.log("Deleting preferred article with id:", id);
    //TODO: DELETE ARTICLE FROM DB
    await axios
      .patch(
        "http://127.0.0.1:8000/api/user",
        {
          favorite: article.id,
        },
        {
          headers: { Authorization: `Bearer ${Cookies.get("_auth")}` },
        }
      )
      .then((res) => {
        alert("Deleted article from favorite list successfully!");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        alert("Could not delete article from favorite list! check the console");
      });
  };
  return (
    <div className="text-white font-primary container font-display w-full mx-auto px-4 flex flex-col items-center justify-center pt-20">
      <div className="w-full">
        <div className="items-center ">
          <div className="lg:flex items-center justify-around">
            <div className="px-6 py-4 whitespace-nowrap">
              <div className="uppercase text-2xl font-semibold">password</div>
            </div>
            <div className="px-6 py-4 whitespace-nowrap">
              <div className="text-2xl  font-semibold uppercase">
                xxxxxxxxxx
              </div>
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
            <th className="p-4 text-xl">Preferred Articles</th>
          </tr>
        </thead>
        <tbody>
          {articles &&
            articles.map((item, index) => (
              <tr key={index}>
                <td className="p-4 underline">
                  <Link to="/articles" target="_blank">
                    {item.title.length > 20
                      ? item.title.slice(0, 20) + "..."
                      : item.title}
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
