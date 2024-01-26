import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Consult = ({ articleInfo }) => {
  const navigate = useNavigate();
  //TODO: Get token
  // check token roles
  const location = useLocation();
  const latestRouteString = location.pathname.split("/").pop();
  const decodedRouteString = decodeURIComponent(latestRouteString);

  const [article, setArticle] = useState({
    title: "This is a sample article title",
    text: "This is a sample article text",
    keywords: ["keyword1", "keyword2", "keyword3"],
  });

  const maxLength = 20;
  const [showTitle, setShowTitle] = useState("");
  useEffect(() => {
    console.log(decodedRouteString);
    // truncating article title if too long
    setShowTitle(
      decodedRouteString.length > maxLength
        ? decodedRouteString.substring(0, maxLength) + "..."
        : decodedRouteString
    );

    //TODO: Fetch article data from DB (the data treated by ElasticSearch)
  }, [decodedRouteString]);

  const handleSave = () => {
    //TODO: Handle saving article data to ElasticSearch here
    console.log("Article saved:", article);
  };

  const handleCancel = () => {
    // Handle canceling editing
    navigate("/articles");
    setArticle({ title: "", text: "", keywords: [] });
  };
  const handleDeleteKeyword = (index) => {
    setArticle({
      ...article,
      keywords: article.keywords.filter((keyword, i) => i !== index),
    });
  };
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
          Text
        </label>
        <textarea
          id="text"
          className="shadow appearance-none border-2 border-black rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="5"
          value={article.text}
          onChange={(e) => setArticle({ ...article, text: e.target.value })}
        />
      </div>

      <div className="mb-4 flex flex-wrap sm:flex-row gap-2">
        <label
          htmlFor="keywords"
          className="font-secondary block text-white font-bold mb-2 sm:mb-0"
        >
          Keywords
        </label>
        {article.keywords.map((keyword, index) => (
          <div key={index} className="w-1/3 sm:w-1/4 pr-4 ">
            <input
              type="text"
              className="shadow appearance-none border-2 border-black rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={keyword}
              onChange={(e) =>
                setArticle({
                  ...article,
                  keywords: article.keywords.map((kw, i) =>
                    i === index ? e.target.value : kw
                  ),
                })
              }
            />
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded-full ml-2"
              onClick={() => handleDeleteKeyword(index)}
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        ))}
        <div className="w-1/3 sm:w-1/4 pr-4">
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              setArticle({
                ...article,
                keywords: [...article.keywords, "UNDEFINED"],
              })
            }
          >
            Add
          </button>
        </div>
      </div>

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
