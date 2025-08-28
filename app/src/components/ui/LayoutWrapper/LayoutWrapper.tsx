"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "../../Auth/AuthProvider/AuthProvider";
import ParticlesBackground from "../../Landing/Hero/ParticlesBackground";
import "../../Landing/Landing.css";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [pathname]);

  return (
    <div
      className={clsx(
        "transition-all duration-300 ease-in-out min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative",
        {
          // Desktop with sidebar - main content starts after sidebar width
          "md:ml-64": !isMobile && user,
          // Mobile or no user - full width
          "w-full": isMobile || !user,
          // Mobile with user - add bottom padding for mobile nav (64px = h-16)
          "pb-16 md:pb-0": user && isMobile,
        }
      )}
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        boxSizing: "border-box",
        width: !isMobile && user ? "calc(100vw - 16rem)" : "100vw",
        overflowX: "hidden",
      }}
    >
      {/* Enhanced Background */}
      <ParticlesBackground />

      {/* Additional Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
      </div>

      {/* Main Content Container */}
      <div
        className={clsx(
          "flex flex-col min-h-screen relative z-10 content-area flex-1",
          {
            // Add horizontal padding only when no sidebar or on mobile
            "px-4 sm:px-6 lg:px-8": isMobile || !user,
            // When sidebar is visible on desktop, add minimal padding to prevent edge touching
            "px-4 md:px-6": !isMobile && user,
          }
        )}
        style={{
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
