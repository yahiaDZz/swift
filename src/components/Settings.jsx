import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import upload from "../assets/upload.png";
import edit from "../assets/edit.png";
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
  const navigate = useNavigate();
  return (
    <div className="text-white font-primary container font-display w-full mx-auto px-4 items-center justify-center pt-20">
      <table className="w-full ">
        <tbody className="items-center">
          <tr className="">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="uppercase text-2xl text-black font-semibold">
                Notifications
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-2xl text-black font-semibold uppercase">
                Enabled
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              <button
                onClick={() => navigate("/")}
                className="flex items-center uppercase bg-primary text-white px-4 py-1 rounded-lg mx-2"
              >
                <img src={edit} className="w-3 h-3" />
                <h1 className="font-bold uppercase">edit</h1>
              </button>
            </td>
          </tr>
          <tr className="">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="uppercase text-2xl text-black font-semibold">
                Fullname
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-2xl text-black font-semibold uppercase">
                John doe
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              <button
                onClick={() => navigate(`/`)}
                className="flex items-center uppercase bg-primary text-white px-4 py-1 rounded-lg mx-2"
              >
                <img src={edit} className="w-3 h-3" />
                <h1 className="font-bold uppercase">edit</h1>
              </button>
            </td>
          </tr>
          <tr className="">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="uppercase text-2xl text-black font-semibold">
                Email
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-2xl text-black font-semibold">
                johndoe@gmail.com
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              <button
                onClick={() => navigate(`/consult/${article.title}`)}
                className="flex items-center uppercase bg-primary text-white px-4 py-1 rounded-lg mx-2"
              >
                <img src={edit} className="w-4 h-4" />
                <h1 className="font-bold uppercase">edit</h1>
              </button>
            </td>
          </tr>
          <tr className="">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="uppercase text-2xl text-black font-semibold">
                password
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-2xl text-black font-semibold uppercase">
                xxxxxxxxxx
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              <button
                onClick={() => navigate(`/consult/${article.title}`)}
                className="flex items-center uppercase bg-primary text-white px-4 py-1 rounded-lg mx-2"
              >
                <img src={edit} className="w-4 h-4" />
                <h1 className="font-bold uppercase">edit</h1>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Settings;
