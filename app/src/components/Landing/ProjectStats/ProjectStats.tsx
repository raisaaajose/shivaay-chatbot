"use client";

import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
  featureVariants,
} from "../animations";

const projectStats = [
  {
    number: "2",
    label: "Backend Services",
    sublabel: "AI + Web",
    color: "text-blue-400",
    bgGradient: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    number: "6+",
    label: "AI Technologies",
    sublabel: "LangChain, Groq",
    color: "text-emerald-400",
    bgGradient: "from-emerald-500/20 to-green-500/20",
    borderColor: "border-emerald-500/30",
  },
  {
    number: "Multi",
    label: "Language Support",
    sublabel: "Global Access",
    color: "text-purple-400",
    bgGradient: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
  },
  {
    number: "24/7",
    label: "AI Assistant",
    sublabel: "Always Available",
    color: "text-cyan-400",
    bgGradient: "from-cyan-500/20 to-teal-500/20",
    borderColor: "border-cyan-500/30",
  },
];

export default function ProjectStats() {
  return (
    <div className="relative w-full py-24">
      <div className="w-full max-w-none px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Project Highlights
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-pink-500 to-orange-500 mx-auto mb-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {projectStats.map((stat, index) => (
              <motion.div
                key={index}
                className={`group relative text-center p-8 rounded-2xl bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm border ${stat.borderColor} hover:border-opacity-70 transition-all duration-500 overflow-hidden`}
                variants={featureVariants}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.div
                  className={`text-4xl font-bold ${stat.color} mb-3 relative z-10`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: index * 0.1 + 0.5,
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.div>

                <div className="text-white font-semibold text-lg mb-2 group-hover:text-opacity-90 transition-all duration-300 relative z-10">
                  {stat.label}
                </div>

                <div className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300 relative z-10">
                  {stat.sublabel}
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-6 translate-x-6 group-hover:scale-150 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
