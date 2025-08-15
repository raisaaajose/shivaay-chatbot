import { AnimatePresence, motion } from "framer-motion";
import { Input, AnimatedButton, Loader } from "../../../ui";
import { FaEnvelope, FaLock, FaUser, FaUserCircle } from "react-icons/fa";

type AuthFormProps = {
  isLogin: boolean;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  username: string;
  setUsername: (val: string) => void;
  loading: boolean;
  handleSubmit: () => void;
};

export default function AuthForm({
  isLogin,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  username,
  setUsername,
  loading,
  handleSubmit,
}: AuthFormProps) {
  return (
    <motion.div layout transition={{ duration: 0.4, type: "spring" }}>
      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex flex-col gap-6">
              <Input
                icon={<FaEnvelope className="text-gray-400" />}
                placeholder="Enter your email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full"
              />
              <Input
                icon={<FaLock className="text-gray-400" />}
                placeholder="Enter your password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex flex-col gap-6">
              <Input
                icon={<FaUserCircle className="text-gray-400" />}
                placeholder="Enter your full name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="w-full"
              />
              <Input
                icon={<FaUser className="text-gray-400" />}
                placeholder="Choose a username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full"
              />
              <Input
                icon={<FaEnvelope className="text-gray-400" />}
                placeholder="Enter your email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full"
              />
              <Input
                icon={<FaLock className="text-gray-400" />}
                placeholder="Create a password (min 6 characters)"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex justify-center mt-8">
        <AnimatedButton
          onClick={handleSubmit}
          disabled={loading}
          type="button"
          className="w-full sm:w-64 h-12 text-lg font-semibold"
          variant="primary"
        >
          {loading ? <Loader /> : isLogin ? "Sign In" : "Create Account"}
        </AnimatedButton>
      </div>
    </motion.div>
  );
}
