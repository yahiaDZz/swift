import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FilterBar from "./Filter/FilterBar";
import filter from "../assets/filter.png";
import unstar from "../assets/unstar.png";
import star from "../assets/star.png";
import axios from "axios";
import Cookies from "js-cookie";
const SearchResult = () => {
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
  const navigate = useNavigate();
  useEffect(() => {
    //TODO: MAKE QUERY TO DB
    let url = location.pathname;
    let split = url.split("/");
    // axios.get(`/api/search/${}&keywords=${}&authors=..`,{filter});
    if (split.length <= 2) return;
    setQuery(location.pathname.split("/").pop().replaceAll("%20", " "));

    const token = Cookies.get("_auth");
    axios
      .get(`http://127.0.0.1:8000/api/search/articles/?search=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Could not perform search! check console...");
        navigate("/");
      });
  }, []);
  const [showFilter, setShowFilter] = useState(false);

  const [filter, setFilter] = useState({
    title: "",
    authors: [""],
    keywords: [""],
    institution: "",
  });
  const handleDeleteKeyword = (index) => {
    setFilter({
      ...filter,
      keywords: filter.keywords.filter((keyword, i) => i !== index),
    });
  };
  const handleDeleteAuthor = (index) => {
    setQuery({
      ...filter,
      authors: filter.authors.filter((author, i) => i !== index),
    });
  };
  return (
    <div className="pt-20 font-display">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="mb-4 flex items-center uppercase bg-white text-black px-4 py-1 rounded-lg mx-2"
      >
        <img src={filter} className="w-4 h-4" />
        <h1 className="font-bold">Filter</h1>
      </button>
      {showFilter && (
        <div className="flex flex-col space-y-4 p-4 rounded bg-gray-100">
          <FilterCategory title="Name">
            <FilterInput placeholder="Search by title" />
          </FilterCategory>
          <div className="mb-4 flex flex-wrap sm:flex-row gap-2">
            <label
              htmlFor="keywords"
              className="font-secondary block text-black font-bold mb-2 sm:mb-0"
            >
              Authors
            </label>
            {filter.authors.map((keyword, index) => (
              <div key={index} className="w-1/3 sm:w-1/4 pr-4 ">
                <input
                  type="text"
                  className="shadow appearance-none border-2 border-black rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={keyword}
                  onChange={(e) =>
                    setArticle({
                      ...article,
                      authors: article.authors.map((auth, i) =>
                        i === index ? e.target.value : auth
                      ),
                    })
                  }
                />
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded-full ml-2"
                  onClick={() => handleDeleteAuthor(index)}
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
                  setFilter({
                    ...filter,
                    authors: [...filter.authors, ""],
                  })
                }
              >
                Add
              </button>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap sm:flex-row gap-2">
            <label
              htmlFor="keywords"
              className="font-secondary block text-black font-bold mb-2 sm:mb-0"
            >
              Keywords
            </label>
            {filter.keywords.map((keyword, index) => (
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
                  setFilter({
                    ...filter,
                    keywords: [...filter.keywords, ""],
                  })
                }
              >
                Add
              </button>
            </div>
          </div>
          <FilterCategory title="Institution">
            <FilterInput placeholder="Search by institution" />
            <br />
            <button
              onClick={() => handleSearch()}
              className="flex items-center justify-center uppercase bg-blue-400 space-x-2 text-black px-4 py-1 rounded-lg mx-2"
            >
              <img src={search} className="w-4 h-4" />
              <h1 className="font-bold">query</h1>
            </button>
          </FilterCategory>
        </div>
      )}
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
                          const favorite = a.id;
                          if (a.isFavorite) {
                            // REMOVE FROM FAVORITES
                            axios
                              .patch(
                                "http://127.0.0.1:8000/api/user",
                                {
                                  favorite: favorite,
                                },
                                {
                                  headers: {
                                    Authorization: `Bearer ${Cookies.get(
                                      "_auth"
                                    )}`,
                                    "Content-Type": "application/json",
                                  },
                                }
                              )
                              .then((res) => {
                                alert("Removed from favorites!");
                              })
                              .catch((err) => {
                                console.error(err);
                                alert(
                                  "Could not remove from favorites! check console..."
                                );
                              });
                          } else {
                            // ADD TO FAVORITES
                            axios
                              .post(
                                "http://127.0.0.1:8000/api/user",
                                {
                                  favorite: favorite,
                                },
                                {
                                  headers: {
                                    Authorization: `Bearer ${Cookies.get(
                                      "_auth"
                                    )}`,
                                    "Content-Type": "application/json",
                                  },
                                }
                              )
                              .then((res) => {
                                alert("Added to favorites!");
                              })
                              .catch((err) => {
                                console.error(err);
                                alert(
                                  "Could not add to favorites! check console..."
                                );
                              });
                          }
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
