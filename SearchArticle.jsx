import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchArticle = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      // Vérifiez si la requête de recherche est vide
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        setLoading(false);
        return;
      }

      // Utilisez votre endpoint d'API réel pour effectuer la recherche
      const response = await axios.get(
        `https://api.example.com/articles?query=${searchQuery}`
      );

      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("An error occurred while fetching search results.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Effectuer la recherche uniquement si la requête de recherche n'est pas vide
    if (searchQuery.trim() !== "") {
      handleSearch();
    } else {
      // Réinitialiser les résultats de recherche si la requête est vide
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div className="container mx-auto my-8">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300 flex-grow"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading search results...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && searchResults.length === 0 && searchQuery.trim() !== "" && (
        <p>No results found for '{searchQuery}'</p>
      )}

      {!loading && searchResults.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Search Results:</h2>
          <ul>
            {searchResults.map((article) => (
              <li key={article.id} className="mb-4">
                <Link to={`/article/${article.id}`}>
                  <h3 className="text-blue-500 hover:underline">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-gray-600">{article.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchArticle;
