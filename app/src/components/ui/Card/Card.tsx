"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../../lib/utils";
import { cardVariants, type CardVariants } from "../../../lib/variants";
import { cardHoverVariants } from "../../../lib/animations";

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CardVariants {
  asChild?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
  disabled?: boolean;
  animate?: boolean;
  glow?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      asChild = false,
      hoverable = false,
      clickable = false,
      disabled = false,
      animate = true,
      glow = false,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const isInteractive = clickable || !!onClick;
    const isDisabled = disabled;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (isDisabled || !onClick) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
    };

    const cardVariant = isInteractive ? "interactive" : variant;

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(
            cardVariants({ variant: cardVariant, padding, className }),
            glow && "animate-glow"
          )}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          cardVariants({ variant: cardVariant, padding, className }),
          glow && "animate-glow",
          {
            "opacity-60 pointer-events-none": isDisabled,
            "cursor-pointer": isInteractive && !isDisabled,
          }
        )}
        onClick={isDisabled ? undefined : onClick}
        onKeyDown={isDisabled ? undefined : handleKeyDown}
        tabIndex={isInteractive && !isDisabled ? 0 : undefined}
        role={isInteractive && !isDisabled ? "button" : undefined}
        style={props.style}
        initial={animate ? { opacity: 0, y: 20, scale: 0.95 } : false}
        animate={animate ? { opacity: 1, y: 0, scale: 1 } : false}
        variants={
          (hoverable || isInteractive) && !isDisabled
            ? cardHoverVariants
            : undefined
        }
        whileHover={
          (hoverable || isInteractive) && !isDisabled ? "hover" : undefined
        }
        whileTap={isInteractive && !isDisabled ? { scale: 0.98 } : undefined}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export default Card;
