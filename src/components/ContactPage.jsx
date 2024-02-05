import React from "react";
import ContactForm from "./ContactForm";

const ContactPage = () => {
  return (
    <div className="container mx-auto px-8 pt-20 text-white ">
      <h1 className="text-3xl font-bold mb-8 text-center">Contactez-nous</h1>
      <p className="text-white font-semibold mb-6 text-center">
        You can contact us via the form below. We are more than happy to hear
        from you :) !
      </p>
      <ContactForm />
    </div>
  );
};

export default ContactPage;
