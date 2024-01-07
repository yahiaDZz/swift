import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

  const handleSearch = () => {
    // Rediriger vers la page des résultats de recherche avec la requête en tant que paramètre
    history.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Rechercher des articles..."
        className="border p-2 rounded-l focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-primary text-white p-2 rounded-r hover:bg-primary-dark focus:outline-none"
      >
        Rechercher
      </button>
    </div>
  );
};

export default Search;
