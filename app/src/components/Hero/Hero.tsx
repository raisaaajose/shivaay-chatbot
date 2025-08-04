"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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

  const featureVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full px-6 py-20 text-white">
      <motion.div
        className="max-w-4xl mx-auto text-center space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Title */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.5,
            }}
          >
            Shivaay
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 font-light"
            variants={itemVariants}
          >
            Your Multilingual AI Guide to Uttarakhand
          </motion.p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          className="max-w-3xl mx-auto space-y-6"
          variants={itemVariants}
        >
          <motion.p
            className="text-lg md:text-xl text-gray-200 leading-relaxed"
            variants={itemVariants}
          >
            Discover the rich cultural heritage, spiritual significance, and
            natural beauty of Uttarakhand with your personal AI travel
            assistant. Shivaay bridges the information gap for tourists,
            providing seamless, interactive guidance in multiple languages.
          </motion.p>

          <motion.div
            className="grid md:grid-cols-3 gap-6 mt-12"
            variants={containerVariants}
          >
            <motion.div
              className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm"
              variants={featureVariants}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                className="text-3xl mb-3"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                🗺️
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">Travel Assistant</h3>
              <p className="text-gray-300 text-sm">
                Get personalized recommendations and travel tips
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm"
              variants={featureVariants}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                className="text-3xl mb-3"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  delay: 0.5,
                }}
              >
                🏛️
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">Cultural Expert</h3>
              <p className="text-gray-300 text-sm">
                Learn about local traditions and heritage
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm"
              variants={featureVariants}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                className="text-3xl mb-3"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  delay: 1,
                }}
              >
                🧘
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">Wellness Guide</h3>
              <p className="text-gray-300 text-sm">
                Find spiritual and wellness experiences
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Get Started Button */}
        <motion.div className="pt-8" variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <Link
              href="/chat"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transform transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started
              <motion.svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
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
        </motion.div>
      </motion.div>
    </section>
  );
}
