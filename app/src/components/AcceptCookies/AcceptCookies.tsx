"use client";

import React, { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AcceptCookies: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookieAccepted");
    if (!accepted) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieAccepted", "true");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieAccepted", "false");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 40,
            mass: 0.8,
          }}
          className="fixed bottom-6 left-6 right-6 md:left-1/2 md:transform md:-translate-x-1/2 md:right-auto w-auto md:max-w-4xl bg-gradient-to-br from-gray-900/85 to-gray-800/85 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 text-white z-50 overflow-hidden group hover:border-gray-600/60 transition-all duration-300"
        >
          {/* Enhanced glassmorphism background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/8 to-blue-500/5 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Subtle decorative elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/15 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full translate-y-8 -translate-x-8 group-hover:scale-105 transition-transform duration-500" />

          <div className="relative flex items-center justify-between p-6 pb-4 z-10">
            <div className="flex items-center gap-3">
              <motion.div
                className="inline-flex items-center justify-center w-11 h-11 bg-gradient-to-br from-amber-500/20 to-orange-500/15 rounded-xl border border-amber-500/25 backdrop-blur-sm"
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ duration: 0.3 }}
              >
                <Cookie
                  className="w-5 h-5 text-amber-400 flex-shrink-0"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </motion.div>
              <h3 className="font-semibold text-lg text-gray-100">
                Cookie Notice
              </h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDecline}
              className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/40 text-gray-400 hover:text-gray-200 border border-transparent hover:border-white/15"
              aria-label="Decline cookies"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </motion.button>
          </div>

          <div className="relative px-6 pb-6 z-10">
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              We use cookies to enhance your browsing experience, serve
              personalized content, and analyze our traffic. By continuing to
              use our site, you consent to our use of cookies.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="relative group flex-1"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/60 to-purple-600/60 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition duration-300" />
                <button
                  onClick={handleAccept}
                  className="relative w-full inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600/90 to-purple-600/90 rounded-xl backdrop-blur-sm border border-blue-500/30 shadow-lg transition-all duration-200 hover:shadow-xl"
                  aria-label="Accept all cookies"
                >
                  Accept All
                </button>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDecline}
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-300 border border-gray-600/60 backdrop-blur-sm rounded-xl hover:bg-gray-700/30 hover:text-gray-200 hover:border-gray-500/70 transition-all duration-200 shadow-md"
                aria-label="Decline cookies"
              >
                Decline
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AcceptCookies;
