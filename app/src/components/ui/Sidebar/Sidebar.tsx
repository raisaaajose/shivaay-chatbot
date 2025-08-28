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

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <AnimatePresence>
        {user && (
          <motion.aside
            initial={{ x: -256, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -256, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="hidden md:flex fixed top-0 left-0 z-40 h-full w-64 bg-gradient-to-b from-slate-900/95 via-purple-900/10 to-slate-900/95 backdrop-blur-xl border-r border-white/10 shadow-2xl shadow-purple-500/10 flex-col"
          >
            <div className="px-4 py-6 border-b border-white/10">
              <Branding />
              <nav className="mt-8 flex flex-col space-y-2">
                {navItems.map(({ href, label, icon, admin }) => {
                  const isActive =
                    href === "/"
                      ? pathname === href
                      : pathname.startsWith(href);
                  return (
                    <Link
                      key={label}
                      href={href}
                      className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 group
                        ${
                          isActive
                            ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-white"
                            : admin
                            ? "text-amber-400 hover:bg-amber-500/10 hover:text-amber-300 border border-transparent hover:border-amber-500/20"
                            : "text-gray-300 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10"
                        }
                      `}
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                        {icon}
                      </span>
                      <span className="truncate font-medium">{label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex-1 overflow-hidden px-2"
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
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 via-purple-900/10 to-slate-900/95 backdrop-blur-xl border-t border-white/10 flex h-16 shadow-2xl shadow-purple-500/10"
          >
            {mobileNavItems.map(({ href, icon, label, onClick }) => {
              const isActive =
                href === "/" ? pathname === href : pathname.startsWith(href);

              if (onClick) {
                return (
                  <button
                    key={label}
                    onClick={onClick}
                    className={`flex-1 flex items-center justify-center h-full text-xl transition-all duration-200 ${
                      showMobileChatSessions
                        ? "bg-blue-600/20 text-blue-300 border-t-2 border-blue-400"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {icon}
                  </button>
                );
              }

              return (
                <Link
                  key={label}
                  href={href}
                  className={`flex-1 flex items-center justify-center h-full text-xl transition-all duration-200 ${
                    isActive
                      ? "bg-purple-600/20 text-purple-300 border-t-2 border-purple-400"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
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
              className="absolute bottom-16 left-0 right-0 bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-t border-white/10 max-h-[60vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-4 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-white font-semibold">Chat Sessions</h3>
                <button
                  onClick={() => setShowMobileChatSessions(false)}
                  className="text-gray-400 hover:text-white text-lg w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  ✕
                </button>
              </div>
              <div className="overflow-y-auto max-h-[calc(60vh-80px)] px-2 pb-2">
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
