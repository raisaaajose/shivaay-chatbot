"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Loader2 } from "lucide-react";

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "overlay" | "inline";
  text?: string;
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, size = "md", variant = "default", text }, ref) => {
    const loaderContent = (
      <div className="flex flex-col items-center gap-3">
        <Loader2
          className={cn("animate-spin text-purple-400", sizeMap[size])}
        />
        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-white/70"
          >
            {text}
          </motion.p>
        )}
      </div>
    );

    if (variant === "overlay") {
      return (
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md",
            className
          )}
        >
          <div className="rounded-lg bg-white/10 backdrop-blur-xl p-6 shadow-xl border border-white/20 shadow-purple-500/20">
            {loaderContent}
          </div>
        </motion.div>
      );
    }

    if (variant === "inline") {
      return (
        <div
          ref={ref}
          className={cn("flex items-center justify-center", className)}
        >
          {loaderContent}
        </div>
      );
    }

    // Default variant - full screen
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          "flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900",
          className
        )}
      >
        {loaderContent}
      </motion.div>
    );
  }
);

Loader.displayName = "Loader";

export default Loader;
