"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../animations";

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-white">
      <div className="w-full max-w-none px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <motion.div
          className="max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-6xl mx-auto text-center space-y-8 sm:space-y-10 md:space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hackathon Badge */}
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-md border border-purple-500/40 rounded-full text-sm font-medium shadow-2xl"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="mr-3 text-lg"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              🏆
            </motion.span>
            <span className="bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent font-semibold">
              Hackathon Project - AI Tourism Assistant
            </span>
          </motion.div>

          {/* Hero Title */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight tracking-tight"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              }}
              style={{
                textShadow: "0 0 60px rgba(168, 85, 247, 0.3)",
              }}
            >
              Shivaay
            </motion.h1>
            <motion.div className="relative" variants={itemVariants}>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-200 font-light mb-4">
                AI-Powered Tourism Assistant for Uttarakhand
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
            </motion.div>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              A sophisticated conversational AI built with{" "}
              <span className="text-emerald-400 font-semibold">FastAPI</span>,{" "}
              <span className="text-purple-400 font-semibold">LangChain</span>,{" "}
              <span className="text-blue-400 font-semibold">LangGraph</span>,
              and <span className="text-cyan-400 font-semibold">Groq LLM</span>,
              featuring vector search capabilities and multilingual support
            </motion.p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
              <Link
                href="/chat"
                className="relative inline-flex items-center px-10 py-5 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl transition-all duration-300 hover:shadow-purple-500/25"
              >
                <span className="mr-3 text-xl">🚀</span>
                Try Live Demo
                <motion.svg
                  className="ml-3 w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/auth/"
                className="inline-flex items-center px-10 py-5 text-lg font-semibold text-white border-2 border-purple-500/50 backdrop-blur-sm rounded-full hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300 shadow-xl"
              >
                <span className="mr-3">✨</span>
                Get Started
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
            variants={itemVariants}
          >
            {[
              { number: "2", label: "Backend Services", sublabel: "AI + Web" },
              {
                number: "6+",
                label: "AI Technologies",
                sublabel: "LangChain, Groq",
              },
              {
                number: "Multi",
                label: "Language Support",
                sublabel: "Global Access",
              },
              {
                number: "24/7",
                label: "AI Assistant",
                sublabel: "Always Available",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {stat.number}
                </div>
                <div className="text-white font-medium text-sm">
                  {stat.label}
                </div>
                <div className="text-gray-400 text-xs">{stat.sublabel}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
