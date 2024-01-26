import React, { useEffect, useState } from "react";
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
  useEffect(() => {
    //TODO: Fetch articles from DB

    // THIS IS FETCHING FROM LOCALSTORAGE FOR DEMO PURPOSES, REMOVE WHEN INTEGRATING WITH BACKEND
    let files = JSON.parse(localStorage.getItem("files"));
    setArticles(files.map((file) => ({ title: file.name })));
    console.log("LENGTH: ", files[0]);
    // setArticles(files.map((file) => ({ title: file })));
    // console.log("ARTICLES: ", articles);
  }, []);
  const navigate = useNavigate();
  // fetch articles to be consulted
  return (
    <div className="container font-display w-full mx-auto px-4 items-center justify-center pt-20 text-white">
      <ul className="w-96">
        {articles.map((article) => (
          <li key={article.id} className="flex justify-between">
            <div className="px-6 py-4 whitespace-nowrap">
              <div className="text-2xl text-white font-semibold">
                {article.title}
              </div>
            </div>
            <div className="px-6 py-4 whitespace-nowrap text-right">
              <button
                onClick={() => navigate(`/consult/${article.title}`)}
                className="flex items-center uppercase bg-primary text-white px-4 py-1 rounded-lg mx-2"
              >
                <img src={upload} className="w-4 h-4" />
                <h1 className="font-bold">Consult</h1>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
