import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Hero from "./components/Hero";
import Articles from "./components/Articles";
import Upload from "./components/Upload";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import Consult from "./components/Consult";
import Help from "./components/Help";
import FilterArticle from "./components/FilterArticle";
import UpgradePopup from "./components/UpgradePopup";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import ContactPage from "./components/ContactPage";

import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import SearchResult from "./components/SearchResult";

function App() {
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();
  useEffect(() => {
    console.log(authHeader);
    console.log(isAuthenticated());
  });
  return (
    <>
      <Navbar username={"Johndoe123@"} />
      <Routes>
        <Route exact path="/" element={<Hero />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/articles" element={<Articles />} />
        <Route exact path="/upload" element={<Upload />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/settings" element={<Settings />} />
        <Route exact path="/consult/*" element={<Consult />} />
        <Route exact path="/upload" element={<Upload />} />
        <Route exact path="/help" element={<Help />} />
        <Route exact path="/filter" element={<FilterArticle />} />
        <Route exact path="/faq" element={<FAQ />} />
        <Route exact path="/feedback" element={<ContactPage />} />
        <Route exact path="/search/*" element={<SearchResult />} />
      </Routes>
    </>
  );
}

export default App;
