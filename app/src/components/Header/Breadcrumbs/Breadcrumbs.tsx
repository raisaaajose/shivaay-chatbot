"use client";

import React from "react";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";
import { usePathname } from "next/navigation";

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const pathSegments =
    typeof pathname === "string" ? pathname.split("/").filter(Boolean) : [];

  return (
    <div className="flex items-center overflow-hidden">
      <span className="flex items-center">
        {pathSegments.map((segment, idx) => {
          const href = "/" + pathSegments.slice(0, idx + 1).join("/");
          return (
            <React.Fragment key={idx}>
              <MdArrowForwardIos className="text-xs mx-1 text-[#9DA3B3] flex-shrink-0" />
              <Link href={href} className="max-w-[120px] md:max-w-[200px]">
                <span className="text-[#9DA3B3] text-sm md:text-base font-normal select-none mx-1 flex items-center h-full tracking-wide truncate hover:text-white transition-colors duration-200">
                  {segment
                    .split("-")
                    .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
                    .join(" ")}
                </span>
              </Link>
            </React.Fragment>
          );
        })}
      </span>
    </div>
  );
};

export default Breadcrumbs;
