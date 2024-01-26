import React from "react";

const FAQ = () => {
  const faqData = [
    {
      question: "1. Comment effectuer une recherche d'articles?",
      answer:
        "Vous pouvez effectuer une recherche en utilisant la barre de recherche en haut de la page. Saisissez les mots-clés, les auteurs ou d'autres critères de recherche pour obtenir des résultats pertinents.",
    },
    {
      question: "2. Comment filtrer les résultats de recherche?",
      answer:
        "Une fois que vous avez effectué une recherche, vous pouvez utiliser les filtres disponibles pour affiner les résultats. Vous pouvez filtrer par mots-clés, auteurs, institutions et période de publication.",
    },
    {
      question: "3. Comment consulter un article?",
      answer:
        "Pour consulter un article, cliquez sur son titre dans la liste des résultats de recherche. Cela vous dirigera vers la page de consultation de l'article où vous pourrez lire le texte intégral et effectuer d'autres actions.",
    },
    {
      question: "4. Comment ajouter un nouvel article?",
      answer:
        "Si vous êtes un administrateur, vous pouvez ajouter un nouvel article en accédant à la page d'administration. Cliquez sur le bouton 'Ajouter un article', puis saisissez les informations nécessaires.",
    },
    {
      question: "5. Comment supprimer un article existant?",
      answer:
        "Les administrateurs peuvent supprimer un article en accédant à la page d'administration et en sélectionnant l'option de suppression pour l'article souhaité.",
    },
    {
      question: "6. Puis-je exporter les résultats de recherche?",
      answer:
        "Oui, vous pouvez exporter les résultats de recherche sous forme de fichier CSV ou Excel. Sur la page des résultats de recherche, recherchez l'option d'exportation et choisissez le format souhaité.",
    },
    {
      question: "7. Comment créer un compte utilisateur?",
      answer:
        "Pour créer un compte utilisateur, accédez à la page d'inscription depuis le lien 'S'inscrire' sur la page d'accueil. Remplissez le formulaire d'inscription avec vos informations et cliquez sur 'Créer un compte'.",
    },
    {
      question: "8. Où puis-je trouver des informations sur les auteurs?",
      answer:
        "Les informations sur les auteurs sont disponibles sur la page de détails de chaque article. Vous pouvez cliquer sur le nom de l'auteur pour afficher son profil avec des détails supplémentaires.",
    },
    {
      question: "9. Comment réinitialiser mon mot de passe?",
      answer:
        "Si vous avez oublié votre mot de passe, vous pouvez réinitialiser en cliquant sur le lien 'Mot de passe oublié' sur la page de connexion. Suivez les instructions pour réinitialiser votre mot de passe.",
    },
    {
      question: "10. Comment contacter le support technique?",
      answer:
        "Pour contacter le support technique, envoyez un e-mail à support@votreapplication.com. Nous serons heureux de vous aider avec toutes vos questions et préoccupations.",
    },
  ];

  return (
    <div className="container mx-auto pt-16">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">FAQ</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
