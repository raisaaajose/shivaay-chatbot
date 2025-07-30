import React from "react";
import { baseURL, aiBaseURL } from "../../utils/api";

const Footer: React.FC = () => {
  return (
    <footer className="hidden md:flex bottom-0 left-0 w-full h-16 border-t-2 border-[#333333] bg-[var(--background)]/70 backdrop-blur-sm px-6 py-4 flex-col md:flex-row items-center justify-between text-[#9DA3B3] text-sm font-normal select-none z-50">
      <span className="mb-2 md:mb-0">
        © {new Date().getFullYear()} Deep Shiva Chatbot
      </span>
      <div className="flex space-x-4">
        <a
          style={{ color: "lightgray" }}
          href={baseURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          API
        </a>
        <a
          style={{ color: "lightgray" }}
          href={aiBaseURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          AI
        </a>
        <a
          href="https://github.com/raisaaajose/shivaay-chatbot"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "lightgray" }}
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
