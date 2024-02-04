import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FilterBar from "./Filter/FilterBar";
import filterimg from "../assets/filter.png";
import unstar from "../assets/unstar.png";
import star from "../assets/star.png";
import search from "../assets/search.png";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import axios from "axios";
import Cookies from "js-cookie";
const SearchResult = () => {
  const [articles, setArticles] = useState([
  ]);
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const truncate = (str) => {
    return str.length > 30 ? str.substring(0, 10) + "..." : str;
  };
  const token = Cookies.get("_auth");
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    return tomorrow;
  });
  const refreshFavs = () =>
    axios
      .get("http://127.0.0.1:8000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setfavs(res.data.favorites);
      })
      .catch((err) => {
        console.error(err);
        alert("Could not fetch preferred articles! check the console");
  });


  useEffect(() => {
    //TODO: MAKE QUERY TO DB
    let url = location.pathname;
    let split = url.split("/");
    let q = decodeURIComponent(split[split.length - 1]);

    setQuery(q)
    refreshFavs()

    axios
      .get(`http://127.0.0.1:8000/api/search/articles/?search=${q}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoading(false)
        setArticles(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Could not perform search! check console...");
        navigate("/");
      });
  }, [location.pathname, navigate, token]);
  const [favs, setfavs] = useState([
  ]);

  const handleAdd = async (id) => {
    console.log("add preferred article with id:", id);
    await axios
      .post(
        "http://127.0.0.1:8000/api/user",
        {
          favorite: id,
        },
        {
          headers: { Authorization: `Bearer ${Cookies.get("_auth")}` },
        }
      )
      .catch((err) => {
        console.error(err);
        alert("Could not add article from favorite list! check the console");
      });
  };
  const handleDelete = async (id) => {
    console.log("Deleting preferred article with id:", id);
    await axios
      .patch(
        "http://127.0.0.1:8000/api/user",
        {
          favorite: id,
        },
        {
          headers: { Authorization: `Bearer ${Cookies.get("_auth")}` },
        }
      )
      .catch((err) => {
        console.error(err);
        alert("Could not delete article from favorite list! check the console");
      });
  };
  const [showFilter, setShowFilter] = useState(false);

  const [filter, setFilter] = useState({
    authors: [],
    keywords: [],
    institutions: [],
  });

  const [isDateEnabled, setisDateEnabled] = useState(false);

  const handleCheckboxChange = () => {
    setisDateEnabled(!isDateEnabled);
  };

  const handleFilter = () => {
    setLoading(true)

    axios
      .get(
        `http://127.0.0.1:8000/api/search/articles/?search=${query}${filter.title != null ? `&title__prefix=${filter.title}` : ''
        }${filter.authors.length > 0
          ? `&authors__in=${filter.authors.join("__")}`
          : ''
        }${filter.keywords.length > 0
          ? `&keywords__in=${filter.keywords.join("__")}`
          : ''
        }${filter.institutions.length > 0
          ? `&institutions__in=${filter.institutions.join("__")}`
          : ''
        }${isDateEnabled ?
          `&date__gte=${startDate.toISOString()}&date__lte=${endDate.toISOString()}`
          : ''
        }`
        ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setLoading(false)
        setArticles(res.data);
      })
      .catch((err) => {
        setLoading(false)
        console.error(err);
        alert("Could not perform filter! check console...");
      });
  };

  const addToFavorites = (articleId) => {
    let hasFav = favs.some((e, i) => e.id == articleId)

    if (hasFav) {
      handleDelete(articleId)
    } else {
      handleAdd(articleId)
    }
    refreshFavs()
  };

  const handleDeleteKeyword = (index) => {
    setFilter({
      ...filter,
      keywords: filter.keywords.filter((keyword, i) => i !== index),
    });
  };
  const handleDeleteAuthor = (index) => {
    setFilter({
      ...filter,
      authors: filter.authors.filter((author, i) => i !== index),
    });
  };
  const handleDeleteinstitution = (index) => {
    setFilter({
      ...filter,
      institutions: filter.institutions.filter((author, i) => i !== index),
    });
  };
  return (
    <div className="pt-20 font-display">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="mb-4 flex items-center uppercase bg-white text-black px-4 py-1 rounded-lg mx-2"
      >
        <img src={filterimg} className="w-4 h-4" />
        <h1 className="font-bold">Filter</h1>
      </button>
      {showFilter && (
        <div className="flex flex-col space-y-4 p-4 rounded bg-gray-100">
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
                    setFilter({
                      ...filter,
                      authors: filter.authors.map((auth, i) =>
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
                    setFilter({
                      ...filter,
                      keywords: filter.keywords.map((kw, i) =>
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

          <div className="mb-4 flex flex-wrap sm:flex-row gap-2">
            <label
              htmlFor="keywords"
              className="font-secondary block text-black font-bold mb-2 sm:mb-0"
            >
              Institutions
            </label>
            {filter.institutions.map((inst, index) => (
              <div key={index} className="w-1/3 sm:w-1/4 pr-4 ">
                <input
                  type="text"
                  className="shadow appearance-none border-2 border-black rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={inst}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      institutions: filter.institutions.map((kw, i) =>
                        i === index ? e.target.value : kw
                      ),
                    })
                  }
                />
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded-full ml-2"
                  onClick={() => handleDeleteinstitution(index)}
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
                    institutions: [...filter.institutions, ""],
                  })
                }
              >
                Add
              </button>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap sm:flex-row gap-2">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isDateEnabled}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Filter by a date period
              </label>

              <div className={!isDateEnabled ? 'opacity-50 pointer-events-none' : ''}>
                <div className="flex space-x-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                    <DatePicker
                      showTimeSelect
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="border px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="border px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleFilter()}
            className="flex items-center justify-center uppercase bg-blue-400 space-x-2 text-black px-4 py-1 rounded-lg mx-2"
          >
            <img src={search} className="w-4 h-4" />
            <h1 className="font-bold">query</h1>
          </button>
        </div>
      )}
      <h1 className="text-white text-2xl font-semibold p-4">
        Search Results for:{" "}
        <span className="italic">{truncate(query)}</span>
      </h1>
      {!loading && articles.length > 0 && (
        <ul>
          {articles.map((article, index) => {
            const { id, title, resume, authors, keywords, institutions, created_at } = article;
            const localCreatedDate = new Date(created_at).toLocaleString();

            const truncatedResume = resume.length > 150 ? `${resume.slice(0, 150)}...` : resume;

            return (
              <div key={index} className="relative max-w-xl mx-auto bg-white shadow-md p-8 rounded-md my-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold mb-4">{title}</h2>
                  <a
                    className="m-4 cursor-pointer flex-shrink-0 overflow-hidden"
                    onClick={(e) => {
                      e.preventDefault();
                      addToFavorites(id);
                    }}
                  >
                    <img
                      src={favs.some((e, i) => e.id === id) ? star : unstar}
                      alt="toggle favorites"
                      className="w-12 h-12 object-cover"
                    />
                  </a>
                </div>
                <blockquote className="text-gray-600 italic mb-4">{truncatedResume}</blockquote>
                <div className="mb-4">
                  <strong>Authors:</strong>
                  <span className="font-bold"> {authors.join(', ')} </span>
                </div>
                <div className="mb-4">
                  <strong>Keywords:</strong>
                  <span className="italic"> {keywords.join(', ')} </span>
                </div>
                <div className="mb-4">
                  <strong>Institutions:</strong>
                  <span> {institutions.join(', ')} </span>
                </div>
                <p className="mb-2 text-gray-600">{`Uploaded at ${localCreatedDate}`}</p>
                <button onClick={() => {
                  navigate(`/read/${article.id}`);
                }} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">Read More</button>
              </div>
            );
          })}
        </ul>
      ) || loading && (
        <div className="flex items-center justify-center h-screen">
          <div className="border-t-4 border-white border-solid rounded-full animate-spin w-12 h-12"></div>
        </div>
      )
        || (<div className="flex items-center justify-center h-screen">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-lg font-semibold mb-4">No articles found</p>
            <p className="text-gray-600">Sorry, there are no articles matching your search criteria.</p>
          </div>
        </div>)}
    </div>
  );
};

export default SearchResult;
