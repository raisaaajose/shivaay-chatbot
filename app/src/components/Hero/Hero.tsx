"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function Hero() {
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

  const techStack = [
    {
      name: "FastAPI",
      icon: "⚡",
      description: "AI Backend",
      color: "text-green-400",
    },
    {
      name: "Next.js",
      icon: "▲",
      description: "Frontend",
      color: "text-white",
    },
    {
      name: "TypeScript",
      icon: "TS",
      description: "Type Safety",
      color: "text-blue-400",
    },
    {
      name: "Python",
      icon: "🐍",
      description: "AI Processing",
      color: "text-yellow-400",
    },
    {
      name: "LangChain",
      icon: "🔗",
      description: "AI Framework",
      color: "text-purple-400",
    },
    {
      name: "Pinecone",
      icon: "📌",
      description: "Vector DB",
      color: "text-cyan-400",
    },
  ];

  const features = [
    {
      icon: "💬",
      title: "Conversational AI",
      description:
        "Natural language interactions powered by Groq LLM and LangChain",
      color: "text-blue-400",
    },
    {
      icon: "🌍",
      title: "Multilingual Support",
      description: "Communicate in multiple languages for global accessibility",
      color: "text-green-400",
    },
    {
      icon: "🔍",
      title: "Vector Search",
      description:
        "Pinecone-powered semantic search with BAAI/bge-m3 embeddings",
      color: "text-purple-400",
    },
    {
      icon: "🧠",
      title: "LangGraph Orchestration",
      description: "Advanced workflow management for complex AI interactions",
      color: "text-orange-400",
    },
    {
      icon: "👥",
      title: "User Management",
      description: "Complete authentication system with Google & GitHub OAuth",
      color: "text-cyan-400",
    },
    {
      icon: "💾",
      title: "Session Persistence",
      description:
        "Conversation history and context maintained across sessions",
      color: "text-red-400",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Main Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen w-full px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 text-white">
        <motion.div
          className="max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-6xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hackathon Badge */}
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-full text-sm font-medium"
            variants={itemVariants}
          >
            <span className="animate-pulse mr-2">🏆</span>
            Hackathon Project - AI Tourism Assistant
          </motion.div>

          {/* Hero Title */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3,
              }}
            >
              Shivaay
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-light"
              variants={itemVariants}
            >
              AI-Powered Tourism Assistant for Uttarakhand
            </motion.p>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              A sophisticated conversational AI built with FastAPI, LangChain,
              LangGraph, and Groq LLM, featuring vector search capabilities and
              multilingual support
            </motion.p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/chat"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Try Live Demo
                <motion.svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/auth/login"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-purple-500 rounded-full hover:bg-purple-500/10 transform transition-all duration-200"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Key Features & Capabilities
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive AI solution showcasing modern technology stack and
              advanced features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
                variants={featureVariants}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className={`text-4xl mb-4 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-white/5">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Technology Stack
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Built with cutting-edge technologies for optimal performance
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                variants={featureVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`text-3xl mb-3 ${tech.color}`}>{tech.icon}</div>
                <h3 className="font-semibold text-white text-sm">
                  {tech.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Tourism Focus Section */}
      <section className="py-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Uttarakhand Tourism Expertise
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Specialized knowledge base covering the cultural heritage and
              natural beauty of Uttarakhand
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <motion.div
              className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
              variants={featureVariants}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <motion.div
                className="text-4xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                🗺️
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                Travel Assistant
              </h3>
              <p className="text-gray-400 text-sm">
                Personalized recommendations for destinations, activities, and
                travel planning
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
              variants={featureVariants}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <motion.div
                className="text-4xl mb-4"
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
              <h3 className="text-lg font-semibold mb-2 text-white">
                Cultural Expert
              </h3>
              <p className="text-gray-400 text-sm">
                Deep knowledge of local traditions, festivals, and historical
                significance
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
              variants={featureVariants}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <motion.div
                className="text-4xl mb-4"
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
              <h3 className="text-lg font-semibold mb-2 text-white">
                Wellness Guide
              </h3>
              <p className="text-gray-400 text-sm">
                Spiritual experiences, yoga retreats, and wellness destinations
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Architecture Overview */}
      <section className="py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-white/5">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              System Architecture
            </h2>
            <p className="text-xl text-gray-400">
              Multi-backend architecture with specialized AI and web services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="p-8 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20"
              variants={featureVariants}
            >
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3 text-green-400">⚡</span>
                AI Backend (Python)
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• FastAPI with Uvicorn server</li>
                <li>• LangChain Core & LangGraph orchestration</li>
                <li>• Groq LLM integration</li>
                <li>• Pinecone vector database</li>
                <li>• BAAI/bge-m3 embeddings</li>
                <li>• Session persistence</li>
              </ul>
            </motion.div>

            <motion.div
              className="p-8 rounded-xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20"
              variants={featureVariants}
            >
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3 text-white">▲</span>
                Web Backend (Node.js)
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Express.js framework</li>
                <li>• TypeScript for type safety</li>
                <li>• OAuth authentication (Google, GitHub)</li>
                <li>• MongoDB user management</li>
                <li>• JWT token system</li>
                <li>• Admin dashboard</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Demo Stats */}
      <section className="py-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Project Highlights
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              className="text-center p-6 rounded-xl bg-white/5 border border-white/10"
              variants={featureVariants}
            >
              <div className="text-3xl font-bold text-blue-400 mb-2">2</div>
              <div className="text-white font-semibold">Backend Services</div>
              <div className="text-gray-400 text-sm">AI + Web</div>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-xl bg-white/5 border border-white/10"
              variants={featureVariants}
            >
              <div className="text-3xl font-bold text-green-400 mb-2">6+</div>
              <div className="text-white font-semibold">AI Technologies</div>
              <div className="text-gray-400 text-sm">LangChain, Groq, etc.</div>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-xl bg-white/5 border border-white/10"
              variants={featureVariants}
            >
              <div className="text-3xl font-bold text-purple-400 mb-2">
                Multi
              </div>
              <div className="text-white font-semibold">Language Support</div>
              <div className="text-gray-400 text-sm">Global Access</div>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-xl bg-white/5 border border-white/10"
              variants={featureVariants}
            >
              <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
              <div className="text-white font-semibold">AI Assistant</div>
              <div className="text-gray-400 text-sm">Always Available</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Experience the Future of Tourism
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 mb-8"
            variants={itemVariants}
          >
            Try our AI-powered tourism assistant and explore the possibilities
            of conversational AI
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Link
              href="/chat"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transform transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Chatting Now
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-purple-500 rounded-full hover:bg-purple-500/10 transform transition-all duration-200"
            >
              Create Account
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
