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

import SearchResult from "./components/SearchResult";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Cookies from "js-cookie";
import axios from "axios";
import ReadArticle from "./components/ReadArticle";
function App() {
  const isAuthenticated = useIsAuthenticated();
  const [userInfo, setUserInfo] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMod, setIsMod] = useState(false);
  const [isNormal, setIsNormal] = useState(false);
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (isAuthenticated()) {
      setIsLogged(true);
      const token = Cookies.get("_auth");
      axios
        .get("http://127.0.0.1:8000/api/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setUsername(res.data.username);
          setIsAdmin(res.data.is_admin);
          setIsMod(res.data.is_staff);
          setIsNormal(!res.data.is_admin && !res.data.is_staff);
        });
    }
  }, []);

  return (
    <>
      <Navbar
        username={username}
        isLogged={isLogged}
        isAdmin={isLogged && isAdmin}
        isMod={isLogged && isMod}
        isNormal={isLogged && isNormal}
      />
      <Routes>
        <Route exact path="/" element={<Hero />} />
        <Route exact path="/login" element={<Login isLogged={isLogged} />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/articles" element={<Articles isMod={true} />} />
        <Route exact path="/upload" element={<Upload isAdmin={isAdmin} />} />
        <Route exact path="/read/*" element={<ReadArticle />} />
        <Route
          exact
          path="/dashboard"
          element={<Dashboard isAdmin={isAdmin} />}
        />
        <Route
          exact
          path="/settings"
          element={<Settings isLogged={isLogged} />}
        />
        <Route exact path="/consult/*" element={<Consult isMod={isMod} />} />
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
