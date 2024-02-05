import React from "react";

const Help = () => {
  return (
    <div className="text-white container mx-auto px-8 py-20 ">
      <h1 className="text-3xl font-bold mb-8">Aide et Support</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Comment créer un compte ?</h2>
        <p className="text-white font-semibold underline">
          Pour créer un compte sur notre plateforme, suivez ces étapes :
        </p>
        <ol className="list-decimal pl-6 mt-2">
          <li>Accédez à la page d'inscription en cliquant sur "S'inscrire".</li>
          <li>Remplissez le formulaire d'inscription avec vos informations.</li>
          <li>
            Validez votre compte via le lien de confirmation envoyé par email.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Comment réinitialiser mon mot de passe ?
        </h2>
        <p className="text-white font-semibold underline">
          Si vous avez oublié votre mot de passe, procédez comme suit :
        </p>
        <ol className="list-decimal pl-6 mt-2">
          <li>Allez sur la page de connexion.</li>
          <li>Cliquez sur "Mot de passe oublié".</li>
          <li>
            Suivez les instructions pour réinitialiser votre mot de passe.
          </li>
        </ol>
      </section>

      {/* Ajoutez d'autres sections d'aide au besoin */}
    </div>
  );
};

export default Help;
