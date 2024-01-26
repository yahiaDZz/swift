import React from "react";
import ContactForm from "./ContactForm";

const ContactPage = () => {
  return (
    <div className="container mx-auto px-8 pt-20 text-white ">
      <h1 className="text-3xl font-bold mb-8 text-center">Contactez-nous</h1>
      <p className="text-white font-semibold mb-6 text-center">
        Vous pouvez nous contacter en utilisant le formulaire ci-dessous. Nous
        serions ravis de vous entendre!
      </p>
      <ContactForm />
    </div>
  );
};

export default ContactPage;
