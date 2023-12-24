import React, { useState } from "react";
import upload from "../assets/upload.png";
import { useNavigate } from "react-router-dom";
const Articles = () => {
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
  // fetch articles to be consulted
  return (
    <div className="container font-display w-full mx-auto px-4 items-center justify-center pt-20">
      <table className="w-full ">
        <tbody className="items-center">
          {articles.map((article) => (
            <tr key={article.id} className="ring-1">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-2xl text-black font-semibold">
                  {article.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <button
                  onClick={() => navigate(`/consult/${article.title}`)}
                  className="flex items-center uppercase bg-primary text-white px-4 py-1 rounded-lg mx-2"
                >
                  <img src={upload} className="w-4 h-4" />
                  <h1 className="font-bold">Consult</h1>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Articles;
