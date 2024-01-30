import React from "react";
import search from "../assets/search.png";
const Hero = () => {
  return (
    <div className="text-white bg-cover bg-center bg-no-repeat bg-[url('/path/to/image.jpg')] font-primary pt-20 ">
      <div className="text-center w-full items-center flex flex-col justify-center">
        <h1 className="lg:text-6xl font-bold mt-10 xxs:text-4xl">
          Your Gateway To A World Of Articles And Insights
        </h1>
        <h1 className="px-14 mt-4 font-semibold">
          Dive into a vast sea of articles, curated just for you. Whether you
          seek knowledge, inspiration, or the latest trends, our platform
          empowers you to discover, learn, and grow.
        </h1>
        <div className="space-y-4 flex items-center flex-col">
          <input
            className="mt-10 xxs:w-[100%] lg:w-[200%] py-4 px-2 text-xl font-bold rounded-xl border-2 border-primary focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            type="text"
            placeholder="Search +1000 Scientific Articles"
          />
          <button className="font-semibold h-10 hover:bg-blue-500 bg-primary xxs:w-[80%] lg:w-96 rounded-full flex justify-center items-center space-x-1 text-white">
            <h1 className="text-lg">Go</h1>
            <img src={search} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
