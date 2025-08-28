"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../animations";

export default function FinalCTA() {
  return (
    <div className="relative w-full py-32 overflow-hidden">
      <div className="w-full max-w-none px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Dramatic background */}
        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 leading-tight"
            variants={itemVariants}
            whileInView={{
              backgroundImage: [
                "linear-gradient(45deg, #ffffff, #ffffff)",
                "linear-gradient(45deg, #8b5cf6, #06b6d4, #f59e0b, #8b5cf6)",
                "linear-gradient(45deg, #ffffff, #ffffff)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Experience the Future of Tourism
          </motion.h2>

          <motion.div
            className="w-40 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 mx-auto mb-10 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 160 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          <motion.p
            className="text-2xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Try our AI-powered tourism assistant and explore the possibilities
            of conversational AI
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
              <Link
                href="/chat"
                className="relative inline-flex items-center px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-full shadow-2xl transition-all duration-300 hover:shadow-purple-500/25"
              >
                <motion.span
                  className="mr-4 text-2xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🚀
                </motion.span>
                Start Chatting Now
                <motion.span
                  className="ml-4 text-2xl"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/auth/login"
                className="inline-flex items-center px-12 py-6 text-xl font-bold text-white border-3 border-gradient-to-r from-purple-500 to-cyan-500 border-purple-500/60 backdrop-blur-sm rounded-full hover:bg-purple-500/20 hover:border-purple-400/80 transition-all duration-300 shadow-xl"
              >
                <span className="mr-4 text-2xl">✨</span>
                Create Account
              </Link>
            </motion.div>
          </motion.div>

          {/* Additional call to action elements */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            variants={containerVariants}
          >
            {[
              {
                icon: "🎯",
                text: "Instant Setup",
                subtext: "No installation required",
              },
              {
                icon: "🔒",
                text: "Secure & Private",
                subtext: "Your data stays protected",
              },
              {
                icon: "🌟",
                text: "Premium Experience",
                subtext: "Enterprise-grade AI",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-white font-semibold mb-1">{item.text}</div>
                <div className="text-gray-400 text-sm">{item.subtext}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
