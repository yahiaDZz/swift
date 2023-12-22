import React from "react";
import { Link } from "react-router-dom";
import rightarrow from "../assets/rightarrow.png";
import logo from "../assets/react.svg";
const Navbar = () => {
  return (
    <nav className="items-center font-semibold bg-primary flex justify-between px-4 py-4 text-white bg-opacity-70 w-full">
      <div className="flex items-center justify-between space-x-2">
        <img src={logo} className="w-8 h-8" />
        <h1>Logo</h1>
      </div>
      <div>
        <ul className="flex space-x-4 justify-between">
          <li>
            <a to="#" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Help
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Feedback
            </a>
          </li>
        </ul>
      </div>
      <div className="flex justify-between space-x-2">
        <button className="items-center flex justify-between space-x-2 transition duration-200 ease-in-out hover:scale-105 bg-white text-black px-4 py-2 rounded-lg uppercase">
          <h1 className="uppercase">Login</h1>
          <img src={rightarrow} className="" />
        </button>
        <button className="transition duration-200 ease-in-out hover:scale-105 bg-primary px-7 py-2 rounded-lg text-white uppercase">
          Signup
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
