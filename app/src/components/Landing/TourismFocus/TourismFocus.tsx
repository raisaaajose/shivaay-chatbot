"use client";

import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
  featureVariants,
} from "../animations";

const tourismAspects = [
  {
    icon: "🗺️",
    title: "Travel Assistant",
    description:
      "Personalized recommendations for destinations, activities, and travel planning",
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    icon: "🏛️",
    title: "Cultural Expert",
    description:
      "Deep knowledge of local traditions, festivals, and historical significance",
    gradient: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/30",
    iconColor: "text-orange-400",
  },
  {
    icon: "🧘",
    title: "Wellness Guide",
    description:
      "Spiritual experiences, yoga retreats, and wellness destinations",
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
    iconColor: "text-purple-400",
  },
];

export default function TourismFocus() {
  return (
    <div className="relative w-full py-24">
      <div className="w-full max-w-none px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-20" variants={itemVariants}>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Uttarakhand Tourism Expertise
            </h2>
            <motion.div
              className="w-28 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto mb-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 112 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Specialized knowledge base covering the cultural heritage and
              natural beauty of Uttarakhand
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {tourismAspects.map((item, index) => (
              <motion.div
                key={index}
                className={`group relative text-center p-8 rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-sm border ${item.border} hover:border-opacity-70 transition-all duration-500 overflow-hidden`}
                variants={featureVariants}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.div
                  className={`inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 text-5xl ${item.iconColor} relative z-10`}
                  animate={{
                    rotate: [0, 2, -2, 0],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatDelay: 4,
                    delay: index * 0.3,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {item.icon}
                </motion.div>

                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-opacity-90 transition-all duration-300 relative z-10">
                  {item.title}
                </h3>

                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 relative z-10">
                  {item.description}
                </p>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12 group-hover:scale-125 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-8 -translate-x-8 group-hover:scale-110 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
