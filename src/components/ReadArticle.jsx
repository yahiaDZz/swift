import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const ReadArticle = () => {
  const [article, setArticle] = useState(null);
  const [articleId, setArticleId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let split = location.pathname.split("/");

    if (split.length <= 2) return;
    setArticleId(split[split.length - 1]);
    console.log("Article id", articleId);
    if (articleId === null) return;
    axios
      .get(`http://127.0.0.1:8000/api/articles/${articleId}/`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("_auth")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setArticle(res.data);
      })
      .catch((err) => {
        console.error("Error fetching article:", err);
        alert("Could not read article");
      });
  }, [articleId]);

  return (
    <div className="container mx-auto py-4 pt-20 text-white">
      {article != null ? (
        <div>
          <p className="mb-2">
            <strong>Title:</strong> {article.title}
          </p>
          <p className="mb-4">
            <strong>Resume:</strong> {article.resume}
          </p>
          <p className="mb-4">
            <strong>Body:</strong> {article.body}
          </p>
          <p className="mb-2">
            <strong>Authors:</strong>{" "}
            {article.authors.map((author) => author.name).join(", ")}
          </p>
          <p className="mb-2">
            <strong>Institutions:</strong>{" "}
            {article.institutions
              .map((institution) => institution.name)
              .join(", ")}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ReadArticle;
