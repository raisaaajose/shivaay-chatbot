"use client";

import React from "react";
import Auth from "./Auth/Auth";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";

const Header: React.FC = () => {
  return (
    <header
      className={`
        h-12 sm:h-14 md:h-16 lg:h-18
        w-full
        border-b border-[#2c313f]/60
        flex items-center justify-between
        bg-[var(--background)]/80 backdrop-blur-md
        px-2 sm:px-3 md:px-6 lg:px-8
        z-50
        transition-all duration-300 ease-in-out
        shadow-sm
        sticky top-0
      `}
    >
      {/* Logo and Breadcrumbs Container */}
      <div className="flex items-center flex-1 min-w-0 h-full">
        <Link
          href="/"
          className="flex items-center h-full group"
          style={{ textDecoration: "none" }}
        >
          <span className="text-[#9DA3B3] hover:text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium select-none px-1 sm:px-2 md:px-3 lg:px-4 flex items-center h-full tracking-wide transition-colors duration-200 group-hover:scale-105 transform">
            Shivaay
          </span>
        </Link>

        {/* Breadcrumbs - responsive visibility */}
        <div className="hidden sm:flex items-center h-full ml-1 sm:ml-2 lg:ml-4 flex-1 min-w-0">
          <div className="w-px h-4 sm:h-6 bg-[#2c313f] mx-1 sm:mx-2 lg:mx-3" />
          <div className="flex-1 min-w-0">
            <Breadcrumbs />
          </div>
        </div>
      </div>

      {/* Auth Section */}
      <div className="flex items-center h-full flex-shrink-0 ml-1 sm:ml-2 md:ml-4">
        <Auth />
      </div>
    </header>
  );
};

export default Header;
