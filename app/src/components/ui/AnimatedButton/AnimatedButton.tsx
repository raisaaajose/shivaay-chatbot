"use client";

import { motion } from "framer-motion";
import React, { ReactNode, MouseEventHandler } from "react";

interface AnimatedButtonProps {
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  title?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "danger" | "secondary" | "success" | "warning";
}

const AnimatedButton = ({
  children,
  onClick,
  icon = "",
  className = "",
  disabled = false,
  title,
  type = "button",
  variant = "primary",
}: AnimatedButtonProps) => {
  let variantClass = "";
  let initialBgColor = "";
  switch (variant) {
    case "danger":
      variantClass = "bg-red-600 hover:bg-red-700 text-white";
      initialBgColor = "#dc2626";
      break;
    case "secondary":
      variantClass = "bg-gray-700 hover:bg-gray-800 text-white";
      initialBgColor = "#374151";
      break;
    case "success":
      variantClass = "bg-green-600 hover:bg-green-700 text-white";
      initialBgColor = "#16a34a";
      break;
    case "warning":
      variantClass = "bg-yellow-500 hover:bg-yellow-600 text-black";
      initialBgColor = "#eab308";
      break;
    default:
      variantClass =
        "bg-blue-600 hover:bg-blue-700 text-white border border-blue-500";
      initialBgColor = "#2563eb";
  }
  return (
    <motion.button
      style={{ backgroundColor: initialBgColor }}
      whileHover={
        disabled
          ? {}
          : {
              scale: 1.02,
              boxShadow: "0 8px 32px rgba(37,99,235,0.3)",
              backgroundColor:
                variant === "danger"
                  ? "#dc2626"
                  : variant === "success"
                  ? "#16a34a"
                  : variant === "warning"
                  ? "#eab308"
                  : variant === "secondary"
                  ? "#374151"
                  : "#1d4ed8",
            }
      }
      whileTap={
        disabled
          ? {}
          : {
              scale: 0.97,
              backgroundColor:
                variant === "danger"
                  ? "#b91c1c"
                  : variant === "success"
                  ? "#15803d"
                  : variant === "warning"
                  ? "#ca8a04"
                  : variant === "secondary"
                  ? "#1f2937"
                  : "#1e40af",
            }
      }
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`flex flex-row justify-center items-center ${
        children
          ? "gap-2 sm:gap-[10px] px-4 sm:px-6"
          : "aspect-square w-[44px] h-[44px] p-0 px-0"
      } mx-0 my-0 py-3 sm:py-3 max-w-full rounded-xl font-inter font-semibold text-[15px] sm:text-[16px] leading-[19px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all duration-200 ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${variantClass} ${className}`}
      onClick={disabled ? undefined : onClick}
      tabIndex={0}
      disabled={disabled}
      title={title}
      type={type}
    >
      {/* Only render the text span if children exist */}
      {children && (
        <span
          className="flex items-center justify-center h-[19px] truncate text-center w-full"
          style={{ order: icon ? 0 : 1, flex: icon ? "1 1 0%" : "1 1 0%" }}
        >
          {children}
        </span>
      )}
      {/* Only render the icon span if icon exists */}
      {icon && (
        <span
          className={`flex items-center justify-center h-6 w-6 text-center flex-shrink-0 ${
            !children ? "w-full h-full" : ""
          }`}
          style={{
            order: children ? 2 : 0,
            flex: children ? "none" : "1 1 0%",
            flexGrow: children ? 0 : 1,
          }}
        >
          {icon}
        </span>
      )}
    </motion.button>
  );
};

export default AnimatedButton;
