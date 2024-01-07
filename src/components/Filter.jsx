import React, { useState } from "react";

const FilterArticle = ({ articles }) => {
  const [filteredResults, setFilteredResults] = useState([]);

  const filterByKeyword = (keyword) => {
    // Filtrer les articles par mot-clé
    const filtered = articles.filter((article) =>
      article.keywords.includes(keyword)
    );

    setFilteredResults(filtered);
  };

  const filterByAuthor = (author) => {
    // Filtrer les articles par auteur
    const filtered = articles.filter((article) =>
      article.authors.includes(author)
    );

    setFilteredResults(filtered);
  };

  const filterByInstitution = (institution) => {
    // Filtrer les articles par institution
    const filtered = articles.filter((article) =>
      article.institution === institution
    );

    setFilteredResults(filtered);
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

export default FilterArticle;
