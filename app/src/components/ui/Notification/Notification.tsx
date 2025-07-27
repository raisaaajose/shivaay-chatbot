"use client";

import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import clsx from "clsx";
import React from "react";

export type NotificationType = "success" | "error" | "info" | "warning";

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  notify: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const removalQueue = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    return () => {
      removalQueue.current.forEach(clearTimeout);
    };
  }, []);

  const notify = (message: string, type: NotificationType = "info") => {
    const id = crypto.randomUUID();
    setNotifications((prev) => [...prev, { id, message, type }]);

    const timeoutId = setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      removalQueue.current = removalQueue.current.filter(
        (t) => t !== timeoutId
      );
    }, 5000);

    removalQueue.current.push(timeoutId);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const iconMap: Record<NotificationType, React.ReactElement> = {
    success: (
      <CheckCircle className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
    ),
    error: <AlertCircle className="w-4 h-4 text-red-500" strokeWidth={2.5} />,
    info: <Info className="w-4 h-4 text-blue-500" strokeWidth={2.5} />,
    warning: (
      <AlertTriangle className="w-4 h-4 text-amber-500" strokeWidth={2.5} />
    ),
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="fixed top-4 right-4 z-50 pointer-events-none">
        <div className="flex flex-col gap-3 w-80 max-w-[calc(100vw-2rem)]">
          <AnimatePresence mode="popLayout">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                layout
                initial={{
                  opacity: 0,
                  x: 300,
                  scale: 0.95,
                  filter: "blur(4px)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  x: 300,
                  scale: 0.95,
                  filter: "blur(4px)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 40,
                  mass: 0.8,
                  delay: index * 0.04,
                }}
                layoutId={notification.id}
                className="pointer-events-auto"
              >
                <div
                  className={clsx(
                    "relative group rounded-2xl p-4 shadow-xl backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl",
                    {
                      "bg-gray-900/95 border-emerald-500/30 hover:border-emerald-400/50":
                        notification.type === "success",
                      "bg-gray-900/95 border-red-500/30 hover:border-red-400/50":
                        notification.type === "error",
                      "bg-gray-900/95 border-blue-500/30 hover:border-blue-400/50":
                        notification.type === "info",
                      "bg-gray-900/95 border-amber-500/30 hover:border-amber-400/50":
                        notification.type === "warning",
                    }
                  )}
                >
                  {/* Subtle glow effect */}
                  <div
                    className={clsx(
                      "absolute inset-0 rounded-2xl opacity-20 transition-opacity duration-300 group-hover:opacity-30 blur-md",
                      {
                        "bg-emerald-500/20": notification.type === "success",
                        "bg-red-500/20": notification.type === "error",
                        "bg-blue-500/20": notification.type === "info",
                        "bg-amber-500/20": notification.type === "warning",
                      }
                    )}
                  />

                  <div className="relative flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 25,
                          delay: index * 0.04 + 0.1,
                        }}
                        className={clsx("p-2 rounded-xl", {
                          "bg-emerald-500/10": notification.type === "success",
                          "bg-red-500/10": notification.type === "error",
                          "bg-blue-500/10": notification.type === "info",
                          "bg-amber-500/10": notification.type === "warning",
                        })}
                      >
                        {iconMap[notification.type]}
                      </motion.div>
                    </div>

                    <div className="flex-1 min-w-0 pt-2">
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: index * 0.04 + 0.15,
                          duration: 0.3,
                        }}
                        className="text-sm font-medium text-gray-200 leading-relaxed"
                      >
                        {notification.message}
                      </motion.p>
                    </div>

                    <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: index * 0.04 + 0.2,
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                      onClick={() => removeNotification(notification.id)}
                      className="flex-shrink-0 p-2 rounded-xl text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600/50"
                      aria-label="Dismiss notification"
                    >
                      <X className="w-4 h-4" strokeWidth={2} />
                    </motion.button>
                  </div>

                  {/* Progress bar */}
                  <motion.div
                    className={clsx(
                      "absolute bottom-0 left-0 h-0.5 rounded-b-2xl",
                      {
                        "bg-emerald-400": notification.type === "success",
                        "bg-red-400": notification.type === "error",
                        "bg-blue-400": notification.type === "info",
                        "bg-amber-400": notification.type === "warning",
                      }
                    )}
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{
                      duration: 5,
                      ease: "linear",
                      delay: index * 0.04 + 0.3,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </NotificationContext.Provider>
  );
};

export default useNotification;
