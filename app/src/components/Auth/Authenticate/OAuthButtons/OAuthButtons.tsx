import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

type OAuthButtonsProps = {
  googleLogin: () => void;
  oauthLoading: boolean;
};

export default function OAuthButtons({
  googleLogin,
  oauthLoading,
}: OAuthButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
      <motion.button
        onClick={googleLogin}
        aria-label="Continue with Google"
        disabled={oauthLoading}
        className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl text-white text-base font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <FcGoogle className="w-5 h-5" />
        <span className="hidden sm:inline">Google</span>
      </motion.button>
    </div>
  );
}
