"use client";

import React, { useState, useEffect } from "react";
import { MdCookie, MdClose } from "react-icons/md";
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
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-6 right-6 md:left-1/2 md:transform md:-translate-x-1/2 md:right-auto w-auto md:max-w-4xl bg-black/95 backdrop-blur-xl rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-gray-800/40 text-gray-100 z-50 overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center gap-3">
              <MdCookie
                className="w-6 h-6 text-amber-400 flex-shrink-0"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-white text-lg">
                Cookie Notice
              </h3>
            </div>
            <button
              onClick={handleDecline}
              className="p-2 rounded-lg hover:bg-gray-800/80 transition-colors duration-200"
              aria-label="Decline cookies"
            >
              <MdClose className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
          </div>

          <div className="px-6 pb-6">
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              We use cookies to enhance your browsing experience, serve
              personalized content, and analyze our traffic. By continuing to
              use our site, you consent to our use of cookies.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAccept}
                className="flex-1 bg-white text-black font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black text-sm"
                aria-label="Accept all cookies"
              >
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 sm:flex-none bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium py-3 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black text-sm border border-gray-600"
                aria-label="Decline cookies"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AcceptCookies;
