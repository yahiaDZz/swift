import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

import axios from "axios";
import Cookies from "js-cookie";
import CharactersModified from "./CharactersModified";
const Consult = ({ isMod }) => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated() || !isMod) {
      navigate("/", { replace: true }); // Replace current entry in history
    }
  }, [isAuthenticated, navigate]);

  const location = useLocation();
  const latestRouteString = location.pathname.split("/").pop();
  const id = decodeURIComponent(latestRouteString);

  const [article, setArticle] = useState({
    title: "This is a sample article title",
    resume: "This is a sample article abstract",
    body: "This is a sample article body",
  });
  const [initialArticle, setInitialArticle] = useState({
    title: "This is a sample article title",
    resume: "This is a sample article abstract",
    body: "This is a sample article body",
  });
  const maxLength = 20;
  const [showTitle, setShowTitle] = useState("Article title");

  useEffect(() => {
    console.log("FETCHING:", `http://127.0.0.1:8000/api/articles/${id}`);
    axios
      .get(`http://127.0.0.1:8000/api/articles/${id}/`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("_auth")}`,
        },
      })
      .then((res) => {
        console.log("FETCHED ARTICLE", res.data);
        setArticle(res.data); // associate fetched article data with state
        setInitialArticle(res.data);
        setShowTitle(
          res.data.title.length > maxLength
            ? res.data.title.substring(0, maxLength) + "..."
            : res.data.title
        ); // set article title
      })
      .catch((err) => {
        console.error(err);
        alert("Could not fetch article information! check console");
        // navigate("/");
      });
  }, [navigate]);
  const calculateDifference = (str1, str2) => {
    let differenceCount = 0;

    // Ensure both strings have the same length
    const maxLength = Math.max(str1.length, str2.length);
    const minLength = Math.min(str1.length, str2.length);

    // Loop through each character and compare
    for (let i = 0; i < maxLength; i++) {
      if (i < minLength) {
        if (str1[i] !== str2[i]) {
          differenceCount++;
        }
      } else {
        // If one string is longer than the other, count the extra characters as differences
        differenceCount++;
      }
    }

    return differenceCount;
  };
  const [totalDifference, setTotalDifference] = useState(0);
  const [showCharactersModified, setShowCharactersModified] = useState(false);
  const handleSave = () => {
    const total_diff =
      calculateDifference(initialArticle.title, article.title) +
      calculateDifference(initialArticle.resume, article.resume) +
      calculateDifference(initialArticle.body, article.body);
    setTotalDifference(total_diff);
    setShowCharactersModified(true);
  };

  const handleCancel = () => {
    // Handle canceling editing
    navigate("/articles");
    setArticle({ title: "", resume: "", body: "" });
  };
  // const handleDeleteKeyword = (index) => {
  //   setArticle({
  //     ...article,
  //     keywords: article.keywords.filter((keyword, i) => i !== index),
  //   });
  // };
  return (
    <div className="pt-20  rounded-lg p-4 flex flex-col gap-4 font-primary text-white">
      <h2 className="text-2xl text-white font-bold mb-4">
        Consultation of Article: <br></br>
        {showTitle}
      </h2>

      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
        <label
          htmlFor="title"
          className="font-secondary block text-white font-bold mb-2 sm:mb-0"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className="shadow appearance-none border-2 border-black rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={article.title}
          onChange={(e) => setArticle({ ...article, title: e.target.value })}
        />
      </div>

      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <label
          htmlFor="text"
          className="font-secondary block text-white font-bold mb-2 sm:mb-0"
        >
          Resume
        </label>
        <textarea
          id="text"
          className="shadow appearance-none border-2 border-black rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="5"
          value={article.resume}
          onChange={(e) => setArticle({ ...article, resume: e.target.value })}
        />
      </div>
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <label
          htmlFor="text"
          className="font-secondary block text-white font-bold mb-2 sm:mb-0"
        >
          Body
        </label>
        <textarea
          id="text"
          className="shadow appearance-none border-2 border-black rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="5"
          value={article.body}
          onChange={(e) => setArticle({ ...article, body: e.target.value })}
        />
      </div>
      {showCharactersModified && (
        <CharactersModified
          id={id}
          n_chars_modified={totalDifference}
          patch={{
            title: article.title,
            resume: article.resume,
            body: article.body,
          }}
        />
      )}
      <div className="flex">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={() => handleSave()}
        >
          Save & Publish
        </button>
        <button
          className="bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Consult;
