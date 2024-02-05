import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: la logique d'envoi du formulaire vers le backend
    console.log("Formulaire soumis avec les données :", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-2">
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Fullname
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-2">
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-white"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-2">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-white"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
      >
        Send
      </button>
    </form>
  );
};

export default ContactForm;
