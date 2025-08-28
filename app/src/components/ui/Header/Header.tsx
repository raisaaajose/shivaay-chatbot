"use client";

import React from "react";
import Auth from "./Auth/Auth";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import { useAuth } from "../../Auth/AuthProvider/AuthProvider";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const { user } = useAuth();
  const pathname = usePathname();

  // Hide header on the root route
  if (pathname === "/") {
    return null;
  }

  return (
    <header
      className={`
        h-12 sm:h-14 md:h-16 lg:h-18
        w-full
        flex items-center justify-between
        bg-transparent
        px-2 sm:px-3 md:px-6 lg:px-8
        z-50
        transition-all duration-300 ease-in-out
        sticky top-0
      `}
    >
      <div className="flex items-center flex-1 min-w-0 h-full">
        {!user && (
          <Link href="/" className="flex items-center h-full group">
            <span className="text-gradient-hero text-sm sm:text-base md:text-lg lg:text-xl font-bold select-none px-1 sm:px-2 md:px-3 lg:px-4 flex items-center h-full tracking-wide transition-all duration-200 group-hover:scale-105 transform">
              Shivaay
            </span>
          </Link>
        )}
        <div
          className={`hidden sm:flex items-center h-full flex-1 min-w-0 ${
            !user ? "ml-1 sm:ml-2 lg:ml-4" : ""
          }`}
        >
          <div className="flex-1 min-w-0">
            <Breadcrumbs />
          </div>
        </div>
      </div>

      <div className="flex items-center h-full flex-shrink-0 ml-1 sm:ml-2 md:ml-4">
        <Auth />
      </div>
    </header>
  );
};

export default Header;
