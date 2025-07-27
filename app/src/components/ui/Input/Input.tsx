import React, { InputHTMLAttributes, forwardRef } from "react";
import { motion, Easing } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  icon?: React.ReactNode;
  helperText?: string;
  animationDuration?: number;
  animationEasing?: Easing;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className = "",
      icon,
      type = "text",
      helperText,
      disabled = false,
      animationDuration = 0.5,
      animationEasing = "easeInOut",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: animationDuration, ease: animationEasing }}
        className={`m-2 sm:m-3 w-full max-w-full ${className}`}
        style={{ maxWidth: "-webkit-fill-available" }}
      >
        {label && (
          <label className="block mb-1 text-sm font-medium text-[var(--foreground)]">
            {label}
          </label>
        )}
        <div
          className={`flex flex-row justify-between items-center px-4 py-0 h-[52px] sm:h-[56px] w-full bg-gray-900 border-2 ${
            error
              ? "border-red-500"
              : "border-gray-700 focus-within:border-blue-500"
          } rounded-xl box-border transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500/20 hover:border-gray-600 ${
            disabled ? "opacity-60 pointer-events-none grayscale" : ""
          }`}
          style={{ maxWidth: "-webkit-fill-available" }}
        >
          {icon && (
            <span className="text-gray-400 mr-3 flex-none order-0 w-5 h-5">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`flex-1 order-1 bg-transparent outline-none text-white placeholder-gray-400 text-[15px] sm:text-[16px] leading-[19px] font-medium font-inter px-0 py-0 border-none ring-0 focus:ring-0 focus:outline-none ${
              isPassword ? "pr-10" : ""
            }`}
            style={{ border: "none", boxShadow: "none", minWidth: 0 }}
            type={isPassword && showPassword ? "text" : type}
            disabled={disabled}
            aria-label={label}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
              className="ml-2 pr-1 flex items-center justify-center text-gray-400 hover:text-gray-300 focus:outline-none order-2 bg-transparent border-none p-0 cursor-pointer w-8 transition-colors duration-200"
              tabIndex={0}
              style={{ minWidth: 32 }}
              disabled={disabled}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          )}
        </div>
        {helperText && !error && (
          <p className="text-xs mt-2 text-gray-400">{helperText}</p>
        )}
        {error && (
          <p className="text-red-400 text-sm mt-2 font-medium">{error}</p>
        )}
      </motion.div>
    );
  }
);
Input.displayName = "Input";

export default Input;
