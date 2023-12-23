import { useState } from "react";
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
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Hero />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/articles" element={<Articles />} />
        <Route exact path="/upload" element={<Upload />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
