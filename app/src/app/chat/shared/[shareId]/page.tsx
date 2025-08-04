"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { getSharedChatSession } from "@/utils/chatApi";
import Card from "@/components/ui/Card/Card";
import AnimatedButton from "@/components/ui/AnimatedButton/AnimatedButton";
import {
  FiShare2,
  FiUser,
  FiCpu,
  FiEye,
  FiHome,
  FiAlertCircle,
} from "react-icons/fi";
import type { ChatSession, Message } from "@/types/Chat/chat.types";

export default function SharedChatPage() {
  const params = useParams();
  const router = useRouter();
  const shareId = params?.shareId as string;

  const [session, setSession] = useState<ChatSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{
    type: "not_found" | "invalid_id" | "network_error" | "unknown";
    message: string;
  } | null>(null);

  useEffect(() => {
    const loadSharedSession = async () => {
      if (
        !shareId ||
        typeof shareId !== "string" ||
        shareId.trim().length === 0
      ) {
        setError({
          type: "invalid_id",
          message:
            "Invalid share link. The URL appears to be malformed or incomplete.",
        });
        setLoading(false);
        return;
      }

      if (
        shareId.length < 8 ||
        shareId.includes(" ") ||
        !/^[a-zA-Z0-9_-]+$/.test(shareId)
      ) {
        setError({
          type: "invalid_id",
          message:
            "Invalid share link format. Please check the URL and try again.",
        });
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const sharedSession = await getSharedChatSession(shareId);

        if (!sharedSession || !sharedSession.sessionId) {
          setError({
            type: "not_found",
            message:
              "The shared chat session data appears to be corrupted or invalid.",
          });
          return;
        }

        setSession(sharedSession);
      } catch (err: unknown) {
        console.error("Failed to load shared session:", err);

        const errorObj = err as {
          response?: {
            status?: number;
            data?: {
              message?: string;
              error?: string;
            };
          };
          code?: string;
          message?: string;
        };

        if (errorObj.response?.data?.error) {
          switch (errorObj.response.data.error) {
            case "INVALID_SHARE_ID":
            case "INVALID_SHARE_FORMAT":
              setError({
                type: "invalid_id",
                message:
                  errorObj.response.data.message ||
                  "Invalid share link format. Please check the URL and try again.",
              });
              break;
            case "SESSION_NOT_FOUND":
              setError({
                type: "not_found",
                message:
                  errorObj.response.data.message ||
                  "This shared chat session could not be found. It may have been deleted or unshared.",
              });
              break;
            case "SESSION_CORRUPTED":
              setError({
                type: "not_found",
                message:
                  errorObj.response.data.message ||
                  "The shared chat session data appears to be corrupted or invalid.",
              });
              break;
            case "SERVER_ERROR":
              setError({
                type: "network_error",
                message:
                  errorObj.response.data.message ||
                  "Server error occurred. Please try again later.",
              });
              break;
            default:
              setError({
                type: "unknown",
                message:
                  errorObj.response.data.message ||
                  "An unexpected error occurred while loading the chat session.",
              });
          }
        } else if (errorObj.response?.status) {
          if (errorObj.response.status === 400) {
            setError({
              type: "invalid_id",
              message:
                "Invalid share link format. Please check the URL and try again.",
            });
          } else if (errorObj.response.status === 404) {
            setError({
              type: "not_found",
              message:
                "This shared chat session could not be found. It may have been deleted or unshared.",
            });
          } else if (errorObj.response.status === 403) {
            setError({
              type: "not_found",
              message: "This chat session is no longer publicly shared.",
            });
          } else if (errorObj.response.status >= 500) {
            setError({
              type: "network_error",
              message: "Server error occurred. Please try again later.",
            });
          } else {
            setError({
              type: "unknown",
              message:
                "An unexpected error occurred while loading the chat session.",
            });
          }
        } else if (
          errorObj.code === "NETWORK_ERROR" ||
          errorObj.message?.includes("network") ||
          errorObj.message?.includes("ERR_NETWORK") ||
          errorObj.code === "ECONNREFUSED"
        ) {
          setError({
            type: "network_error",
            message:
              "Network error. Please check your connection and try again.",
          });
        } else {
          setError({
            type: "unknown",
            message:
              "An unexpected error occurred while loading the chat session.",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadSharedSession();
  }, [shareId]);

  const formatTime = (date: Date | string) => {
    try {
      return new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid time";
    }
  };

  const formatDate = (date: Date | string) => {
    try {
      return new Date(date).toLocaleDateString([], {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  };

  if (loading) {
    return (
      <main className="h-full flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiShare2 className="text-white text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Loading Shared Chat
          </h2>
          <p className="text-gray-400">Please wait...</p>
        </motion.div>
      </main>
    );
  }

  if (error || !session) {
    const getErrorIcon = () => {
      switch (error?.type) {
        case "not_found":
          return <FiAlertCircle className="text-orange-400 text-2xl" />;
        case "invalid_id":
          return <FiAlertCircle className="text-red-400 text-2xl" />;
        case "network_error":
          return <FiShare2 className="text-blue-400 text-2xl" />;
        default:
          return <FiShare2 className="text-red-400 text-2xl" />;
      }
    };

    const getErrorTitle = () => {
      switch (error?.type) {
        case "not_found":
          return "Chat Not Found";
        case "invalid_id":
          return "Invalid Share Link";
        case "network_error":
          return "Connection Error";
        default:
          return "Chat Not Available";
      }
    };

    const getErrorBackground = () => {
      switch (error?.type) {
        case "not_found":
          return "bg-orange-500/20";
        case "invalid_id":
          return "bg-red-500/20";
        case "network_error":
          return "bg-blue-500/20";
        default:
          return "bg-red-500/20";
      }
    };

    return (
      <main className="h-full flex items-center justify-center">
        <motion.div
          className="text-center max-w-md px-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`w-16 h-16 ${getErrorBackground()} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            {getErrorIcon()}
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            {getErrorTitle()}
          </h2>
          <p className="text-gray-400 mb-6">
            {error?.message ||
              "This shared chat session could not be found or is no longer available."}
          </p>

          <div className="space-y-3">
            <AnimatedButton
              onClick={() => router.push("/chat")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <FiHome size={16} />
              Go to Chat
            </AnimatedButton>

            {error?.type === "network_error" && (
              <AnimatedButton
                onClick={() => window.location.reload()}
                variant="secondary"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors"
              >
                Try Again
              </AnimatedButton>
            )}
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <FiShare2 className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">
                {session.title || "Shared Chat"}
              </h1>
              <span className="text-sm bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full flex items-center gap-1">
                <FiEye size={12} />
                Shared
              </span>
            </div>
            <p className="text-gray-400">
              Shared chat from{" "}
              {formatDate(session.createdAt || session.lastActivity)} •{" "}
              {session.messages?.length || 0} messages
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex-1 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="h-full rounded-lg border border-gray-700">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {!session.messages || session.messages.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <div className="w-12 h-12 bg-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiShare2 className="text-gray-500" />
                  </div>
                  <p>This chat session is empty.</p>
                  <p className="text-sm mt-1">
                    No messages have been shared yet.
                  </p>
                </div>
              ) : (
                session.messages
                  .filter(
                    (message: Message) =>
                      message && message.id && message.content
                  )
                  .map((message: Message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex items-start gap-3 max-w-[80%] ${
                          message.sender === "user"
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.sender === "user"
                              ? "bg-indigo-500 text-white"
                              : "bg-emerald-600 text-white"
                          }`}
                        >
                          {message.sender === "user" ? (
                            <FiUser size={16} />
                          ) : (
                            <FiCpu size={16} />
                          )}
                        </div>

                        <div
                          className={`rounded-lg px-4 py-3 ${
                            message.sender === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-700 text-gray-100"
                          }`}
                        >
                          <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                            {message.content || "Message content unavailable"}
                          </p>
                          <p
                            className={`text-xs mt-2 ${
                              message.sender === "user"
                                ? "text-blue-200"
                                : "text-gray-400"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
              )}
            </div>

            <div className="border-t border-gray-600 p-4">
              <div className="text-center text-gray-400">
                <p className="text-sm">
                  This is a shared view of a chat session with Shivaay AI.
                </p>
                <p className="text-xs mt-1">
                  Chat sessions are read-only when shared publicly.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}
