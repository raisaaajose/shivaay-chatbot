"use client";

import { motion } from "framer-motion";
import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../../lib/utils";
import { buttonVariants, type ButtonVariants } from "../../../lib/variants";
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
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const hasIcon = !!icon || loading;
    const hasChildren = !!children;

    // Use the provided size, but enforce fixed height for consistency
    const buttonSize = size;

    // For icon-only buttons, we need to override padding to center the icon properly
    const isIconOnly = !hasChildren && hasIcon;
    const paddingOverride = isIconOnly ? "px-0" : "";

    // Fixed height override to ensure all buttons have the same height
    const fixedHeightClass = "h-10";

    const buttonContent = (
      <>
        {loading && <Loader className="h-4 w-4 animate-spin" />}
        {!loading && icon && iconPosition === "left" && icon}
        {hasChildren && (
          <span className={cn(hasIcon && "ml-2 first:ml-0")}>{children}</span>
        )}
        {!loading && icon && iconPosition === "right" && icon}
      </>
    );

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(
            buttonVariants({ variant, size: buttonSize, className }),
            paddingOverride,
            fixedHeightClass
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
          fixedHeightClass
        )}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.02 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          duration: 0.1,
        }}
        {...props}
      >
        {buttonContent}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export default AnimatedButton;
