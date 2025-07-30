"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  sendChatMessage,
  checkAIHealth,
  generateSessionId,
} from "@/utils/aiApi";
import Card from "@/components/ui/Card/Card";
import Input from "@/components/ui/Input/Input";
import AnimatedButton from "@/components/ui/AnimatedButton/AnimatedButton";
import {
  FiSend,
  FiMessageCircle,
  FiCpu,
  FiUser,
  FiWifi,
  FiWifiOff,
} from "react-icons/fi";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function AI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [isAIHealthy, setIsAIHealthy] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Animation variants
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

  // Initialize session and check AI health
  useEffect(() => {
    const initSession = async () => {
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);

      // Check AI backend health
      const healthy = await checkAIHealth();
      setIsAIHealthy(healthy);

      // Add welcome message
      if (healthy) {
        setMessages([
          {
            id: "welcome",
            content:
              "नमस्ते ! I'm Shivaay, your AI guide for Uttarakhand tourism. How can I help you explore the beautiful state of Uttarakhand today?",
            sender: "ai",
            timestamp: new Date(),
          },
        ]);
      }
    };

    initSession();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !isAIHealthy) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const aiResponse = await sendChatMessage(sessionId, userMessage.content);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to get AI response:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Sorry, I'm having trouble connecting to the AI service right now. Please try again in a moment.",
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <motion.div
      className="min-h-screen py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            variants={headerVariants}
          >
            <motion.div
              initial={{ rotate: 0, scale: 1 }}
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <FiMessageCircle className="text-4xl text-indigo-400" />
            </motion.div>
            <motion.h1
              className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3,
              }}
            >
              Chat with Shivaay
            </motion.h1>
          </motion.div>
          <motion.div
            className="flex items-center justify-center gap-2"
            variants={statusVariants}
          >
            {isAIHealthy === null ? (
              <motion.div
                className="text-gray-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Connecting...
              </motion.div>
            ) : isAIHealthy ? (
              <motion.div
                className="flex items-center gap-2"
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
                  <FiWifi className="text-green-400" />
                </motion.div>
                <span className="text-green-400 font-medium">AI Connected</span>
              </motion.div>
            ) : (
              <motion.div
                className="flex items-center gap-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              >
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <FiWifiOff className="text-red-400" />
                </motion.div>
                <span className="text-red-400 font-medium">
                  AI Disconnected
                </span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card
            className="h-[600px] flex flex-col bg-gray-800/30 border-gray-600"
            elevation={1}
          >
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
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
                      className={`flex items-start gap-3 max-w-[80%] ${
                        message.sender === "user"
                          ? "flex-row-reverse"
                          : "flex-row"
                      }`}
                    >
                      <motion.div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.sender === "user"
                            ? "bg-indigo-500 text-white"
                            : "bg-emerald-600 text-white"
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
                          <FiUser size={16} />
                        ) : (
                          <FiCpu size={16} />
                        )}
                      </motion.div>

                      <motion.div
                        className={`rounded-lg px-4 py-3 ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-100"
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
                        <p className="text-sm md:text-base leading-relaxed">
                          {message.content}
                        </p>
                        <p
                          className={`text-xs mt-2 ${
                            message.sender === "user"
                              ? "text-indigo-200"
                              : "text-gray-400"
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
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-3 max-w-[80%]">
                    <motion.div
                      className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <FiCpu size={16} />
                    </motion.div>
                    <motion.div
                      className="bg-gray-700 text-gray-100 rounded-lg px-4 py-3"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-300">
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
              className="border-t border-gray-600 p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex items-end gap-3">
                <div className="flex-1">
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
                    className="resize-none border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <AnimatedButton
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading || !isAIHealthy}
                  variant="primary"
                  className="px-4 py-2"
                  icon={
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      <FiSend />
                    </motion.div>
                  }
                >
                  Send
                </AnimatedButton>
              </div>

              {!isAIHealthy && (
                <p className="text-red-400 text-sm mt-2 text-center">
                  Unable to connect to AI service. Please check your connection
                  and try again.
                </p>
              )}
            </motion.div>
          </Card>
        </motion.div>

        <motion.div
          className="mt-8 text-center text-gray-300"
          variants={itemVariants}
        >
          <p className="text-sm">
            Shivaay is your AI guide for Uttarakhand tourism. Ask about places
            to visit, cultural insights, travel tips, and more!
          </p>
          <p className="text-xs mt-2">
            Session ID:{" "}
            <code className="bg-gray-700 text-gray-200 px-2 py-1 rounded text-xs">
              {sessionId}
            </code>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
