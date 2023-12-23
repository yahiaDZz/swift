import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import burger from "../assets/burger.png";
import logo from "../assets/react.svg";
import rightarrow from "../assets/rightarrow.png";
const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="absolute z-50 font-primary bg-blue-500 p-4 w-screen bg-opacity-80">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl flex">
          <img src={logo} />
          <h1>Logo</h1>
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
          className={`menu ${
            menuOpen
              ? "animate-on-load slide-down flex flex-col space-y-4 absolute right-0 top-16 bg-blue-400 w-full text-xl bg-opacity-95"
              : "hidden"
          } md:flex items-center`}
        >
          <Link to="/" className="text-white mx-2">
            Home
          </Link>
          <Link to="/about" className="text-white mx-2">
            About
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
              menuOpen ? "flex-col" : "flex-row space-y-2"
            } `}
          >
            <button
              onClick={() => navigate("/login")}
              className="flex items-center uppercase bg-white text-black px-4 py-1 rounded-lg mx-2"
            >
              <h1 className="font-bold">Signin</h1>
              <img src={rightarrow} className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-500 text-white font-bold px-6 py-1 rounded-lg mx-2"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
