import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import burger from "../assets/burger.png";
import logo from "../assets/logo.png";
import rightarrow from "../assets/rightarrow.png";
import upload from "../assets/upload.png";
import dashboard from "../assets/dashboard.png";
import articles from "../assets/articles.png";
import settings from "../assets/settings.png";
import useSignOut from "react-auth-kit/hooks/useSignOut";

const Navbar = ({ username, isLogged, isAdmin, isMod, isNormal }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const signOut = useSignOut();
  return (
    <nav className="shadow-2xl fixed z-50 font-primary bg-blue-500 p-4 w-screen bg-opacity-80">
      <div className="container mx-auto flex justify-between items-center">
        <div
          onClick={() => navigate("/")}
          className="hover:cursor-pointer text-white font-bold text-xl flex items-center justify-center space-x-2"
        >
          <img
            src={logo}
            className="w-8 h-8 bg-white flex items-center justify-center rounded-full p-[0.5%]"
          />
          <h1 className="font-secondary">SoftSearch</h1>
        </div>

        {/* Hamburger Button with Image */}
        <div
          className="menu-btn cursor-pointer block md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img
            src={burger} // Replace with the correct path to your burger icon
            alt="Hamburger Icon"
            className="w-6 h-6 text-white"
          />
        </div>

        {/* Navbar Links */}
        <div
          className={`shadow-2xl shadow-blue-400 menu ${
            menuOpen
              ? "animate-on-load slide-down flex flex-col space-y-4 absolute right-0 top-16 bg-blue-500 w-full text-xl bg-opacity-95"
              : "hidden"
          } md:flex items-center`}
        >
          <Link to="/" className="text-white mx-2">
            Home
          </Link>
          <Link to="/help" className="text-white mx-2">
            Help
          </Link>
          <Link to="/feedback" className="text-white mx-2">
            Feedback
          </Link>
          {/* Login and Signup Buttons */}
          <div
            className={`flex items-center justify-center ${
              menuOpen ? "flex-col space-y-2" : ""
            } `}
          >
            {isLogged && isMod && (
              <button
                onClick={() => navigate("/articles")}
                className="flex items-center uppercase bg-white text-black px-4 py-1 rounded-lg mx-2"
              >
                <img src={articles} className="w-4 h-4" />
                <h1 className="font-bold">Articles</h1>
              </button>
            )}
            {isLogged && isAdmin && (
              <>
                <button
                  onClick={() => navigate("/upload")}
                  className="flex items-center justify-center uppercase bg-white text-black px-4 py-1 rounded-lg mx-2"
                >
                  <img src={upload} className="w-4 h-4" />
                  <h1 className="font-bold text-center">Upload</h1>
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center justify-center uppercase bg-white text-black px-4 py-1 rounded-lg mx-2"
                >
                  <img src={dashboard} className="w-4 h-4" />
                  <h1 className="font-bold">Dashboard</h1>
                </button>
              </>
            )}
            {isLogged && (
              <div className="flex items-center justify-center  ">
                <Link
                  to="/settings"
                  className="text-center text-white mx-2 underline underline-offset-2"
                >
                  {username}
                </Link>
              </div>
            )}
            {!isLogged && (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center uppercase bg-white text-black px-4 py-1 rounded-lg mx-2"
                >
                  <h1 className="font-bold">Signin</h1>
                  <img src={rightarrow} className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="bg-blue-500 text-white font-bold px-6 py-1 rounded-lg mx-2"
                >
                  Signup
                </button>
              </>
            )}
            {isLogged && (
              <button
                onClick={() => {
                  signOut();
                  window.location.reload();
                }}
                className="flex items-center justify-center uppercase bg-red-400 text-white px-4 py-1 rounded-lg mx-2"
              >
                <h1 className="font-bold">Logout</h1>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
