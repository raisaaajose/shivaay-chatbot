import { motion } from "framer-motion";

const tabVariants = {
  active: {
    borderBottomWidth: 3,
    borderColor: "#3b82f6",
    color: "#3b82f6",
  },
  inactive: {
    borderBottomWidth: 0,
    borderColor: "transparent",
    color: "#9ca3af",
  },
};

type AuthTabsProps = {
  isLogin: boolean;
  setIsLogin: (val: boolean) => void;
};

export default function AuthTabs({ isLogin, setIsLogin }: AuthTabsProps) {
  return (
    <div className="flex justify-center mb-10 gap-8 sm:gap-16 border-b border-gray-800">
      <motion.button
        type="button"
        onClick={() => setIsLogin(true)}
        className="text-xl sm:text-2xl font-bold pb-4 px-4 sm:px-8 transition-colors duration-300 hover:text-blue-400"
        animate={isLogin ? "active" : "inactive"}
        variants={tabVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        Login
      </motion.button>
      <motion.button
        type="button"
        onClick={() => setIsLogin(false)}
        className="text-xl sm:text-2xl font-bold pb-4 px-4 sm:px-8 transition-colors duration-300 hover:text-blue-400"
        animate={!isLogin ? "active" : "inactive"}
        variants={tabVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        Sign Up
      </motion.button>
    </div>
  );
}
