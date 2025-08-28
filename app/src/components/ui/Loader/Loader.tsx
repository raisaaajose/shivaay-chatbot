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
        <Loader2 className={cn("animate-spin text-blue-500", sizeMap[size])} />
        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-slate-400"
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
            "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
            className
          )}
        >
          <div className="rounded-lg bg-slate-900 p-6 shadow-xl border border-slate-700">
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
          "flex items-center justify-center min-h-screen bg-slate-950",
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
