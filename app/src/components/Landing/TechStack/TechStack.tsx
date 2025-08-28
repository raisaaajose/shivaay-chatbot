"use client";

import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
  featureVariants,
} from "../animations";

const techStack = [
  {
    name: "FastAPI",
    icon: "⚡",
    description: "AI Backend",
    color: "text-emerald-400",
    bgGradient: "from-emerald-500/20 to-green-500/20",
    borderColor: "border-emerald-500/30",
  },
  {
    name: "Next.js",
    icon: "▲",
    description: "Frontend",
    color: "text-white",
    bgGradient: "from-gray-500/20 to-white/20",
    borderColor: "border-white/30",
  },
  {
    name: "TypeScript",
    icon: "TS",
    description: "Type Safety",
    color: "text-blue-400",
    bgGradient: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    name: "Python",
    icon: "🐍",
    description: "AI Processing",
    color: "text-yellow-400",
    bgGradient: "from-yellow-500/20 to-amber-500/20",
    borderColor: "border-yellow-500/30",
  },
  {
    name: "LangChain",
    icon: "🔗",
    description: "AI Framework",
    color: "text-purple-400",
    bgGradient: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
  },
  {
    name: "Pinecone",
    icon: "📌",
    description: "Vector DB",
    color: "text-cyan-400",
    bgGradient: "from-cyan-500/20 to-teal-500/20",
    borderColor: "border-cyan-500/30",
  },
];

export default function TechStack() {
  return (
    <div className="relative w-full py-24 overflow-hidden">
      <div className="w-full max-w-none px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl" />
        </div>

        <motion.div
          className="max-w-6xl mx-auto text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Technology Stack
            </h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            <p className="text-xl text-gray-300 mb-16 leading-relaxed">
              Built with cutting-edge technologies for optimal performance and
              scalability
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                className={`group relative flex flex-col items-center p-6 rounded-xl bg-gradient-to-br ${tech.bgGradient} backdrop-blur-sm border ${tech.borderColor} hover:border-opacity-80 transition-all duration-500 overflow-hidden`}
                variants={featureVariants}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  rotateY: 10,
                  transition: { duration: 0.3 },
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.div
                  className={`text-4xl mb-4 ${tech.color} relative z-10`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {tech.icon}
                </motion.div>

                <h3 className="font-bold text-white text-base mb-2 group-hover:text-opacity-90 transition-all duration-300 relative z-10">
                  {tech.name}
                </h3>

                <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300 relative z-10">
                  {tech.description}
                </p>

                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-4 translate-x-4 group-hover:scale-150 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
