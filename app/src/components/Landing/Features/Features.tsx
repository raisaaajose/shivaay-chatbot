"use client";

import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
  featureVariants,
} from "../animations";

const features = [
  {
    icon: "💬",
    title: "Conversational AI",
    description:
      "Natural language interactions powered by Groq LLM and LangChain",
    color: "text-blue-400",
    bgGradient: "from-blue-500/10 to-indigo-500/10",
    borderColor: "border-blue-500/20",
    iconBg: "bg-blue-500/20",
  },
  {
    icon: "🌍",
    title: "Multilingual Support",
    description: "Communicate in multiple languages for global accessibility",
    color: "text-emerald-400",
    bgGradient: "from-emerald-500/10 to-green-500/10",
    borderColor: "border-emerald-500/20",
    iconBg: "bg-emerald-500/20",
  },
  {
    icon: "🔍",
    title: "Vector Search",
    description: "Pinecone-powered semantic search with BAAI/bge-m3 embeddings",
    color: "text-purple-400",
    bgGradient: "from-purple-500/10 to-violet-500/10",
    borderColor: "border-purple-500/20",
    iconBg: "bg-purple-500/20",
  },
  {
    icon: "🧠",
    title: "LangGraph Orchestration",
    description: "Advanced workflow management for complex AI interactions",
    color: "text-orange-400",
    bgGradient: "from-orange-500/10 to-red-500/10",
    borderColor: "border-orange-500/20",
    iconBg: "bg-orange-500/20",
  },
  {
    icon: "👥",
    title: "User Management",
    description: "Complete authentication system with Google & GitHub OAuth",
    color: "text-cyan-400",
    bgGradient: "from-cyan-500/10 to-teal-500/10",
    borderColor: "border-cyan-500/20",
    iconBg: "bg-cyan-500/20",
  },
  {
    icon: "💾",
    title: "Session Persistence",
    description: "Conversation history and context maintained across sessions",
    color: "text-rose-400",
    bgGradient: "from-rose-500/10 to-pink-500/10",
    borderColor: "border-rose-500/20",
    iconBg: "bg-rose-500/20",
  },
];

export default function Features() {
  return (
    <div className="relative w-full py-24 text-white">
      <div className="w-full max-w-none px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="absolute inset-0" />
        <motion.div
          className="max-w-7xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-20" variants={itemVariants}>
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Key Features & Capabilities
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive AI solution showcasing modern technology stack and
              advanced features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`group relative p-8 rounded-2xl bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm border ${feature.borderColor} hover:border-opacity-60 transition-all duration-500 overflow-hidden`}
                variants={featureVariants}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon container */}
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 ${feature.iconBg} rounded-xl mb-6 relative z-10`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={`text-3xl ${feature.color}`}>
                    {feature.icon}
                  </span>
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-opacity-90 transition-all duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
