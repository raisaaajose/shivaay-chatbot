"use client";

import React from "react";
import { baseURL, aiBaseURL } from "../../../utils/api";

const Footer: React.FC = () => {
  return (
    <footer className="hidden md:flex bottom-0 left-0 w-full h-16 bg-transparent px-6 py-4 flex-col md:flex-row items-center justify-between text-gray-400 text-sm font-normal select-none z-50 transition-all duration-300 ease-in-out">
      <span className="mb-2 md:mb-0 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
        © {new Date().getFullYear()} Shivaay
      </span>
      <div className="flex space-x-4">
        <a
          className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 hover:scale-105 transform"
          href={baseURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          API
        </a>
        <a
          className="text-gray-400 hover:text-purple-400 transition-colors duration-200 hover:scale-105 transform"
          href={aiBaseURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          AI
        </a>
        <a
          className="text-gray-400 hover:text-purple-400 transition-colors duration-200 hover:scale-105 transform"
          href="/ui"
          rel="noopener noreferrer"
        >
          UI
        </a>

        <a
          href="https://github.com/raisaaajose/shivaay-chatbot"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:scale-105 transform"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
