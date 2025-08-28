"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useAuth } from "@/components/Auth/AuthProvider/AuthProvider";
import {
  sendChatMessage,
  checkAIHealth,
  generateSessionId,
} from "@/utils/aiApi";
import {
  getChatSession,
  createChatSession,
  updateChatSession,
  shareChatSession,
  deleteChatSession,
} from "@/utils/chatApi";
import Card from "@/components/ui/Card/Card";
import Input from "@/components/ui/Input/Input";
import AnimatedButton from "@/components/ui/AnimatedButton/AnimatedButton";
import Badge from "@/components/ui/Badge/Badge";
import Modal from "@/components/ui/Modal/Modal";
import useNotification from "@/components/ui/Notification/Notification";
import {
  FiSend,
  FiMessageCircle,
  FiUser,
  FiWifi,
  FiWifiOff,
  FiShare2,
  FiEdit3,
  FiTrash2,
} from "react-icons/fi";
import { BotIcon } from "@/components/Icons/BotIcon";

import FormattedMessage from "../FormattedMessage/FormattedMessage";
import type { Message, ChatSession } from "@/types/Chat/chat.types";

interface ChatInterfaceProps {
  sessionId?: string;
  onSessionChange?: (session: ChatSession | null) => void;
}

export default function ChatInterface({
  sessionId: propSessionId,
  onSessionChange,
}: ChatInterfaceProps) {
  const { user } = useAuth();
  const { notify } = useNotification();

  const [currentSession, setCurrentSession] = useState<ChatSession | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [isAIHealthy, setIsAIHealthy] = useState<boolean | null>(null);
  const [sessionTitle, setSessionTitle] = useState("New Chat");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionInitialized = useRef(false);

  const saveMessagesToSession = useCallback(
    (messages: Message[], currentSessionId: string) => {
      if (!user && typeof window !== "undefined") {
        sessionStorage.setItem(
          `chat_messages_${currentSessionId}`,
          JSON.stringify(messages)
        );
      }
    },
    [user]
  );

  const loadMessagesFromSession = useCallback(
    (currentSessionId: string): Message[] => {
      if (!user && typeof window !== "undefined") {
        const saved = sessionStorage.getItem(
          `chat_messages_${currentSessionId}`
        );
        if (saved) {
          try {
            return JSON.parse(saved);
          } catch (error) {
            console.error("Failed to parse saved messages:", error);
          }
        }
      }
      return [];
    },
    [user]
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const statusVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    sessionInitialized.current = false;
  }, [user]);

  useEffect(() => {
    const initSession = async () => {
      if (sessionInitialized.current) return;

      const newSessionId = propSessionId || generateSessionId();
      setSessionId(newSessionId);

      const healthy = await checkAIHealth();
      setIsAIHealthy(healthy);

      if (user && propSessionId) {
        try {
          const session = await getChatSession(propSessionId);

          if (!session || !session.sessionId) {
            notify("Chat session data is corrupted or invalid", "error");
            return;
          }

          setCurrentSession(session);
          setMessages(session.messages || []);
          setSessionTitle(session.title);
          onSessionChange?.(session);
        } catch (error: unknown) {
          console.error("Failed to load session:", error);

          const errorObj = error as { response?: { status?: number } };
          if (errorObj?.response?.status === 404) {
            notify("Chat session not found or no longer available", "error");
          } else if (errorObj?.response?.status === 403) {
            notify("Access denied to this chat session", "error");
          } else if (
            errorObj?.response?.status &&
            errorObj.response.status >= 500
          ) {
            notify("Server error while loading chat session", "error");
          } else {
            notify("Failed to load chat session", "error");
          }
        }
      } else {
        if (healthy) {
          const welcomeMessage: Message = {
            id: "welcome",
            content:
              "नमस्ते ! I'm Shivaay, your AI guide for Uttarakhand tourism. How can I help you explore the beautiful state of Uttarakhand today?",
            sender: "ai",
            timestamp: new Date(),
          };

          if (!user) {
            const savedMessages = loadMessagesFromSession(newSessionId);
            if (savedMessages.length > 0) {
              setMessages(savedMessages);
            } else {
              setMessages([welcomeMessage]);
              saveMessagesToSession([welcomeMessage], newSessionId);
            }
          } else {
            setMessages([welcomeMessage]);
          }
        }
      }

      sessionInitialized.current = true;
    };

    initSession();
  }, [
    propSessionId,
    notify,
    onSessionChange,
    user,
    loadMessagesFromSession,
    saveMessagesToSession,
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!currentSession && !user) {
      setSessionTitle("Guest Chat");
    } else if (!currentSession && user) {
      setSessionTitle("New Chat");
    }
  }, [user, currentSession]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !isAIHealthy) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);

    if (!user) {
      saveMessagesToSession(newMessages, sessionId);
    }

    try {
      let session = currentSession;

      if (user && !session) {
        const title =
          inputMessage.trim().slice(0, 50) +
          (inputMessage.length > 50 ? "..." : "");
        session = await createChatSession({
          sessionId,
          title,
        });
        setCurrentSession(session);
        setSessionTitle(session.title);
        onSessionChange?.(session);
      }

      const aiResponse = await sendChatMessage(
        sessionId,
        userMessage.content,
        user?._id?.toString()
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      const finalMessages = [...newMessages, aiMessage];
      setMessages(finalMessages);

      // Note: When user is authenticated, the AI backend already syncs messages with the API
      // via the /api/chat/{sessionId}/messages/ai/batch endpoint, so we don't need to add them manually
      if (!user) {
        saveMessagesToSession(finalMessages, sessionId);
      }
    } catch (error) {
      console.error("Failed to get AI response:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Sorry, I'm having trouble connecting to the AI service right now. Please try again in a moment.",
        sender: "ai",
        timestamp: new Date(),
      };

      const errorMessages = [...newMessages, errorMessage];
      setMessages(errorMessages);

      if (!user) {
        saveMessagesToSession(errorMessages, sessionId);
      }

      notify("Failed to send message", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleUpdateTitle = async (newTitle: string) => {
    if (!currentSession || !newTitle.trim()) return;

    try {
      const updatedSession = await updateChatSession(currentSession.sessionId, {
        title: newTitle.trim(),
      });
      setCurrentSession(updatedSession);
      setSessionTitle(updatedSession.title);
      onSessionChange?.(updatedSession);
      notify("Session title updated", "success");
    } catch (error) {
      console.error("Failed to update title:", error);
      notify("Failed to update title", "error");
    }
  };

  const handleShareSession = async () => {
    if (!currentSession) return;

    try {
      const result = await shareChatSession(currentSession.sessionId);
      await navigator.clipboard.writeText(result.shareUrl);
      notify("Share link copied to clipboard", "success");
    } catch (error) {
      console.error("Failed to share session:", error);
      notify("Failed to share session", "error");
    }
  };

  const handleDeleteSession = async () => {
    if (!currentSession) return;
    setShowDeleteModal(true);
  };

  const confirmDeleteSession = async () => {
    if (!currentSession) return;

    try {
      await deleteChatSession(currentSession.sessionId);
      setCurrentSession(null);
      setMessages([]);
      onSessionChange?.(null);
      notify("Chat session deleted", "success");
    } catch (error) {
      console.error("Failed to delete session:", error);
      notify("Failed to delete session", "error");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const formatTime = (date: Date | string) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      className="h-full flex flex-col bg-gradient-to-br from-gray-900/20 via-indigo-900/10 to-purple-900/20 backdrop-blur-3xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="p-2 sm:p-3 md:p-4 border-b border-white/10 glass-strong backdrop-blur-xl animate-glow"
        variants={headerVariants}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <motion.div
              className="w-8 h-8 sm:w-10 sm:h-10 glass-strong border border-purple-400/30 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-xl animate-glow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMessageCircle className="text-white text-sm sm:text-base" />
            </motion.div>
            {user && isEditingTitle ? (
              <Input
                value={sessionTitle}
                onChange={(e) => setSessionTitle(e.target.value)}
                onBlur={() => {
                  setIsEditingTitle(false);
                  handleUpdateTitle(sessionTitle);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    setIsEditingTitle(false);
                    handleUpdateTitle(sessionTitle);
                  }
                }}
                className="text-sm sm:text-lg font-bold min-w-0"
                autoFocus
              />
            ) : (
              <h1
                className={`text-sm sm:text-lg md:text-xl font-bold text-white transition-colors truncate min-w-0 ${
                  user ? "cursor-pointer hover:text-blue-300" : ""
                }`}
                onClick={() => user && setIsEditingTitle(true)}
                title={sessionTitle}
              >
                {sessionTitle}
              </h1>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <motion.div
              className="flex items-center gap-1 sm:gap-2"
              variants={statusVariants}
            >
              {isAIHealthy === null ? (
                <motion.div
                  className="text-purple-300/80 text-xs sm:text-sm hidden sm:block"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Connecting...
                </motion.div>
              ) : isAIHealthy ? (
                <motion.div
                  className="flex items-center gap-1 sm:gap-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FiWifi className="text-emerald-300 text-sm sm:text-base animate-glow" />
                  </motion.div>
                  <span className="text-emerald-300 font-medium text-xs sm:text-sm hidden sm:inline">
                    AI Connected
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  className="flex items-center gap-1 sm:gap-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                >
                  <FiWifiOff className="text-rose-300 text-sm sm:text-base animate-pulse-glow" />
                  <span className="text-rose-300 font-medium text-xs sm:text-sm hidden sm:inline">
                    AI Disconnected
                  </span>
                </motion.div>
              )}
            </motion.div>

            {user && currentSession && (
              <div className="flex items-center gap-0.5 sm:gap-1">
                <AnimatedButton
                  onClick={() => setIsEditingTitle(true)}
                  variant="secondary"
                  icon={<FiEdit3 />}
                  className="text-xs sm:text-sm p-1 sm:p-2"
                  size="icon"
                />
                <AnimatedButton
                  onClick={handleShareSession}
                  variant="secondary"
                  icon={<FiShare2 />}
                  className="text-xs sm:text-sm p-1 sm:p-2"
                  size="icon"
                />
                <AnimatedButton
                  onClick={handleDeleteSession}
                  variant="danger"
                  icon={<FiTrash2 />}
                  className="text-xs sm:text-sm p-1 sm:p-2"
                  size="icon"
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div className="flex-1 overflow-hidden" variants={itemVariants}>
        <Card className="h-full rounded-none border-none glass backdrop-blur-2xl">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 space-y-2 sm:space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-start gap-2 sm:gap-3 max-w-[85%] sm:max-w-[80%] md:max-w-[75%] ${
                        message.sender === "user"
                          ? "flex-row-reverse"
                          : "flex-row"
                      }`}
                    >
                      <motion.div
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 backdrop-blur-xl ${
                          message.sender === "user"
                            ? user?.profilePicture
                              ? ""
                              : "glass-strong border border-blue-400/30 text-white animate-glow"
                            : "glass border border-purple-400/20 text-white animate-float"
                        }`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                          delay: 0.1,
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {message.sender === "user" ? (
                          user?.profilePicture ? (
                            <Image
                              src={user.profilePicture}
                              alt="User profile"
                              width={32}
                              height={32}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <FiUser size={14} className="sm:text-base" />
                          )
                        ) : (
                          <BotIcon size={14} className="sm:text-base" />
                        )}
                      </motion.div>

                      <motion.div
                        className={`rounded-2xl px-3 py-3 sm:px-4 sm:py-3 text-sm sm:text-base backdrop-blur-xl ${
                          message.sender === "user"
                            ? "glass-strong border border-blue-400/30 text-white shadow-lg animate-pulse-glow"
                            : "glass border border-purple-400/20 text-gray-100 shadow-lg"
                        }`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                          delay: 0.2,
                        }}
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <FormattedMessage
                          content={message.content}
                          sender={message.sender}
                        />
                        <p
                          className={`text-xs mt-2 ${
                            message.sender === "user"
                              ? "text-blue-200/80"
                              : "text-purple-300/80"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full glass border border-emerald-400/30 flex items-center justify-center animate-pulse-glow">
                      <BotIcon size={16} />
                    </div>
                    <motion.div
                      className="glass-strong border border-purple-400/20 text-gray-100 rounded-2xl px-4 py-3 backdrop-blur-xl"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-300/80 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-blue-300/80 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-cyan-300/80 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-200">
                          Shivaay is thinking...
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <motion.div
              className="p-2 sm:p-3 md:p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex items-end gap-2 sm:gap-3">
                <div className="flex-1 min-w-0">
                  <Input
                    placeholder={
                      isAIHealthy
                        ? "Ask about Uttarakhand tourism..."
                        : "AI service unavailable"
                    }
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading || !isAIHealthy}
                    className="resize-none border-gray-600 text-white placeholder-gray-400 text-sm sm:text-base min-h-[2.5rem] sm:min-h-[2.75rem]"
                  />
                </div>
                <AnimatedButton
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading || !isAIHealthy}
                  variant="primary"
                  className="px-2 py-2 sm:px-4 sm:py-2 self-center text-sm sm:text-base flex-shrink-0"
                  icon={
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      <FiSend className="text-sm sm:text-base" />
                    </motion.div>
                  }
                >
                  <span className="hidden sm:inline">Send</span>
                </AnimatedButton>
              </div>

              {!isAIHealthy && (
                <p className="text-rose-300 text-xs sm:text-sm mt-2 text-center glass border border-rose-400/30 rounded-xl px-3 py-2 backdrop-blur-xl animate-pulse-glow">
                  Unable to connect to AI service. Please check your connection
                  and try again.
                </p>
              )}
            </motion.div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        className="p-2 sm:p-3 md:p-4 border-t border-white/10 glass backdrop-blur-xl"
        variants={itemVariants}
      >
        <div className="text-center space-y-3">
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="primary" className="text-xs sm:text-sm">
              🧭 AI Tourism Guide
            </Badge>
            <Badge variant="secondary" className="text-xs sm:text-sm">
              🏔️ Uttarakhand Expert
            </Badge>
            <Badge variant="success" className="text-xs sm:text-sm">
              ✨ Cultural Insights
            </Badge>
            <Badge variant="warning" className="text-xs sm:text-sm">
              🗺️ Travel Tips
            </Badge>
          </div>

          <p className="text-xs sm:text-sm text-gray-200">
            Ask about places to visit, cultural insights, travel tips, and more!
          </p>

          {!user && (
            <div className="flex justify-center">
              <Badge variant="primary" className="text-xs animate-shimmer">
                🎯 Guest Mode: Chat saved locally
              </Badge>
            </div>
          )}

          {user && (
            <div className="flex justify-center items-center gap-2">
              <Badge variant="default" className="text-xs font-mono">
                Session ID: {sessionId}
              </Badge>
            </div>
          )}
        </div>
      </motion.div>

      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Chat Session"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Are you sure you want to delete this chat session?
          </p>
          <p className="text-sm text-gray-400">
            This action cannot be undone. All messages in this session will be
            permanently deleted.
          </p>
          <div className="flex gap-2 justify-end">
            <AnimatedButton
              onClick={() => setShowDeleteModal(false)}
              variant="secondary"
            >
              Cancel
            </AnimatedButton>
            <AnimatedButton onClick={confirmDeleteSession} variant="danger">
              Delete Session
            </AnimatedButton>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
