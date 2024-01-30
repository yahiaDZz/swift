import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterBar from "./Filter/FilterBar";
import filter from "../assets/filter.png";
const SearchResult = ({ querty }) => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Article 1.pdf",
      authors: ["Hikrau Nakamura", "Hikaru Nakamura"],
      date: "2021-09-01",
      institution: "University of Tokyo",
    },
    {
      id: 2,
      title: "Article 2.pdf",
      authors: ["Max Euwe", "Max Euwe"],
      date: "2021-09-01",
      institution: "University of Berlin",
    },
    {
      id: 3,
      title: "Article 3.pdf",
      authors: ["Ding Liren", "Ding Liren"],
      date: "2021-09-01",
      institution: "University of Beijing",
    },
  ]);
  useEffect(() => {
    //TODO: MAKE QUERY TO DB
  });
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="pt-20">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="mb-4 flex items-center uppercase bg-white text-black px-4 py-1 rounded-lg mx-2"
      >
        <img src={filter} className="w-4 h-4" />
        <h1 className="font-bold">Filter</h1>
      </button>
      {showFilter && <FilterBar />}
      <h1 className="text-white font-semibold p-4">Search Results</h1>
      {articles.length > 0 && (
        <ul>
          {articles.map((article, index) => {
            return (
              <li
                key={index}
                class="flex items-center space-x-4 p-4 border-b border-gray-700 hover:bg-gray-300 bg-gray-100 cursor-pointer"
              >
                <h2 class="text-lg font-semibold text-gray-900 max-w-[400px] overflow-hidden text-ellipsis">
                  {article.title}
                </h2>
                <div class="flex flex-col space-y-1">
                  <span class="text-sm text-gray-500">
                    {(article.authors.length > 0 &&
                      article.authors.map((author, index) => {
                        return (
                          <Link to={`/author/${author}`} key={index}>
                            {author + ", "}
                          </Link>
                        );
                      })) ||
                      "NO DATA"}
                  </span>
                  <div className="space-x-2">
                    <span class="text-sm text-gray-400 italic">
                      {article.date || "NO DATA"}
                    </span>
                    <span class="text-sm text-gray-600">
                      {article.institution || "NO DATA"}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchResult;
