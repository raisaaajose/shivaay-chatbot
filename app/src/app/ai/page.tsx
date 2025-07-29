"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
              "नमस्ते! I'm Shivaay, your AI guide for Uttarakhand tourism. How can I help you explore the beautiful state of Uttarakhand today?",
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
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiMessageCircle className="text-4xl text-indigo-400" />
            <h1 className="text-4xl font-bold text-white">Chat with Shivaay</h1>
          </div>
          <div className="flex items-center justify-center gap-2">
            {isAIHealthy === null ? (
              <div className="text-gray-400">Connecting...</div>
            ) : isAIHealthy ? (
              <>
                <FiWifi className="text-green-400" />
                <span className="text-green-400 font-medium">AI Connected</span>
              </>
            ) : (
              <>
                <FiWifiOff className="text-red-400" />
                <span className="text-red-400 font-medium">
                  AI Disconnected
                </span>
              </>
            )}
          </div>
        </div>

        {/* Chat Container */}
        <Card
          className="h-[600px] flex flex-col bg-gray-800 border-gray-600"
          elevation={1}
        >
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-3 max-w-[80%] ${
                      message.sender === "user"
                        ? "flex-row-reverse"
                        : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
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

                    {/* Message Bubble */}
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
                            ? "text-indigo-200"
                            : "text-gray-400"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <FiCpu size={16} />
                  </div>
                  <div className="bg-gray-700 text-gray-100 rounded-lg px-4 py-3">
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
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-600 p-4 bg-gray-800">
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
                  className="resize-none bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <AnimatedButton
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading || !isAIHealthy}
                variant="primary"
                className="px-4 py-2"
                icon={<FiSend />}
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
          </div>
        </Card>

        {/* Info Section */}
        <div className="mt-8 text-center text-gray-300">
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
        </div>
      </div>
    </div>
  );
}
