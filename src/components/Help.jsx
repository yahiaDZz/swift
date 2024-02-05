import React from "react";

const Help = () => {
  return (
    <div className="text-white flex flex-col justify-center items-center container mx-auto px-8 py-20 ">
      <h1 className="text-3xl font-bold mb-8 text-left">Help and support</h1>

      <section className="mb-8 text-left">
        <h2 className="text-2xl font-bold mb-4">How to create an account</h2>
        <p className="text-white font-semibold underline">
          To create an account, you can follow these steps:
        </p>
        <ol className="list-decimal pl-6 mt-2">
          <li>Enter the signup page by clicking "SIGNUP" on top right.</li>
          <li>Fill the necessary information.</li>
          {/* <li>
            Validez votre compte via le lien de confirmation envoyé par email.
          </li> */}
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">How to reset my password ?</h2>
        <p className="text-white font-semibold underline">
          if you want to change your password, do as follows:
        </p>
        <ol className="list-decimal pl-6 mt-2">
          <li>Go to settings.</li>
          <li>Click "EDIT PASSWORD"</li>
          <li>Follow the next instructions.</li>
        </ol>
      </section>

      {/* Ajoutez d'autres sections d'aide au besoin */}
    </div>
  );
};

export default Help;
