import React, { useEffect, useState } from "react";
import upload from "../assets/upload.png";
import { useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import Cookies from "js-cookie";

const Articles = ({ isMod }) => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated() || !isMod) {
      navigate("/", { replace: true }); // Replace current entry in history
    }
  }, [isAuthenticated, navigate]);

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
    // GET THE LIST OF ARTICLES
    axios
      .get("http://127.0.0.1:8000/api/articles", {
        headers: {
          Authorization: `Bearer ${Cookies.get("_auth")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setArticles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // THIS IS FETCHING FROM LOCALSTORAGE FOR DEMO PURPOSES, REMOVE WHEN INTEGRATING WITH BACKEND
    let files = JSON.parse(localStorage.getItem("files"));
    if (files == null) return;
    setArticles(files.map((file) => ({ title: file.name })));
    // setArticles(files.map((file) => ({ title: file })));
    // console.log("ARTICLES: ", articles);
  }, []);
  // fetch articles to be consulted
  return (
    <div className="container font-display w-full h-full mx-auto px-4 flex items-center justify-center pt-20 text-white">
      <ul className="w-[100%] flex flex-col items-center justify-center">
        {articles.length === 0 && (
          <div className="flex justify-center">
            <h1 className="text-2xl">No articles uploaded yet</h1>
          </div>
        )}
        {articles != null &&
          articles.map((article, index) => (
            <li key={index} className="flex justify-between">
              {/* <div className="px-2 py-4 whitespace-nowrap"> */}
              <div className="flex">
                <div className="py-4 text-2xl text-white font-semibold">
                  {article.title}
                </div>
                {/* </div> */}
                <div className=" py-4">
                  <button
                    onClick={() => navigate(`/consult/${article.id}`)}
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
