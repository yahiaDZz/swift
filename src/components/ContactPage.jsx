import React from "react";
import ContactForm from "./ContactForm";

const ContactPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Contactez-nous</h1>
      <p className="text-gray-700 mb-6">
        Vous pouvez nous contacter en utilisant le formulaire ci-dessous. Nous serions ravis de vous entendre!
      </p>
      <ContactForm />
    </div>
  );
};

export default ContactPage;
