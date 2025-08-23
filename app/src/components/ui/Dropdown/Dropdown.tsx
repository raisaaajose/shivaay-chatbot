"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "amber" | "blue" | "red";
  disabled?: boolean;
}

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  items: DropdownItem[];
  trigger: React.ReactNode;
  className?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  width?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  items,
  trigger,
  className = "",
  position = "bottom-right",
  width = "min-w-[10rem] max-w-[16rem] w-auto",
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case "bottom-right":
        return "top-10 right-0";
      case "bottom-left":
        return "top-10 left-0";
      case "top-right":
        return "bottom-10 right-0";
      case "top-left":
        return "bottom-10 left-0";
      default:
        return "top-10 right-0";
    }
  };

  const getTransformOrigin = () => {
    switch (position) {
      case "bottom-right":
        return "top right";
      case "bottom-left":
        return "top left";
      case "top-right":
        return "bottom right";
      case "top-left":
        return "bottom left";
      default:
        return "top right";
    }
  };

  const getVariantClasses = (variant?: string) => {
    switch (variant) {
      case "amber":
        return "text-amber-400";
      case "blue":
        return "text-blue-400";
      case "red":
        return "text-red-400";
      default:
        return "text-gray-200";
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div onClick={onClose} className="inline-flex">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: position.startsWith("top") ? 10 : -10,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: position.startsWith("top") ? 10 : -10,
            }}
            transition={{ duration: 0.18 }}
            className={`absolute ${getPositionClasses()} z-50 ${width} bg-gray-800 border border-gray-700 rounded-xl shadow-lg py-1`}
            style={{ transformOrigin: getTransformOrigin() }}
            onClick={(e) => e.stopPropagation()}
          >
            {items.map((item) => (
              <React.Fragment key={item.id}>
                {item.id === "divider" ? (
                  <div className="border-t border-gray-700 my-1" />
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!item.disabled) {
                        item.onClick();
                        onClose();
                      }
                    }}
                    disabled={item.disabled}
                    className={`flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-700/70 transition-colors rounded-md ${getVariantClasses(
                      item.variant
                    )} ${
                      item.disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    style={{ width: "calc(100% - 0.5rem)", margin: "0 auto" }}
                  >
                    {item.icon && (
                      <span className="flex-shrink-0 w-4 h-4">{item.icon}</span>
                    )}

                    <span className="flex-1 truncate">{item.label}</span>
                  </button>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
