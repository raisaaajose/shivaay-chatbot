"use client";

import { motion } from "framer-motion";
import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../../lib/utils";
import { buttonVariants, type ButtonVariants } from "../../../lib/variants";
import { buttonHoverVariants, shimmerVariants } from "../../../lib/animations";
import { Loader } from "lucide-react";

export interface ButtonProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      | "onAnimationStart"
      | "onAnimationEnd"
      | "onAnimationIteration"
      | "onDrag"
      | "onDragStart"
      | "onDragEnd"
      | "onDragEnter"
      | "onDragExit"
      | "onDragLeave"
      | "onDragOver"
      | "onDrop"
    >,
    ButtonVariants {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  shimmer?: boolean;
  glow?: boolean;
}

const AnimatedButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      icon,
      iconPosition = "left",
      shimmer = false,
      glow = false,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const hasIcon = !!icon || loading;
    const hasChildren = !!children;

    const buttonSize = size;
    const isIconOnly = !hasChildren && hasIcon;
    const paddingOverride = isIconOnly ? "px-0" : "";

    const fixedHeightClass = "h-8 sm:h-9 md:h-10 max-w-full w-auto";

    const buttonContent = (
      <>
        {loading && (
          <Loader className="h-3 w-3 sm:h-4 sm:w-4 animate-spin shrink-0" />
        )}
        {!loading && icon && iconPosition === "left" && (
          <span className="text-xs sm:text-sm md:text-base shrink-0">
            {icon}
          </span>
        )}
        {hasChildren && (
          <span
            className={cn(
              hasIcon && "ml-1 sm:ml-2 first:ml-0",
              "text-xs sm:text-sm md:text-base truncate min-w-0"
            )}
          >
            {children}
          </span>
        )}
        {!loading && icon && iconPosition === "right" && (
          <span className="text-xs sm:text-sm md:text-base shrink-0">
            {icon}
          </span>
        )}
        {shimmer && variant === "primary" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
          />
        )}
      </>
    );

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(
            buttonVariants({ variant, size: buttonSize, className }),
            paddingOverride,
            fixedHeightClass,
            "flex items-center justify-center gap-1 sm:gap-2 overflow-hidden",
            glow && "animate-glow"
          )}
          {...props}
        >
          {buttonContent}
        </Slot>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size: buttonSize, className }),
          paddingOverride,
          fixedHeightClass,
          "flex items-center justify-center gap-1 sm:gap-2 overflow-hidden",
          glow && "animate-glow"
        )}
        disabled={isDisabled}
        variants={buttonHoverVariants}
        initial="initial"
        whileHover={!isDisabled ? "hover" : undefined}
        whileTap={!isDisabled ? "tap" : undefined}
        {...props}
      >
        {buttonContent}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export default AnimatedButton;
