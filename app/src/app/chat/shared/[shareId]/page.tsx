"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { getSharedChatSession } from "@/utils/chatApi";
import Card from "@/components/ui/Card/Card";
import { FiShare2, FiUser, FiCpu, FiEye } from "react-icons/fi";
import type { ChatSession, Message } from "@/types/Chat/chat.types";

export default function SharedChatPage() {
  const params = useParams();
  const shareId = params?.shareId as string;

  const [session, setSession] = useState<ChatSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSharedSession = async () => {
      try {
        setLoading(true);
        const sharedSession = await getSharedChatSession(shareId);
        setSession(sharedSession);
      } catch (err) {
        console.error("Failed to load shared session:", err);
        setError(
          "This shared chat session could not be found or is no longer available."
        );
      } finally {
        setLoading(false);
      }
    };

    if (shareId) {
      loadSharedSession();
    }
  }, [shareId]);

  const formatTime = (date: Date | string) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
    return (
      <main className="h-full flex items-center justify-center">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiShare2 className="text-red-400 text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Chat Not Found</h2>
          <p className="text-gray-400">
            {error ||
              "This shared chat session could not be found or is no longer available."}
          </p>
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
              <h1 className="text-2xl font-bold text-white">{session.title}</h1>
              <span className="text-sm bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full flex items-center gap-1">
                <FiEye size={12} />
                Shared
              </span>
            </div>
            <p className="text-gray-400">
              Shared chat from{" "}
              {formatDate(session.createdAt || session.lastActivity)} •{" "}
              {session.messages.length} messages
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
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {session.messages.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  This chat session is empty.
                </div>
              ) : (
                session.messages.map((message: Message) => (
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
                        <p className="text-sm md:text-base leading-relaxed">
                          {message.content}
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

            {/* Footer */}
            <div className="border-t border-gray-600 p-4 bg-gray-800/30">
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
