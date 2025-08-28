"use client";

import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
  featureVariants,
} from "../animations";

export default function Architecture() {
  return (
    <div className="relative w-full py-24  overflow-hidden">
      <div className="w-full max-w-none px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/6 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/3 right-1/6 w-72 h-72 bg-green-500/10 rounded-full filter blur-3xl" />
        </div>

        <motion.div
          className="max-w-6xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-20" variants={itemVariants}>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              System Architecture
            </h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <p className="text-xl text-gray-300 leading-relaxed">
              Multi-backend architecture with specialized AI and web services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              className="group relative p-10 rounded-3xl bg-gradient-to-br from-emerald-500/15 to-green-500/15 backdrop-blur-sm border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-500 overflow-hidden"
              variants={featureVariants}
              whileHover={{
                scale: 1.02,
                y: -5,
                rotateY: 3,
                transition: { duration: 0.3 },
              }}
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:40px_40px] animate-subtle-pulse" />
              </div>

              <motion.div
                className="flex items-center mb-6"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.span
                  className="mr-4 text-4xl text-emerald-400"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  ⚡
                </motion.span>
                <h3 className="text-3xl font-bold text-white">
                  AI Backend (Python)
                </h3>
              </motion.div>

              <motion.ul
                className="space-y-3 text-gray-200 relative z-10"
                variants={containerVariants}
              >
                {[
                  "FastAPI with Uvicorn server",
                  "LangChain Core & LangGraph orchestration",
                  "Groq LLM integration",
                  "Pinecone vector database",
                  "BAAI/bge-m3 embeddings",
                  "Session persistence",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center group-hover:text-white transition-colors duration-300"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <span className="mr-3 text-emerald-400">▸</span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-emerald-500/20 to-transparent rounded-full translate-x-16 translate-y-16 group-hover:scale-150 transition-transform duration-700" />
            </motion.div>

            <motion.div
              className="group relative p-10 rounded-3xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 backdrop-blur-sm border border-blue-500/30 hover:border-blue-400/50 transition-all duration-500 overflow-hidden"
              variants={featureVariants}
              whileHover={{
                scale: 1.02,
                y: -5,
                rotateY: -3,
                transition: { duration: 0.3 },
              }}
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(-45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:40px_40px] animate-subtle-pulse" />
              </div>

              <motion.div
                className="flex items-center mb-6"
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.span
                  className="mr-4 text-4xl text-white"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                >
                  ▲
                </motion.span>
                <h3 className="text-3xl font-bold text-white">
                  Web Backend (Node.js)
                </h3>
              </motion.div>

              <motion.ul
                className="space-y-3 text-gray-200 relative z-10"
                variants={containerVariants}
              >
                {[
                  "Express.js framework",
                  "TypeScript for type safety",
                  "OAuth authentication (Google, GitHub)",
                  "MongoDB user management",
                  "JWT token system",
                  "Admin dashboard",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center group-hover:text-white transition-colors duration-300"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <span className="mr-3 text-blue-400">▸</span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full translate-x-16 translate-y-16 group-hover:scale-150 transition-transform duration-700" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
