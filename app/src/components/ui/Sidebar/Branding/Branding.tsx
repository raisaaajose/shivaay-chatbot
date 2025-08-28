"use client";

import Image from "next/image";
import Link from "next/link";

export default function Branding() {
  return (
    <Link
      href="/"
      className="flex items-center justify-center w-full group"
      tabIndex={0}
    >
      <Image
        src="/icon.svg"
        alt="Logo"
        width={32}
        height={32}
        className="h-8 w-8 group-hover:scale-110 transition-transform duration-200"
      />
      <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">
        Shivaay
      </span>
    </Link>
  );
}
