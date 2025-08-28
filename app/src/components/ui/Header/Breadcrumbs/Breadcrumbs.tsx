"use client";

import React from "react";
import Link from "next/link";
import { MdArrowForwardIos, MdHome } from "react-icons/md";
import { usePathname } from "next/navigation";

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const pathSegments =
    typeof pathname === "string" ? pathname.split("/").filter(Boolean) : [];

  // Don't show breadcrumbs on home page
  if (pathSegments.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center overflow-hidden" aria-label="Breadcrumbs">
      {/* Home Link */}
      <Link href="/" className="flex items-center group" aria-label="Home">
        <MdHome className="text-gray-400 group-hover:text-cyan-400 text-sm transition-colors duration-200" />
      </Link>

      {/* Path Segments */}
      <div className="flex items-center overflow-hidden">
        {pathSegments.map((segment, idx) => {
          const href = "/" + pathSegments.slice(0, idx + 1).join("/");
          const isLast = idx === pathSegments.length - 1;

          return (
            <React.Fragment key={idx}>
              <MdArrowForwardIos className="text-xs mx-1.5 sm:mx-2 text-gray-500/60 flex-shrink-0 transition-colors duration-200" />
              <Link
                href={href}
                className={`group ${isLast ? "pointer-events-none" : ""}`}
                aria-current={isLast ? "page" : undefined}
              >
                <span
                  className={`text-sm md:text-base font-normal select-none flex items-center h-full tracking-wide transition-all duration-200 ${
                    isLast
                      ? "text-white font-medium"
                      : "text-gray-400 hover:text-cyan-400 group-hover:scale-105 transform"
                  }`}
                >
                  {segment
                    .split("-")
                    .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
                    .join(" ")}
                </span>
              </Link>
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
