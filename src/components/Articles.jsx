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
    if (files == null) return;
    setArticles(files.map((file) => ({ title: file.name })));
    console.log("LENGTH: ", files[0]);
    // setArticles(files.map((file) => ({ title: file })));
    // console.log("ARTICLES: ", articles);
  }, []);
  const navigate = useNavigate();
  // fetch articles to be consulted
  return (
    <div className="container font-display w-full mx-auto px-4 flex items-center justify-center pt-20 text-white">
      <ul className="w-[100%]">
        {articles.length === 0 && (
          <div className="flex justify-center">
            <h1 className="text-2xl">No articles uploaded yet</h1>
          </div>
        )}
        {articles != null &&
          articles.map((article) => (
            <li key={article.id} className="flex justify-between">
              {/* <div className="px-2 py-4 whitespace-nowrap"> */}
              <div className="flex">
                <div className="py-4 text-2xl text-white font-semibold">
                  {article.title}
                </div>
                {/* </div> */}
                <div className=" py-4">
                  <button
                    onClick={() => navigate(`/consult/${article.title}`)}
                    className="flex items-center uppercase bg-primary text-white px-4 py-1 rounded-lg mx-2"
                  >
                    <img src={upload} className="w-4 h-4" />
                    <h1 className="font-bold">Consult</h1>
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Articles;
