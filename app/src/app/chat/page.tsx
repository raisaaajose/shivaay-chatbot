"use client";

import React from "react";
import { motion } from "framer-motion";
import ChatInterface from "@/components/Chat/ChatInterface/ChatInterface";
import PageHeading from "@/components/ui/PageHeading/PageHeading";
import { FiMessageSquare } from "react-icons/fi";

export default function ChatPage() {
  return (
    <main className="h-full flex flex-col">
      {/* Page Header */}
      <div className="mb-4">
        <PageHeading
          title="AI Chat"
          subtitle="Chat with Shivaay about Uttarakhand tourism"
          icon={<FiMessageSquare />}
        />
      </div>

      {/* Chat Interface */}
      <motion.div
        className="flex-1 min-h-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="h-full bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
          <ChatInterface />
        </div>
      </motion.div>
    </main>
  );
}
