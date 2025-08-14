"use client";

import React from "react";
import Auth from "./Auth/Auth";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";

const Header: React.FC = () => {
  return (
    <header
      className={`
        h-14 sm:h-16 lg:h-18
        w-full
        border-b border-[#2c313f]/60
        flex items-center justify-between
        bg-[var(--background)]/80 backdrop-blur-md
        px-3 sm:px-4 md:px-6 lg:px-8
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
          <span className="text-[#9DA3B3] hover:text-white text-base sm:text-lg lg:text-xl font-medium select-none px-2 sm:px-3 lg:px-4 flex items-center h-full tracking-wide transition-colors duration-200 group-hover:scale-105 transform">
            Shivaay
          </span>
        </Link>

        {/* Breadcrumbs - responsive visibility */}
        <div className="hidden sm:flex items-center h-full ml-2 lg:ml-4 flex-1 min-w-0">
          <div className="w-px h-6 bg-[#2c313f] mx-2 lg:mx-3" />
          <div className="flex-1 min-w-0">
            <Breadcrumbs />
          </div>
        </div>
      </div>

      {/* Auth Section */}
      <div className="flex items-center h-full flex-shrink-0 ml-2 sm:ml-4">
        <Auth />
      </div>
    </header>
  );
};

export default Header;
