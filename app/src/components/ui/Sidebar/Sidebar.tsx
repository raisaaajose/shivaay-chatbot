"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Branding from "./Branding/Branding";
import { FiShield, FiUser, FiHome, FiMessageSquare } from "react-icons/fi";
import { useAuth } from "../../Auth/AuthProvider/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ChatSessionsList from "../../Chat/ChatSessionsList/ChatSessionsList";

export default function Sidebar() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showMobileChatSessions, setShowMobileChatSessions] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    setIsAdmin(user.role === "admin" || user.role === "superadmin");
  }, [user]);

  const navItems = [
    ...(isAdmin
      ? [{ href: "/admin", label: "Admin", icon: <FiShield />, admin: true }]
      : []),
    { href: "/", label: "Home", icon: <FiHome /> },
    { href: "/profile", label: "Profile", icon: <FiUser /> },
  ];

  const mobileNavItems = [
    ...(isAdmin
      ? [{ href: "/admin", label: "Admin", icon: <FiShield />, admin: true }]
      : []),
    { href: "/", label: "Home", icon: <FiHome /> },
    {
      href: "#",
      label: "Chat Sessions",
      icon: <FiMessageSquare />,
      onClick: () => setShowMobileChatSessions(!showMobileChatSessions),
    },
    { href: "/profile", label: "Profile", icon: <FiUser /> },
  ];

  const handleSelectSession = (sessionId: string) => {
    router.push(`/chat/${sessionId}`);
  };

  if (loading || !user) return null;

  const sidebarWidth = "w-64";

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <AnimatePresence>
        {user && (
          <motion.aside
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ type: "tween", duration: 0.8, ease: "easeInOut" }}
            className={`hidden md:flex fixed top-0 left-0 z-40 h-full ${sidebarWidth} bg-[#1a1a1a] border-r border-[#333333] shadow-sm flex-col`}
          >
            <div className="px-3 sm:px-4 py-4 sm:py-6 border-b border-[#333333]">
              <Branding />
              <nav className="mt-6 sm:mt-8 flex flex-col space-y-2 sm:space-y-4">
                {navItems.map(({ href, label, icon, admin }) => {
                  const isActive =
                    href === "/"
                      ? pathname === href
                      : pathname.startsWith(href);
                  return (
                    <Link
                      key={label}
                      href={href}
                      className={`sidebar-link flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-md transition
                        ${
                          isActive
                            ? "bg-gray-700 text-white"
                            : admin
                            ? "text-amber-400 hover:bg-amber-500/20 hover:text-white"
                            : "text-white"
                        }
                        hover:bg-gray-700 hover:text-white
                      `}
                      style={
                        !isActive && !admin
                          ? { opacity: 0.7 }
                          : !isActive && admin
                          ? { opacity: 0.7 }
                          : undefined
                      }
                    >
                      <span className="text-base sm:text-lg">{icon}</span>
                      <span className="truncate">{label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex-1 overflow-hidden"
            >
              <ChatSessionsList onSelectSession={handleSelectSession} />
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MOBILE BOTTOM NAV */}
      <AnimatePresence>
        {user && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a] border-t border-[#333333] flex h-14"
          >
            {mobileNavItems.map(({ href, icon, label, onClick }) => {
              const isActive =
                href === "/" ? pathname === href : pathname.startsWith(href);

              if (onClick) {
                return (
                  <button
                    key={label}
                    onClick={onClick}
                    className={`flex-1 flex items-center justify-center h-full text-2xl text-white ${
                      showMobileChatSessions
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                    style={
                      !showMobileChatSessions ? { opacity: 0.7 } : undefined
                    }
                  >
                    {icon}
                  </button>
                );
              }

              return (
                <Link
                  key={label}
                  href={href}
                  className={`flex-1 flex items-center justify-center h-full text-2xl text-white ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-700"
                  }`}
                  style={!isActive ? { opacity: 0.7 } : undefined}
                >
                  {icon}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE CHAT SESSIONS MODAL */}
      <AnimatePresence>
        {user && showMobileChatSessions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setShowMobileChatSessions(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute bottom-14 left-0 right-0 bg-[#1a1a1a] border-t border-[#333333] max-h-[60vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-3 border-b border-[#333333] flex justify-between items-center">
                <h3 className="text-white font-medium">Chat Sessions</h3>
                <button
                  onClick={() => setShowMobileChatSessions(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="overflow-y-auto max-h-[calc(60vh-60px)]">
                <ChatSessionsList
                  onSelectSession={(sessionId) => {
                    handleSelectSession(sessionId);
                    setShowMobileChatSessions(false);
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
