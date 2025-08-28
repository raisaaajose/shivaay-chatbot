"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";

export interface LoadingSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
  lines?: number;
  animated?: boolean;
}

const LoadingSkeleton = forwardRef<HTMLDivElement, LoadingSkeletonProps>(
  (
    { className, variant = "text", width, height, lines = 1, animated = true },
    ref
  ) => {
    const baseClasses =
      "bg-slate-700 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700";

    const variantClasses = {
      text: "h-4 rounded",
      circular: "rounded-full aspect-square",
      rectangular: "rounded-none",
      rounded: "rounded-lg",
    };

    const skeletonElement = (index?: number) => (
      <motion.div
        key={index}
        ref={index === 0 ? ref : undefined}
        className={cn(
          baseClasses,
          variantClasses[variant],
          {
            "animate-pulse": !animated,
          },
          className
        )}
        style={{
          width: width || (variant === "text" ? "100%" : undefined),
          height: height || (variant === "circular" ? width : undefined),
          ...(animated && {
            backgroundSize: "200% 100%",
          }),
        }}
        {...(animated && {
          animate: {
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          },
        })}
      />
    );

    if (variant === "text" && lines > 1) {
      return (
        <div className="space-y-2">
          {Array.from({ length: lines }, (_, index) => (
            <div
              key={index}
              className={index === lines - 1 ? "w-3/4" : "w-full"}
            >
              {skeletonElement(index)}
            </div>
          ))}
        </div>
      );
    }

    return skeletonElement();
  }
);

LoadingSkeleton.displayName = "LoadingSkeleton";

export default LoadingSkeleton;
