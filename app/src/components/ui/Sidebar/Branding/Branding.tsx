"use client";

import Image from "next/image";
import Link from "next/link";

export default function Branding() {
  return (
    <Link
      href="/"
      className="flex items-center justify-center w-full"
      tabIndex={0}
    >
      <Image
        src="/icon.svg"
        alt="Logo"
        width={27}
        height={27}
        className="h-8 w-auto"
      />
      <span
        className="ml-2 truncate"
        style={{
          width: "auto",
          flex: "none",
          letterSpacing: "0.02em",
          fontSize: "1.2em",
        }}
      >
        Shivaay
      </span>
    </Link>
  );
}
