"use client";

import React from "react";
import Auth from "./Auth/Auth";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";

const Header: React.FC = () => {
  return (
    <header
      className={`
        h-16
        w-full
        border-b-2 border-[#2c313f]
        flex items-center justify-between
        bg-[var(--background)]/50 backdrop-blur-sm
        px-4 sm:px-6
        z-50
        transition-all duration-300
      `}
    >
      <h2 className="text-lg sm:text-xl font-bold tracking-tight flex items-center overflow-hidden whitespace-nowrap h-full m-0 flex-1 min-w-0">
        <Link
          href="/"
          className="flex items-center h-full"
          style={{ textDecoration: "none" }}
        >
          <span className="text-[#9DA3B3] text-sm sm:text-base font-normal select-none mr-1 pl-2 sm:pl-5 flex items-center h-full tracking-wide truncate">
            Deep Shiva Chatbot
          </span>
        </Link>
        <div className="hidden sm:block">
          <Breadcrumbs />
        </div>
      </h2>
      <div className="flex items-center h-full flex-shrink-0">
        <Auth />
      </div>
    </header>
  );
};

export default Header;
