"use client";

import React from "react";
import { motion } from "framer-motion";
import ChatInterface from "@/components/Chat/ChatInterface/ChatInterface";
import PageHeading from "@/components/ui/PageHeading/PageHeading";
import { FiMessageSquare } from "react-icons/fi";
import { useParams } from "next/navigation";

export default function ChatSessionPage() {
  const params = useParams();
  const sessionId = params?.sessionId as string;

  return (
    <main className="h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <PageHeading
          title="Chat Session"
          subtitle="Continue your conversation with Shivaay"
          icon={<FiMessageSquare />}
          className="flex-1"
        />
      </div>

      <motion.div
        className="flex-1 min-h-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="h-full bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
          <ChatInterface sessionId={sessionId} />
        </div>
      </motion.div>
    </main>
  );
}
