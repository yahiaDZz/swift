import React, { useState } from "react";
import upload from "../assets/upload.png";
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
  // fetch articles to be consulted
  return (
    <div className="container mx-auto px-4 items-center justify-center pt-20">
      <h1 className="text-2xl font-bold mb-4 text-center">ARTICLES</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {articles.map((article) => (
            <tr key={article.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{article.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <button
                  onClick={() => navigate("/consult")}
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
