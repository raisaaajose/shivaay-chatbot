"use client";

import { useAuth } from "../../Auth/AuthProvider/AuthProvider";
import Loader from "../../ui/Loader/Loader";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Auth() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (loading) return <Loader />;

  if (user) {
    return (
      <div className="relative" ref={dropdownRef} style={{ height: "100%" }}>
        <div
          className="flex items-center gap-1 sm:gap-2 cursor-pointer px-2 sm:px-3 hover:bg-[#11131887] rounded-lg transition-all duration-200 h-full group"
          onClick={() => (window.location.href = "/profile")}
        >
          {user.profilePicture && !imageError && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.profilePicture}
              alt={user.name || user.username || "User"}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-[#9DA3B3]/30 transition-all duration-200"
              onError={() => setImageError(true)}
            />
          )}
          <span className="hidden sm:block text-sm font-medium whitespace-nowrap text-[#E4E6EA] group-hover:text-white transition-colors duration-200 max-w-[120px] lg:max-w-[160px] truncate">
            {user.name || user.username || user.email}
          </span>
          <span
            className="ml-1 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full hover:bg-[#333333] transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
            tabIndex={0}
            aria-label="Open user menu"
            role="button"
          >
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="sm:w-6 sm:h-6"
            >
              <motion.path
                d="M6 10L12 16L18 10"
                stroke="#9DA3B3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  stroke: open ? "#fff" : "#9DA3B3",
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.svg>
          </span>
        </div>
        <AnimatePresence>
          {open ? (
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute right-0 mt-2 w-64 sm:w-72 min-w-[200px] max-w-[90vw] bg-[#1a1a1a]/95 backdrop-blur-md border border-[#444444]/60 rounded-xl shadow-2xl z-50 p-4 flex flex-col gap-3"
              style={{
                color: "var(--foreground)",
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="mb-1 flex flex-col gap-2 pb-3 border-b border-[#333333]/50">
                <div className="font-semibold text-white text-base break-all flex items-center gap-2">
                  {user.profilePicture && !imageError && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.profilePicture}
                      alt={user.name || user.username || "User"}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#444444]"
                      onError={() => setImageError(true)}
                    />
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className="truncate">@{user.username || "-"}</span>
                    <span className="text-xs text-gray-400 truncate font-normal">
                      {user.name || "No display name"}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-300 break-all px-1">
                  {user.email}
                </div>
              </div>
              <button
                onClick={async () => {
                  setOpen(false);
                  await logout();
                  window.location.href = "/auth";
                }}
                className="w-full px-4 py-2.5 text-sm bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200 border border-red-600/30 hover:border-red-500/50 font-medium"
              >
                Sign Out
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <button
      onClick={() => (window.location.href = "/auth")}
      className="px-3 sm:px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-500/30 hover:border-blue-400/50 text-blue-300 hover:text-blue-200 transition-all duration-200 backdrop-blur-sm"
    >
      Sign In
    </button>
  );
}
