import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import FilterBar from "./Filter/FilterBar";
import filter from "../assets/filter.png";
import unstar from "../assets/unstar.png";
import star from "../assets/star.png";
const SearchResult = ({ q }) => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Article 1.pdf",
      authors: ["Hikaru Nakamura", "Hikaru Nakamura"],
      date: "2021-09-01",
      institution: "University of Tokyo",
      isFavorite: true,
    },
    {
      id: 2,
      title: "Article 2.pdf",
      authors: ["Max Euwe", "Max Euwe"],
      date: "2021-09-01",
      institution: "University of Berlin",
      isFavorite: false,
    },
    {
      id: 3,
      title: "Article 3.pdf",
      authors: ["Ding Liren", "Ding Liren"],
      date: "2021-09-01",
      institution: "University of Beijing",
      isFavorite: true,
    },
  ]);
  const location = useLocation();
  const [query, setQuery] = useState("");
  const truncate = (str) => {
    return str.length > 30 ? str.substring(0, 10) + "..." : str;
  };
  useEffect(() => {
    //TODO: MAKE QUERY TO DB
    let url = location.pathname;
    let split = url.split("/");
    // axios.get(`/api/search/${}&keywords=${}&authors=..`,{filter});
    if (split.length <= 2) return;
    setQuery(location.pathname.split("/").pop().replaceAll("%20", " "));
  }, []);
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="pt-20 font-display">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="mb-4 flex items-center uppercase bg-white text-black px-4 py-1 rounded-lg mx-2"
      >
        <img src={filter} className="w-4 h-4" />
        <h1 className="font-bold">Filter</h1>
      </button>
      {showFilter && <FilterBar />}
      <h1 className="text-white text-2xl font-semibold p-4">
        Search Results for:{" "}
        <span className="underline italic">{truncate(query)}</span>
      </h1>
      {articles.length > 0 && (
        <ul>
          {articles.map((article, index) => {
            return (
              <li
                key={index}
                className="flex items-center justify-between space-x-4 p-4 border-b border-gray-700  bg-gray-100 "
              >
                <Link
                  target="_blank"
                  to="#"
                  className="underline text-lg font-semibold text-gray-900 max-w-[400px] overflow-hidden text-ellipsis"
                >
                  {article.title}
                </Link>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500 flex">
                    {(article.authors.length > 0 &&
                      article.authors.map((author, index) => {
                        return (
                          <h1 to={`/author/${author}`} key={index}>
                            {author + ", "}
                          </h1>
                        );
                      })) ||
                      "NO DATA"}
                  </span>
                  <div className="space-x-2">
                    <span className="text-sm text-gray-400 italic">
                      {article.date || "NO DATA"}
                    </span>
                    <span className="text-sm text-gray-600">
                      {article.institution || "NO DATA"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setArticles(
                      articles.map((a, i) => {
                        if (i === index) {
                          const newArticle = {
                            ...a,
                            isFavorite: !a.isFavorite,
                          };

                          //TODO: OVERRIDE TO DB
                          return newArticle;
                        }
                        return a;
                      })
                    );
                  }}
                >
                  <img
                    src={article.isFavorite ? star : unstar}
                    className="w-6 h-6"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchResult;
