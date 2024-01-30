import React, { useState } from "react";
import FilterCategory from "./FilterCategory";
import FilterInput from "./FilterInput";
import FilterCheckbox from "./FilterCheckbox";
import search from "../../assets/search.png";
const FilterBar = () => {
  const [query, setQuery] = useState({
    title: "",
    authors: ["", ""],
    keywords: ["", ""],
    institution: "",
  });
  const handleDeleteKeyword = (index) => {
    setQuery({
      ...query,
      keywords: query.keywords.filter((keyword, i) => i !== index),
    });
  };
  const handleSearch = () => {
    //TODO: Query to DB
  };
  return (
    <div className="flex flex-col space-y-4 p-4 rounded bg-gray-100">
      <FilterCategory title="Name">
        <FilterInput placeholder="Search by title" />
      </FilterCategory>
      <FilterCategory title="Authors">
        <FilterInput placeholder="Search by author name" />
      </FilterCategory>
      {/* <FilterCategory title="Keywords">
        <FilterInput placeholder="Search by keywords" />
      </FilterCategory> */}
      <div className="mb-4 flex flex-wrap sm:flex-row gap-2">
        <label
          htmlFor="keywords"
          className="font-secondary block text-black font-bold mb-2 sm:mb-0"
        >
          Keywords
        </label>
        {query.keywords.map((keyword, index) => (
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
              setQuery({
                ...query,
                keywords: [...query.keywords, ""],
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
  );
};

export default FilterBar;
