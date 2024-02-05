import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = ({ articles }) => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    applyFilter();
  }, [articles, searchQuery]);

  const applyFilter = () => {
    if (!searchQuery) {
      // Si la requête de recherche est vide, affichez tous les articles
      setFilteredResults(articles);
    } else {
      // Sinon, filtrez les articles en fonction de la requête
      const filtered = articles.filter((article) => {
        // Vous pouvez ajuster ces conditions en fonction de votre modèle de données
        const titleMatch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
        const keywordsMatch = article.keywords.some(keyword =>
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const authorsMatch = article.authors.some(author =>
          author.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const textMatch = article.text.toLowerCase().includes(searchQuery.toLowerCase());

        // Retourne true si au moins une condition est vraie
        return titleMatch || keywordsMatch || authorsMatch || textMatch;
      });

      setFilteredResults(filtered);
    }
  };

  return (
    <div>
      {/* Affichez ici les résultats filtrés dans la structure que vous préférez */}
      {filteredResults.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          {/* Affichez d'autres détails de l'article */}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
